// GET /api/status — healthcheck endpoint for Neon Postgres database connection
import { getDb, ensureSchema, json, setCors } from "./_db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL;

  if (!url) {
    return json(res, 500, {
      ok: false,
      error: "DATABASE_URL / POSTGRES_URL environment variable is missing on Vercel.",
      hint: "Go to Vercel Project -> Settings -> Environment Variables and ensure DATABASE_URL or POSTGRES_URL is added to Production, Preview, and Development.",
    });
  }

  try {
    const sql = getDb();
    await ensureSchema(sql);

    const [shipmentCount] = await sql`SELECT COUNT(*) as cnt FROM shipments`;
    const [adminCount] = await sql`SELECT COUNT(*) as cnt FROM admins`;
    const sampleShipments = await sql`SELECT code, status, created_at FROM shipments ORDER BY id DESC LIMIT 5`;

    return json(res, 200, {
      ok: true,
      database: "Neon Postgres connected successfully",
      shipmentsCount: Number(shipmentCount.cnt),
      adminsCount: Number(adminCount.cnt),
      recentShipments: sampleShipments,
    });
  } catch (err) {
    return json(res, 500, {
      ok: false,
      error: err.message,
    });
  }
}
