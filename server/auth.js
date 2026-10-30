import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "./db.js";

const COOKIE = "demo_session";
const SESSION_MS = 8 * 3_600_000;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60_000;
const attempts = new Map();

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  return timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(hash, "hex"));
}

const tokenHash = (token) => createHash("sha256").update(token).digest("hex");

function readCookie(req) {
  const match = (req.headers.cookie || "").match(new RegExp(`(?:^|; )${COOKIE}=([a-f0-9]+)`));
  return match?.[1];
}

export function login(req, res) {
  const key = req.ip;
  const record = attempts.get(key);
  if (record && record.count >= MAX_ATTEMPTS && Date.now() - record.first < WINDOW_MS) {
    return res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
  }

  const { email, password } = req.body;
  const admin =
    typeof email === "string" && typeof password === "string"
      ? db.prepare("SELECT * FROM admins WHERE email = ?").get(email.trim().toLowerCase())
      : null;

  if (!admin || !verifyPassword(password, admin.password_hash)) {
    const fresh = !record || Date.now() - record.first >= WINDOW_MS;
    attempts.set(key, { first: fresh ? Date.now() : record.first, count: fresh ? 1 : record.count + 1 });
    return res.status(401).json({ error: "Incorrect email or password." });
  }

  attempts.delete(key);
  const token = randomBytes(32).toString("hex");
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO sessions (token_hash, admin_id, expires_at) VALUES (?, ?, ?)").run(
    tokenHash(token),
    admin.id,
    Date.now() + SESSION_MS,
  );
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: SESSION_MS });
  res.json({ email: admin.email });
}

export function logout(req, res) {
  const token = readCookie(req);
  if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
  res.clearCookie(COOKIE);
  res.json({ ok: true });
}

export function requireAdmin(req, res, next) {
  const token = readCookie(req);
  const session =
    token &&
    db
      .prepare(
        `SELECT admins.email FROM sessions JOIN admins ON admins.id = sessions.admin_id
         WHERE token_hash = ? AND expires_at > ?`,
      )
      .get(tokenHash(token), Date.now());
  if (!session) return res.status(401).json({ error: "Please log in." });
  req.admin = session;
  next();
}
