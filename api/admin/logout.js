// POST /api/admin/logout
import { getDb, json, setCors, parseCookie, clearCookie } from "../../_db.js";
import { tokenHash } from "../../auth-helper.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const token = parseCookie(req);
  if (token) {
    try {
      const sql = getDb();
      await sql`DELETE FROM sessions WHERE token_hash = ${tokenHash(token)}`;
    } catch {}
  }
  clearCookie(res);
  return json(res, 200, { ok: true });
}
