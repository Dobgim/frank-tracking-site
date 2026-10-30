import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../lib/googleMaps";
import { pointAlong, routePoints } from "../../lib/geo";
import { findLocalShipmentByCode } from "../../lib/storageService";

const POLL_MS = 5000;
const LABELS = { pending: "Pending", in_transit: "In transit", on_hold: "On hold", delivered: "Delivered" };
const PACKAGE_ICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><circle cx="17" cy="17" r="15.500" fill="#0A3D62" stroke="#fff" stroke-width="2"/><path fill="none" stroke="#fff" stroke-width="1.800" stroke-linejoin="round" d="M17 9l7 3.500v9L17 25l-7-3.500v-9zM10 12.500l7 3.500 7-3.500M17 16v9"/></svg>`,
)}`;

const toLatLng = ([lat, lng]) => ({ lat, lng });

function ShipmentMap({ shipment }) {
  const element = useRef(null);
  const latest = useRef(shipment);
  latest.current = shipment;
  const synced = useRef({ covered: shipment.coveredKm, at: performance.now() });
  const [error, setError] = useState(null);

  // A new server reading corrects the estimate but can never move the marker back.
  useEffect(() => {
    synced.current = { covered: shipment.coveredKm, at: performance.now(), shown: synced.current.shown };
  }, [shipment]);

  useEffect(() => {
    let frame;
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled) return;
        const { origin, destination } = latest.current;
        const map = new maps.Map(element.current, { mapTypeControl: false, streetViewControl: false });
        const route = routePoints(origin, destination).map(toLatLng);

        new maps.Polyline({
          map,
          path: route,
          strokeOpacity: 0,
          icons: [
            {
              icon: { path: "M 0,-1 0,1", strokeColor: "#7F8C8D", strokeOpacity: 1, scale: 2 },
              offset: "0",
              repeat: "12px",
            },
          ],
        });
        const travelled = new maps.Polyline({ map, strokeColor: "#1ABC9C", strokeWeight: 4 });

        const stop = (place, color) =>
          new maps.Marker({
            map,
            position: { lat: place.lat, lng: place.lng },
            title: place.name,
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#fff",
              fillOpacity: 1,
              strokeColor: color,
              strokeWeight: 3,
            },
          });
        stop(origin, "#0A3D62");
        stop(destination, "#F39C12");

        const marker = new maps.Marker({
          map,
          title: latest.current.code,
          zIndex: 10,
          icon: {
            url: PACKAGE_ICON,
            scaledSize: new maps.Size(34, 34),
            anchor: new maps.Point(17, 17),
          },
        });

        const bounds = new maps.LatLngBounds();
        route.forEach((point) => bounds.extend(point));
        map.fitBounds(bounds, 40);

        let drawn = -1;
        const draw = () => {
          const s = latest.current;
          const elapsedHours = (performance.now() - synced.current.at) / 3_600_000;
          const estimate = synced.current.covered + (s.status === "in_transit" ? elapsedHours * s.speedKmh : 0);
          const shown = Math.min(s.distanceKm, Math.max(estimate, synced.current.shown ?? 0));
          synced.current.shown = shown;
          if (shown !== drawn) {
            drawn = shown;
            const fraction = s.distanceKm ? shown / s.distanceKm : 1;
            marker.setPosition(toLatLng(pointAlong(origin, destination, fraction)));
            travelled.setPath(routePoints(origin, destination, 0, fraction).map(toLatLng));
          }
          frame = requestAnimationFrame(draw);
        };
        draw();
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  if (error) return <p className="track-error">{error}</p>;
  return <div className="track-map" ref={element} />;
}

export default function TrackResult({ code }) {
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/track/${encodeURIComponent(code)}`, {
          signal: AbortSignal.timeout(4000),
        });
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok || !contentType.includes("application/json")) {
          const local = findLocalShipmentByCode(code);
          if (local) {
            setError(null);
            setShipment(local);
            return;
          }
          setShipment(null);
          setError("No shipment found with that tracking code.");
          return;
        }
        const data = await response.json();
        if (!active) return;
        setError(null);
        setShipment(data);
      } catch {
        if (!active) return;
        // Network error — fall back to local storage
        const local = findLocalShipmentByCode(code);
        if (local) {
          setError(null);
          setShipment(local);
        } else {
          setError("No shipment found with that tracking code.");
        }
      }
    };
    setShipment(null);
    setError(null);
    load();
    const timer = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [code]);

  if (error) {
    return (
      <section className="container py-5">
        <p className="track-error">{error}</p>
      </section>
    );
  }
  if (!shipment) return null;

  const percent = Math.round((shipment.coveredKm / shipment.distanceKm) * 100);

  return (
    <section className="container py-5">
      <p className="track-demo-note" style={{ background: "#e8f8f5", color: "#117a65", borderColor: "#a3e4d7" }}>
        <i className="bi bi-shield-check"></i> PrimeLogisticsFlow Global Tracking &bull; Real-time status update
      </p>
      <div className="track-summary">
        <div>
          <strong>{shipment.code}</strong>
          <span>{shipment.description}</span>
        </div>
        <span className={`track-status track-status--${shipment.status}`}>{LABELS[shipment.status]}</span>
        <div>
          {shipment.origin.name} → {shipment.destination.name}
          <span>
            {Math.round(shipment.coveredKm).toLocaleString()} of {Math.round(shipment.distanceKm).toLocaleString()} km (
            {percent}%)
          </span>
        </div>
      </div>
      <ShipmentMap key={shipment.code} shipment={shipment} />
      <ul className="track-events">
        {shipment.events.map((event, i) => (
          <li key={i}>
            <strong>{LABELS[event.status]}</strong> at {Math.round(event.coveredKm).toLocaleString()} km
            <span>{new Date(event.at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
