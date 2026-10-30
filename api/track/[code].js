// GET /api/track/[code] — public shipment lookup (no auth required)
import { getDb, ensureSchema, present, coveredAt, json, setCors } from "../_db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  // Extract code from query or fallback to URL pathname
  let rawCode = req.query?.code;
  if (!rawCode && req.url) {
    const parts = req.url.split("?")[0].split("/");
    rawCode = parts[parts.length - 1];
  }

  const code = (typeof rawCode === "string" ? decodeURIComponent(rawCode) : "").trim().toUpperCase();
  if (!code || code === "[CODE]" || code === "UNDEFINED") {
    return json(res, 400, { error: "Tracking code is required." });
  }

  try {
    const sql = getDb();
    await ensureSchema(sql);

    // Case-insensitive & trimmed search
    const [row] = await sql`
      SELECT * FROM shipments
      WHERE UPPER(TRIM(code)) = UPPER(TRIM(${code}))
      LIMIT 1
    `;

    if (!row) {
      return json(res, 404, { error: "No shipment found with that tracking code." });
    }

    // Compute live progress
    const now = Date.now();
    const covered = coveredAt(row, now);
    const arrived = row.status === "in_transit" && covered >= Number(row.distance_km);
    const status = arrived ? "delivered" : row.status;

    // Update DB if arrived
    if (arrived && row.status !== "delivered") {
      await sql`
        UPDATE shipments SET covered_km = ${covered}, status = 'delivered', settled_at = ${now} WHERE id = ${row.id}
      `;
      await sql`
        INSERT INTO shipment_events (shipment_id, status, covered_km, created_at) VALUES (${row.id}, 'delivered', ${covered}, ${now})
      `;
    }

    const events = await sql`
      SELECT status, covered_km, created_at FROM shipment_events WHERE shipment_id = ${row.id} ORDER BY id DESC
    `;

    const { id, ...publicData } = present({ ...row, covered_km: covered, status, settled_at: now }, events);
    return json(res, 200, publicData);
  } catch (err) {
    console.error("Track error:", err);
    return json(res, 500, { error: err.message || "Database connection error." });
  }
}
