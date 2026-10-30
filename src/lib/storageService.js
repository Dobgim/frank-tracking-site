// Robust local storage fallback service for PrimeLogisticsFlow
// Ensures Admin Dashboard and Live Tracking load and work 100% reliably
// whether the Node backend is active or running on static hosting (GitHub Pages/Vercel/Netlify).

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
export function calculateDistanceKm(a, b) {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const STORAGE_KEY_SHIPMENTS = "plf_shipments_v1";
const STORAGE_KEY_MESSAGES = "plf_messages_v1";
const STORAGE_KEY_ADMIN_SESSION = "plf_admin_session_v1";

const INITIAL_SHIPMENTS = [
  {
    id: 1,
    code: "PLF-1001",
    description: "Express: Aircraft Parts & Avionics",
    origin: { name: "Houston, USA", lat: 29.76, lng: -95.37 },
    destination: { name: "Rotterdam, Netherlands", lat: 51.92, lng: 4.48 },
    distanceKm: 8023,
    speedKmh: 900,
    status: "in_transit",
    coveredKm: 4620,
    settledAt: Date.now() - 3600000 * 4,
    createdAt: Date.now() - 3600000 * 24,
    events: [
      { status: "pending", coveredKm: 0, at: Date.now() - 3600000 * 24 },
      { status: "in_transit", coveredKm: 1200, at: Date.now() - 3600000 * 18 },
      { status: "in_transit", coveredKm: 4620, at: Date.now() - 3600000 * 4 },
    ],
  },
  {
    id: 2,
    code: "PLF-1002",
    description: "Priority: High-Tech Semiconductor Wafers",
    origin: { name: "Shanghai, China", lat: 31.23, lng: 121.47 },
    destination: { name: "Los Angeles, USA", lat: 33.74, lng: -118.27 },
    distanceKm: 10450,
    speedKmh: 850,
    status: "on_hold",
    coveredKm: 4180,
    settledAt: Date.now() - 3600000 * 10,
    createdAt: Date.now() - 3600000 * 48,
    events: [
      { status: "pending", coveredKm: 0, at: Date.now() - 3600000 * 48 },
      { status: "in_transit", coveredKm: 2500, at: Date.now() - 3600000 * 20 },
      { status: "on_hold", coveredKm: 4180, at: Date.now() - 3600000 * 10 },
    ],
  },
  {
    id: 3,
    code: "PLF-1003",
    description: "Secure: Cold-Chain Bio-Pharmaceuticals",
    origin: { name: "London, UK", lat: 51.51, lng: -0.13 },
    destination: { name: "Douala, Cameroon", lat: 4.05, lng: 9.77 },
    distanceKm: 5380,
    speedKmh: 800,
    status: "pending",
    coveredKm: 0,
    settledAt: Date.now() - 3600000 * 2,
    createdAt: Date.now() - 3600000 * 2,
    events: [
      { status: "pending", coveredKm: 0, at: Date.now() - 3600000 * 2 },
    ],
  },
  {
    id: 4,
    code: "DEMO-1001",
    description: "Sample: General Machinery Parts",
    origin: { name: "Houston, USA", lat: 29.76, lng: -95.37 },
    destination: { name: "Rotterdam, Netherlands", lat: 51.92, lng: 4.48 },
    distanceKm: 8023,
    speedKmh: 900,
    status: "in_transit",
    coveredKm: 5200,
    settledAt: Date.now() - 3600000 * 3,
    createdAt: Date.now() - 3600000 * 30,
    events: [
      { status: "pending", coveredKm: 0, at: Date.now() - 3600000 * 30 },
      { status: "in_transit", coveredKm: 5200, at: Date.now() - 3600000 * 3 },
    ],
  },
];

export function getLocalShipments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SHIPMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SHIPMENTS, JSON.stringify(INITIAL_SHIPMENTS));
      return INITIAL_SHIPMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SHIPMENTS;
  } catch {
    return INITIAL_SHIPMENTS;
  }
}

export function saveLocalShipments(shipments) {
  try {
    localStorage.setItem(STORAGE_KEY_SHIPMENTS, JSON.stringify(shipments));
  } catch (err) {
    console.warn("Storage write error:", err);
  }
}

export function getLocalMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalMessage(payload) {
  try {
    const messages = getLocalMessages();
    const newMsg = {
      id: Date.now(),
      at: Date.now(),
      ...payload,
    };
    messages.unshift(newMsg);
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages.slice(0, 100)));
    return true;
  } catch {
    return false;
  }
}

export function getLocalSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.expiresAt > Date.now()) {
      return { email: session.email };
    }
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    return null;
  } catch {
    return null;
  }
}

export function setLocalSession(email) {
  try {
    localStorage.setItem(
      STORAGE_KEY_ADMIN_SESSION,
      JSON.stringify({
        email,
        expiresAt: Date.now() + 8 * 3600000,
      }),
    );
  } catch (err) {
    console.warn("Session storage error:", err);
  }
}

export function clearLocalSession() {
  try {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
  } catch {}
}

export function findLocalShipmentByCode(code) {
  if (!code) return null;
  const clean = code.trim().toUpperCase();
  const list = getLocalShipments();
  const found = list.find((s) => s.code.toUpperCase() === clean);
  if (!found) return null;

  // Compute live progress
  const now = Date.now();
  let covered = found.coveredKm;
  if (found.status === "in_transit") {
    const hours = Math.max(0, now - (found.settledAt || found.createdAt)) / 3600000;
    covered = Math.min(found.distanceKm, found.coveredKm + hours * found.speedKmh);
  }
  const isDelivered = found.status === "in_transit" && covered >= found.distanceKm;

  return {
    ...found,
    coveredKm: covered,
    status: isDelivered ? "delivered" : found.status,
  };
}

export function createLocalShipment({ code, description, originName, destinationName, speedKmh }) {
  const origin = CITIES.find((c) => c.name === originName);
  const destination = CITIES.find((c) => c.name === destinationName);
  if (!origin || !destination) throw new Error("Invalid origin or destination.");
  const cleanCode = code.trim().toUpperCase();

  const list = getLocalShipments();
  if (list.some((s) => s.code.toUpperCase() === cleanCode)) {
    throw new Error("That tracking code already exists.");
  }

  const distanceKm = Math.round(calculateDistanceKm(origin, destination));
  const newShipment = {
    id: Date.now(),
    code: cleanCode,
    description: description || "General cargo",
    origin,
    destination,
    distanceKm,
    speedKmh: Number(speedKmh) || 900,
    status: "in_transit",
    coveredKm: 0,
    settledAt: Date.now(),
    createdAt: Date.now(),
    events: [
      { status: "pending", coveredKm: 0, at: Date.now() },
      { status: "in_transit", coveredKm: 0, at: Date.now() },
    ],
  };

  list.unshift(newShipment);
  saveLocalShipments(list);
  return newShipment;
}

export function updateLocalShipment(id, { status, speedKmh }) {
  const list = getLocalShipments();
  const idx = list.findIndex((s) => s.id === Number(id));
  if (idx === -1) throw new Error("Shipment not found.");

  const s = list[idx];
  const now = Date.now();
  let covered = s.coveredKm;
  if (s.status === "in_transit") {
    const hours = Math.max(0, now - (s.settledAt || s.createdAt)) / 3600000;
    covered = Math.min(s.distanceKm, s.coveredKm + hours * s.speedKmh);
  }

  const newStatus = status !== undefined ? status : s.status;
  const newSpeed = speedKmh !== undefined ? Number(speedKmh) : s.speedKmh;

  const events = [...(s.events || [])];
  if (status && status !== s.status) {
    events.push({ status, coveredKm: Math.round(covered), at: now });
  }

  list[idx] = {
    ...s,
    status: newStatus,
    speedKmh: newSpeed,
    coveredKm: covered,
    settledAt: now,
    events,
  };

  saveLocalShipments(list);
  return list[idx];
}

export function deleteLocalShipment(id) {
  const list = getLocalShipments();
  const filtered = list.filter((s) => s.id !== Number(id));
  saveLocalShipments(filtered);
  return true;
}
