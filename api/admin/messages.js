// GET /api/admin/messages — view submitted contact messages
import { getDb, ensureSchema, json, setCors } from "../_db.js";
import { requireAdmin } from "./_guard.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed." });

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const admin = await requireAdmin(req, res, sql);
    if (!admin) return;

    const rows = await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 200`;
    const formatted = rows.map((row) => {
      let parsed = {};
      try {
        parsed = JSON.parse(row.payload);
      } catch {}
      return { id: row.id, at: Number(row.created_at), ...parsed };
    });

    return json(res, 200, formatted);
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: "Server error." });
  }
}
