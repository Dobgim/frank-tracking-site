import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { routePoints } from "../../lib/geo";

const POLL_MS = 5000;
const LABELS = { pending: "Pending", in_transit: "In transit", on_hold: "On hold", delivered: "Delivered" };

function ShipmentMap({ shipment }) {
  const element = useRef(null);
  const map = useRef(null);
  const latest = useRef(shipment);
  latest.current = shipment;
  const synced = useRef({ covered: shipment.coveredKm, at: performance.now() });

  // A new server reading corrects the estimate but can never move the marker back.
  useEffect(() => {
    synced.current = { covered: shipment.coveredKm, at: performance.now(), shown: synced.current.shown };
  }, [shipment]);

  useEffect(() => {
    const { origin, destination } = latest.current;
    const instance = L.map(element.current, { worldCopyJump: true });
    map.current = instance;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(instance);

    const route = routePoints(origin, destination);
    L.polyline(route, { color: "#7F8C8D", weight: 2, dashArray: "6 6" }).addTo(instance);
    const travelled = L.polyline([], { color: "#1ABC9C", weight: 4 }).addTo(instance);
    L.circleMarker([origin.lat, origin.lng], { radius: 6, color: "#0A3D62" }).addTo(instance).bindTooltip(origin.name);
    L.circleMarker(route[route.length - 1], { radius: 6, color: "#F39C12" })
      .addTo(instance)
      .bindTooltip(destination.name);
    const marker = L.marker([origin.lat, origin.lng], {
      icon: L.divIcon({
        className: "track-marker",
        html: '<i class="bi bi-box-seam"></i>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    }).addTo(instance);
    instance.fitBounds(L.polyline(route).getBounds(), { padding: [40, 40] });

    let frame;
    const draw = () => {
      const s = latest.current;
      const elapsedHours = (performance.now() - synced.current.at) / 3_600_000;
      const estimate = synced.current.covered + (s.status === "in_transit" ? elapsedHours * s.speedKmh : 0);
      const shown = Math.min(s.distanceKm, Math.max(estimate, synced.current.shown ?? 0));
      synced.current.shown = shown;
      const fraction = s.distanceKm ? shown / s.distanceKm : 1;
      const points = routePoints(origin, destination, 0, fraction);
      marker.setLatLng(points[points.length - 1]);
      travelled.setLatLngs(points);
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      instance.remove();
    };
  }, []);

  return <div className="track-map" ref={element} />;
}

export default function TrackResult({ code }) {
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/track/${encodeURIComponent(code)}`);
        const data = await response.json();
        if (!active) return;
        if (!response.ok) {
          setShipment(null);
          setError(data.error);
          return;
        }
        setError(null);
        setShipment(data);
      } catch {
        if (active) setError("Could not reach the tracking server.");
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
      <p className="track-demo-note">
        <i className="bi bi-info-circle"></i> Demo only: this movement is simulated from sample data, not a real
        shipment.
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
