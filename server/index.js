import express from "express";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";
import { login, logout, requireAdmin } from "./auth.js";
import {
  CITIES,
  STATUSES,
  createShipment,
  deleteShipment,
  findByCode,
  listShipments,
  updateShipment,
} from "./shipments.js";

const app = express();
const PORT = process.env.PORT || 4270;
const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

app.use(express.json({ limit: "20kb" }));

const validSpeed = (value) => Number.isFinite(value) && value > 0 && value <= 100000;

// Public
app.get("/api/track/:code", (req, res) => {
  const shipment = findByCode(req.params.code.trim().toUpperCase());
  if (!shipment) return res.status(404).json({ error: "No shipment found with that tracking code." });
  const { id, ...publicData } = shipment;
  res.json(publicData);
});

app.post("/api/messages", (req, res) => {
  if (!req.body || typeof req.body !== "object" || !Object.keys(req.body).length) {
    return res.status(400).json({ error: "The message is empty." });
  }
  db.prepare("INSERT INTO messages (payload, created_at) VALUES (?, ?)").run(JSON.stringify(req.body), Date.now());
  res.status(201).json({ ok: true });
});

// Admin
app.post("/api/admin/login", login);
app.post("/api/admin/logout", logout);
app.use("/api/admin", requireAdmin);

app.get("/api/admin/me", (req, res) => res.json({ email: req.admin.email }));
app.get("/api/admin/cities", (req, res) => res.json(CITIES));
app.get("/api/admin/shipments", (req, res) => res.json(listShipments()));

app.post("/api/admin/shipments", (req, res) => {
  const { code, description, originName, destinationName, speedKmh } = req.body;
  const origin = CITIES.find((c) => c.name === originName);
  const destination = CITIES.find((c) => c.name === destinationName);
  const cleanCode = typeof code === "string" ? code.trim().toUpperCase() : "";

  if (!/^[A-Z0-9-]{3,30}$/.test(cleanCode)) {
    return res.status(400).json({ error: "Tracking code must be 3-30 letters, numbers or dashes." });
  }
  if (!origin || !destination || origin === destination) {
    return res.status(400).json({ error: "Choose two different cities." });
  }
  if (!validSpeed(speedKmh)) return res.status(400).json({ error: "Speed must be between 1 and 100000 km/h." });

  try {
    res.status(201).json(
      createShipment({
        code: cleanCode,
        description: String(description || "General cargo").slice(0, 200),
        origin,
        destination,
        speedKmh,
      }),
    );
  } catch (error) {
    if (String(error.message).includes("UNIQUE")) {
      return res.status(409).json({ error: "That tracking code already exists." });
    }
    throw error;
  }
});

app.patch("/api/admin/shipments/:id", (req, res) => {
  const { status, speedKmh } = req.body;
  if (status !== undefined && !STATUSES.includes(status)) return res.status(400).json({ error: "Unknown status." });
  if (speedKmh !== undefined && !validSpeed(speedKmh)) {
    return res.status(400).json({ error: "Speed must be between 1 and 100000 km/h." });
  }
  try {
    const shipment = updateShipment(Number(req.params.id), { status, speedKmh });
    if (!shipment) return res.status(404).json({ error: "Shipment not found." });
    res.json(shipment);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.delete("/api/admin/shipments/:id", (req, res) => {
  if (!deleteShipment(Number(req.params.id))) return res.status(404).json({ error: "Shipment not found." });
  res.json({ ok: true });
});

app.get("/api/admin/messages", (req, res) => {
  const rows = db.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 200").all();
  res.json(rows.map((row) => ({ id: row.id, at: row.created_at, ...JSON.parse(row.payload) })));
});

// Built website, when running with `npm start`
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (req, res) => res.sendFile(join(dist, "index.html")));
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, "127.0.0.1", () => console.log(`Demo server running on http://localhost:${PORT}`));
