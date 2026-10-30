// GET /api/admin/me — check if current session is valid
import { getDb, ensureSchema, json, setCors } from "../../_db.js";
import { requireAdmin } from "./_guard.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const sql = getDb();
    await ensureSchema(sql);
    const admin = await requireAdmin(req, res, sql);
    if (!admin) return;
    return json(res, 200, { email: admin.email });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: "Server error." });
  }
}
