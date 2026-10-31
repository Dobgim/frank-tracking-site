// Shared admin auth guard — supports Bearer token, x-admin-token, or cookie
import { json, parseCookie } from "../_db.js";
import { tokenHash } from "../auth-helper.js";

export async function requireAdmin(req, res, sql) {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const headerToken = req.headers["x-admin-token"];
  const cookieToken = parseCookie(req);
  const token = bearerToken || headerToken || cookieToken;

  if (!token) {
    json(res, 401, { error: "Please log in." });
    return null;
  }

  const [session] = await sql`
    SELECT admins.email FROM sessions
    JOIN admins ON admins.id = sessions.admin_id
    WHERE token_hash = ${tokenHash(token)} AND expires_at > ${Date.now()}
  `;

  if (!session) {
    json(res, 401, { error: "Session expired or invalid. Please log in again." });
    return null;
  }

  return session;
}
