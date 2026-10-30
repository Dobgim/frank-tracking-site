// POST /api/admin/login
import { getDb, ensureSchema, json, setCors, setCookie, readBody } from "../../_db.js";
import { verifyPassword, tokenHash } from "../../auth-helper.js";
import { randomBytes } from "node:crypto";

const SESSION_MS = 30 * 24 * 3_600_000; // 30 days so admin never gets randomly logged out
const MAX_ATTEMPTS = 15;
const WINDOW_MS = 15 * 60_000;
const attempts = new Map();

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const record = attempts.get(ip);
  if (record && record.count >= MAX_ATTEMPTS && Date.now() - record.first < WINDOW_MS) {
    return json(res, 429, { error: "Too many attempts. Try again in 15 minutes." });
  }

  const { email, password } = await readBody(req);

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const [admin] =
      typeof email === "string" && typeof password === "string"
        ? await sql`SELECT * FROM admins WHERE email = ${email.trim().toLowerCase()}`
        : [];

    if (!admin || !verifyPassword(password, admin.password_hash)) {
      const fresh = !record || Date.now() - record.first >= WINDOW_MS;
      attempts.set(ip, { first: fresh ? Date.now() : record.first, count: fresh ? 1 : record.count + 1 });
      return json(res, 401, { error: "Incorrect email or password." });
    }

    attempts.delete(ip);
    const token = randomBytes(32).toString("hex");

    // Clean expired sessions & insert new one
    await sql`DELETE FROM sessions WHERE expires_at < ${Date.now()}`;
    await sql`
      INSERT INTO sessions (token_hash, admin_id, expires_at)
      VALUES (${tokenHash(token)}, ${admin.id}, ${Date.now() + SESSION_MS})
    `;

    setCookie(res, token, SESSION_MS);
    return json(res, 200, { email: admin.email, token });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: err.message || "Database connection error." });
  }
}
