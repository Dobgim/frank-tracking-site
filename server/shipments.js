import { db } from "./db.js";

export const STATUSES = ["pending", "in_transit", "on_hold", "delivered"];

export const CITIES = [
  { name: "Houston, USA", lat: 29.76, lng: -95.37 },
  { name: "Los Angeles, USA", lat: 33.74, lng: -118.27 },
  { name: "New York, USA", lat: 40.71, lng: -74.01 },
  { name: "Miami, USA", lat: 25.76, lng: -80.19 },
  { name: "Toronto, Canada", lat: 43.65, lng: -79.38 },
  { name: "Santos, Brazil", lat: -23.96, lng: -46.33 },
  { name: "Rotterdam, Netherlands", lat: 51.92, lng: 4.48 },
  { name: "London, UK", lat: 51.51, lng: -0.13 },
  { name: "Lagos, Nigeria", lat: 6.45, lng: 3.39 },
  { name: "Douala, Cameroon", lat: 4.05, lng: 9.77 },
  { name: "Cape Town, South Africa", lat: -33.92, lng: 18.42 },
  { name: "Dubai, UAE", lat: 25.2, lng: 55.27 },
  { name: "Mumbai, India", lat: 18.95, lng: 72.84 },
  { name: "Singapore", lat: 1.29, lng: 103.85 },
  { name: "Shanghai, China", lat: 31.23, lng: 121.47 },
  { name: "Tokyo, Japan", lat: 35.68, lng: 139.69 },
  { name: "Sydney, Australia", lat: -33.87, lng: 151.21 },
];

const rad = (deg) => (deg * Math.PI) / 180;

export function distanceKm(a, b) {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Distance covered at `now`, computed only from saved values. It only grows
// while in transit, so a status change can never move a package backwards.
function coveredAt(row, now) {
  if (row.status !== "in_transit") return row.covered_km;
  const hours = Math.max(0, now - row.settled_at) / 3_600_000;
  return Math.min(row.distance_km, row.covered_km + hours * row.speed_kmh);
}

function addEvent(id, status, covered, now) {
  db.prepare("INSERT INTO shipment_events (shipment_id, status, covered_km, created_at) VALUES (?, ?, ?, ?)").run(
    id,
    status,
    covered,
    now,
  );
}

// Saves progress so far, and marks the shipment delivered once it arrives.
function settle(row, now = Date.now()) {
  const covered = coveredAt(row, now);
  const arrived = row.status === "in_transit" && covered >= row.distance_km;
  const status = arrived ? "delivered" : row.status;
  db.prepare("UPDATE shipments SET covered_km = ?, status = ?, settled_at = ? WHERE id = ?").run(
    covered,
    status,
    now,
    row.id,
  );
  if (arrived) addEvent(row.id, "delivered", covered, now);
  return { ...row, covered_km: covered, status, settled_at: now };
}

function present(row) {
  const events = db
    .prepare("SELECT status, covered_km, created_at FROM shipment_events WHERE shipment_id = ? ORDER BY id DESC")
    .all(row.id);
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    origin: { name: row.origin_name, lat: row.origin_lat, lng: row.origin_lng },
    destination: { name: row.dest_name, lat: row.dest_lat, lng: row.dest_lng },
    distanceKm: row.distance_km,
    speedKmh: row.speed_kmh,
    status: row.status,
    coveredKm: row.covered_km,
    events: events.map((e) => ({ status: e.status, coveredKm: e.covered_km, at: e.created_at })),
  };
}

const byId = (id) => db.prepare("SELECT * FROM shipments WHERE id = ?").get(id);

export function findByCode(code) {
  const row = db.prepare("SELECT * FROM shipments WHERE code = ?").get(code);
  return row ? present(settle(row)) : null;
}

export function listShipments() {
  return db
    .prepare("SELECT * FROM shipments ORDER BY id DESC")
    .all()
    .map((row) => present(settle(row)));
}

export function createShipment({ code, description, origin, destination, speedKmh, status = "pending" }) {
  const now = Date.now();
  const { lastInsertRowid } = db
    .prepare(
      `INSERT INTO shipments (code, description, origin_name, origin_lat, origin_lng, dest_name, dest_lat, dest_lng,
        distance_km, speed_kmh, status, covered_km, settled_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    )
    .run(
      code,
      description,
      origin.name,
      origin.lat,
      origin.lng,
      destination.name,
      destination.lat,
      destination.lng,
      distanceKm(origin, destination),
      speedKmh,
      status,
      now,
      now,
    );
  addEvent(lastInsertRowid, status, 0, now);
  return present(byId(lastInsertRowid));
}

export function updateShipment(id, { status, speedKmh }) {
  const row = byId(id);
  if (!row) return null;
  const current = settle(row);
  if (current.status === "delivered" && status && status !== "delivered") {
    throw new Error("A delivered shipment cannot change status.");
  }
  const nextStatus = status || current.status;
  const nextSpeed = speedKmh ?? current.speed_kmh;
  // Marking delivered completes the route; every other change keeps covered_km.
  const covered = nextStatus === "delivered" ? current.distance_km : current.covered_km;
  db.prepare("UPDATE shipments SET status = ?, speed_kmh = ?, covered_km = ? WHERE id = ?").run(
    nextStatus,
    nextSpeed,
    covered,
    id,
  );
  if (nextStatus !== current.status) addEvent(id, nextStatus, covered, Date.now());
  return present(byId(id));
}

export function deleteShipment(id) {
  return db.prepare("DELETE FROM shipments WHERE id = ?").run(id).changes > 0;
}
