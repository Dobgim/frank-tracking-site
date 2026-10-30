// Shared admin auth guard — call requireAdmin(req, res, sql) before protected routes
import { json, parseCookie } from "../../_db.js";
import { tokenHash } from "../../auth-helper.js";

export async function requireAdmin(req, res, sql) {
  const token = parseCookie(req);
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
    json(res, 401, { error: "Please log in." });
    return null;
  }
  return session;
}
