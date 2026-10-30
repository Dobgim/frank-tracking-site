import { randomBytes } from "node:crypto";
import { db } from "./db.js";
import { hashPassword } from "./auth.js";
import { CITIES, createShipment, updateShipment } from "./shipments.js";

const EMAIL = "admin@demofreight.test";
const password = randomBytes(9).toString("base64url");

// Running this again replaces the admin password.
db.prepare("DELETE FROM admins").run();
db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(EMAIL, hashPassword(password));

const city = (name) => CITIES.find((c) => c.name.startsWith(name));
const samples = [
  { code: "DEMO-1001", description: "Sample: machine parts", from: "Houston", to: "Rotterdam", status: "in_transit" },
  { code: "DEMO-1002", description: "Sample: textiles", from: "Shanghai", to: "Los Angeles", status: "on_hold" },
  { code: "DEMO-1003", description: "Sample: medical supplies", from: "London", to: "Douala", status: "pending" },
];

for (const sample of samples) {
  if (db.prepare("SELECT 1 FROM shipments WHERE code = ?").get(sample.code)) continue;
  const shipment = createShipment({
    code: sample.code,
    description: sample.description,
    origin: city(sample.from),
    destination: city(sample.to),
    speedKmh: 900,
    status: sample.status === "on_hold" ? "in_transit" : sample.status,
  });
  if (sample.status === "on_hold") {
    db.prepare("UPDATE shipments SET covered_km = distance_km * 0.4 WHERE id = ?").run(shipment.id);
    updateShipment(shipment.id, { status: "on_hold" });
  }
}

console.log(`Admin email: ${EMAIL}\nAdmin password: ${password}`);
