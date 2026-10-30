// GET /api/admin/shipments & POST /api/admin/shipments
import {
  getDb,
  ensureSchema,
  present,
  coveredAt,
  calcDistanceKm,
  CITIES,
  json,
  setCors,
  readBody,
} from "../../_db.js";
import { requireAdmin } from "../_guard.js";

const STATUSES = ["pending", "in_transit", "on_hold", "delivered"];

function validSpeed(speed) {
  return Number.isFinite(speed) && speed >= 1 && speed <= 100000;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const admin = await requireAdmin(req, res, sql);
    if (!admin) return;

    // ── GET: List all shipments ─────────────────────────────────────────────
    if (req.method === "GET") {
      const rows = await sql`SELECT * FROM shipments ORDER BY id DESC`;
      const allEvents = await sql`SELECT * FROM shipment_events ORDER BY id DESC`;

      const eventsByShipment = new Map();
      for (const ev of allEvents) {
        if (!eventsByShipment.has(ev.shipment_id)) {
          eventsByShipment.set(ev.shipment_id, []);
        }
        eventsByShipment.get(ev.shipment_id).push(ev);
      }

      const shipments = [];
      const now = Date.now();

      for (const row of rows) {
        const covered = coveredAt(row, now);
        const arrived = row.status === "in_transit" && covered >= Number(row.distance_km);
        const status = arrived ? "delivered" : row.status;

        if (arrived) {
          await sql`
            UPDATE shipments SET covered_km = ${covered}, status = 'delivered', settled_at = ${now} WHERE id = ${row.id}
          `;
          await sql`
            INSERT INTO shipment_events (shipment_id, status, covered_km, created_at)
            VALUES (${row.id}, 'delivered', ${covered}, ${now})
          `;
        }

        const events = eventsByShipment.get(row.id) || [];
        shipments.push(present({ ...row, covered_km: covered, status, settled_at: now }, events));
      }

      return json(res, 200, shipments);
    }

    // ── POST: Create new shipment ───────────────────────────────────────────
    if (req.method === "POST") {
      const body = await readBody(req);
      const {
        code,
        description = "General cargo",
        originName,
        destinationName,
        speedKmh = 900,
        status = "pending",
        shipmentType = "Air Freight",
        senderName = "",
        receiverName = "",
        senderEmail = "",
        receiverEmail = "",
        senderNumber = "",
        receiverNumber = "",
        senderAddress = "",
        receiverAddress = "",
        weightKg = 0,
        shipDate = "",
        expectedDeliveryDate = "",
        expectedDeliveryTime = "",
        pieceType = "Carton",
      } = body;

      const cleanCode = typeof code === "string" ? code.trim().toUpperCase() : "";

      if (!/^[A-Z0-9-]{3,30}$/.test(cleanCode)) {
        return json(res, 400, { error: "Tracking code must be 3-30 letters, numbers or dashes." });
      }

      let origin = CITIES.find((c) => c.name.toLowerCase() === (originName || "").toLowerCase());
      let destination = CITIES.find((c) => c.name.toLowerCase() === (destinationName || "").toLowerCase());

      if (!origin && originName) {
        origin = { name: originName.trim(), lat: 29.76, lng: -95.37 };
      }
      if (!destination && destinationName) {
        destination = { name: destinationName.trim(), lat: 51.51, lng: -0.13 };
      }

      if (!origin || !destination) {
        return json(res, 400, { error: "Please provide both origin and destination." });
      }

      const speed = Number(speedKmh) || 900;
      if (!validSpeed(speed)) {
        return json(res, 400, { error: "Speed must be between 1 and 100000 km/h." });
      }

      const distance = calcDistanceKm(origin, destination);
      const now = Date.now();

      try {
        const [inserted] = await sql`
          INSERT INTO shipments (
            code, description, origin_name, origin_lat, origin_lng,
            dest_name, dest_lat, dest_lng, distance_km, speed_kmh,
            status, covered_km, settled_at, created_at,
            shipment_type, sender_name, receiver_name, sender_email, receiver_email,
            sender_number, receiver_number, sender_address, receiver_address,
            weight_kg, ship_date, expected_delivery_date, expected_delivery_time, piece_type
          ) VALUES (
            ${cleanCode}, ${String(description || "General cargo").slice(0, 500)},
            ${origin.name}, ${origin.lat}, ${origin.lng},
            ${destination.name}, ${destination.lat}, ${destination.lng},
            ${distance}, ${speed}, ${status}, 0, ${now}, ${now},
            ${shipmentType}, ${senderName}, ${receiverName}, ${senderEmail}, ${receiverEmail},
            ${senderNumber}, ${receiverNumber}, ${senderAddress}, ${receiverAddress},
            ${Number(weightKg) || 0}, ${shipDate}, ${expectedDeliveryDate}, ${expectedDeliveryTime}, ${pieceType}
          )
          RETURNING *
        `;

        await sql`
          INSERT INTO shipment_events (shipment_id, status, covered_km, created_at)
          VALUES (${inserted.id}, ${status}, 0, ${now})
        `;

        const events = await sql`
          SELECT status, covered_km, created_at FROM shipment_events WHERE shipment_id = ${inserted.id} ORDER BY id DESC
        `;

        return json(res, 201, present(inserted, events));
      } catch (dbErr) {
        if (String(dbErr.message).includes("unique") || String(dbErr.message).includes("duplicate")) {
          return json(res, 409, { error: "That tracking code already exists." });
        }
        throw dbErr;
      }
    }

    return json(res, 405, { error: "Method not allowed." });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: err.message || "Server error." });
  }
}
