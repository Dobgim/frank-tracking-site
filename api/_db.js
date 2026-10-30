// Shared Neon Postgres client + helpers for all API routes
import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL env variable is not set.");
  return neon(url);
}

// ── Schema bootstrap (runs on every cold start, safe to call repeatedly) ──────
export async function ensureSchema(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at BIGINT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS shipments (
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
      origin_name TEXT NOT NULL,
      origin_lat REAL NOT NULL,
      origin_lng REAL NOT NULL,
      dest_name TEXT NOT NULL,
      dest_lat REAL NOT NULL,
      dest_lng REAL NOT NULL,
      distance_km REAL NOT NULL,
      speed_kmh REAL NOT NULL DEFAULT 900,
      status TEXT NOT NULL DEFAULT 'pending',
      covered_km REAL NOT NULL DEFAULT 0,
      settled_at BIGINT NOT NULL,
      created_at BIGINT NOT NULL,
      shipment_type TEXT DEFAULT 'Air Freight',
      sender_name TEXT DEFAULT '',
      receiver_name TEXT DEFAULT '',
      sender_email TEXT DEFAULT '',
      receiver_email TEXT DEFAULT '',
      sender_number TEXT DEFAULT '',
      receiver_number TEXT DEFAULT '',
      sender_address TEXT DEFAULT '',
      receiver_address TEXT DEFAULT '',
      weight_kg REAL DEFAULT 0,
      ship_date TEXT DEFAULT '',
      expected_delivery_date TEXT DEFAULT '',
      expected_delivery_time TEXT DEFAULT '',
      piece_type TEXT DEFAULT 'Carton'
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS shipment_events (
      id SERIAL PRIMARY KEY,
      shipment_id INTEGER NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      covered_km REAL NOT NULL,
      created_at BIGINT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      payload TEXT NOT NULL,
      created_at BIGINT NOT NULL
    )
  `;

  // Seed default admin if no admins exist
  const admins = await sql`SELECT COUNT(*) as cnt FROM admins`;
  if (Number(admins[0].cnt) === 0) {
    const { hashPassword } = await import("./auth-helper.js");
    const email = process.env.ADMIN_EMAIL || "admin@globaltropicalcargos.com";
    const password = process.env.ADMIN_PASSWORD || "globaladmin123";
    await sql`INSERT INTO admins (email, password_hash) VALUES (${email}, ${hashPassword(password)})`;
  }
}

// ── Distance helper ────────────────────────────────────────────────────────────
const rad = (deg) => (deg * Math.PI) / 180;
export function calcDistanceKm(a, b) {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// ── Computed progress ──────────────────────────────────────────────────────────
export function coveredAt(row, now = Date.now()) {
  if (row.status !== "in_transit") return Number(row.covered_km);
  const hours = Math.max(0, now - Number(row.settled_at)) / 3_600_000;
  return Math.min(Number(row.distance_km), Number(row.covered_km) + hours * Number(row.speed_kmh));
}

// ── Row → public shape ─────────────────────────────────────────────────────────
export function present(row, events = []) {
  return {
    id: row.id,
    code: row.code,
    description: row.description || "",
    origin: { name: row.origin_name, lat: Number(row.origin_lat), lng: Number(row.origin_lng) },
    destination: { name: row.dest_name, lat: Number(row.dest_lat), lng: Number(row.dest_lng) },
    distanceKm: Number(row.distance_km),
    speedKmh: Number(row.speed_kmh),
    status: row.status,
    coveredKm: coveredAt(row),
    shipmentType: row.shipment_type || "Air Freight",
    senderName: row.sender_name || "",
    receiverName: row.receiver_name || "",
    senderEmail: row.sender_email || "",
    receiverEmail: row.receiver_email || "",
    senderNumber: row.sender_number || "",
    receiverNumber: row.receiver_number || "",
    senderAddress: row.sender_address || "",
    receiverAddress: row.receiver_address || "",
    weightKg: Number(row.weight_kg) || 0,
    shipDate: row.ship_date || "",
    expectedDeliveryDate: row.expected_delivery_date || "",
    expectedDeliveryTime: row.expected_delivery_time || "",
    pieceType: row.piece_type || "Carton",
    events: events.map((e) => ({ status: e.status, coveredKm: Number(e.covered_km), at: Number(e.created_at) })),
  };
}

// ── Session cookie helper ──────────────────────────────────────────────────────
export const COOKIE_NAME = "gtc_session";

export function parseCookie(req) {
  const match = (req.headers.cookie || "").match(new RegExp(`(?:^|; )${COOKIE_NAME}=([a-f0-9]+)`));
  return match?.[1] || null;
}

export function setCookie(res, token, maxAgeMs) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(maxAgeMs / 1000)}`
  );
}

export function clearCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

// ── CORS / JSON helpers ────────────────────────────────────────────────────────
export function setCors(res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function json(res, status, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).end(JSON.stringify(data));
}

export async function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

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
