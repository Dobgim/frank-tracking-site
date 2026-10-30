// GET /api/track/[code] — public shipment lookup (no auth required)
import { getDb, ensureSchema, present, coveredAt, json, setCors } from "../_db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const code = (req.query.code || "").trim().toUpperCase();
  if (!code) return json(res, 400, { error: "Tracking code is required." });

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const [row] = await sql`SELECT * FROM shipments WHERE code = ${code}`;
    if (!row) return json(res, 404, { error: "No shipment found with that tracking code." });

    // Compute live progress
    const covered = coveredAt(row);
    const arrived = row.status === "in_transit" && covered >= Number(row.distance_km);
    const status = arrived ? "delivered" : row.status;

    // Update DB if arrived
    if (arrived) {
      await sql`
        UPDATE shipments SET covered_km = ${covered}, status = 'delivered', settled_at = ${Date.now()} WHERE id = ${row.id}
      `;
      await sql`
        INSERT INTO shipment_events (shipment_id, status, covered_km, created_at) VALUES (${row.id}, 'delivered', ${covered}, ${Date.now()})
      `;
    }

    const events = await sql`
      SELECT status, covered_km, created_at FROM shipment_events WHERE shipment_id = ${row.id} ORDER BY id DESC
    `;

    const { id, ...publicData } = present({ ...row, covered_km: covered, status }, events);
    return json(res, 200, publicData);
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: "Server error." });
  }
}
