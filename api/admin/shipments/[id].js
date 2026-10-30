// PATCH /api/admin/shipments/[id] & DELETE /api/admin/shipments/[id]
import { getDb, ensureSchema, present, coveredAt, json, setCors, readBody } from "../../_db.js";
import { requireAdmin } from "../_guard.js";

const STATUSES = ["pending", "in_transit", "on_hold", "delivered"];

function validSpeed(speed) {
  return Number.isFinite(speed) && speed >= 1 && speed <= 100000;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const id = Number(req.query.id);
  if (!id || Number.isNaN(id)) return json(res, 400, { error: "Invalid shipment ID." });

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const admin = await requireAdmin(req, res, sql);
    if (!admin) return;

    const [row] = await sql`SELECT * FROM shipments WHERE id = ${id}`;
    if (!row) return json(res, 404, { error: "Shipment not found." });

    // ── DELETE ──────────────────────────────────────────────────────────────
    if (req.method === "DELETE") {
      await sql`DELETE FROM shipments WHERE id = ${id}`;
      return json(res, 200, { ok: true });
    }

    // ── PATCH ───────────────────────────────────────────────────────────────
    if (req.method === "PATCH") {
      const body = await readBody(req);
      const { status, speedKmh } = body;

      if (status !== undefined && !STATUSES.includes(status)) {
        return json(res, 400, { error: "Unknown status." });
      }
      if (speedKmh !== undefined && !validSpeed(Number(speedKmh))) {
        return json(res, 400, { error: "Speed must be between 1 and 100000 km/h." });
      }

      const now = Date.now();
      const currentCovered = coveredAt(row, now);
      const currentStatus = row.status;

      if (currentStatus === "delivered" && status && status !== "delivered") {
        return json(res, 409, { error: "A delivered shipment cannot change status." });
      }

      const nextStatus = status || currentStatus;
      const nextSpeed = speedKmh !== undefined ? Number(speedKmh) : Number(row.speed_kmh);
      const covered = nextStatus === "delivered" ? Number(row.distance_km) : currentCovered;

      const [updated] = await sql`
        UPDATE shipments
        SET status = ${nextStatus},
            speed_kmh = ${nextSpeed},
            covered_km = ${covered},
            settled_at = ${now}
        WHERE id = ${id}
        RETURNING *
      `;

      if (nextStatus !== currentStatus) {
        await sql`
          INSERT INTO shipment_events (shipment_id, status, covered_km, created_at)
          VALUES (${id}, ${nextStatus}, ${covered}, ${now})
        `;
      }

      const events = await sql`
        SELECT status, covered_km, created_at FROM shipment_events WHERE shipment_id = ${id} ORDER BY id DESC
      `;

      return json(res, 200, present(updated, events));
    }

    return json(res, 405, { error: "Method not allowed." });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: err.message || "Server error." });
  }
}
