// POST /api/messages — public contact form message storage
import { getDb, ensureSchema, json, setCors, readBody } from "../_db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });

  const body = await readBody(req);
  if (!body || typeof body !== "object" || !Object.keys(body).length) {
    return json(res, 400, { error: "The message is empty." });
  }

  try {
    const sql = getDb();
    await ensureSchema(sql);
    await sql`INSERT INTO messages (payload, created_at) VALUES (${JSON.stringify(body)}, ${Date.now()})`;
    return json(res, 201, { ok: true });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: "Server error." });
  }
}
