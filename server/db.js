import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const file = process.env.DB_FILE || join(here, "data", "demo.sqlite");
mkdirSync(dirname(file), { recursive: true });

export const db = new DatabaseSync(file);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    origin_name TEXT NOT NULL, origin_lat REAL NOT NULL, origin_lng REAL NOT NULL,
    dest_name TEXT NOT NULL, dest_lat REAL NOT NULL, dest_lng REAL NOT NULL,
    distance_km REAL NOT NULL,
    speed_kmh REAL NOT NULL,
    status TEXT NOT NULL,
    covered_km REAL NOT NULL DEFAULT 0,
    settled_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    shipment_type TEXT DEFAULT 'Air Freight',
    sender_name TEXT DEFAULT '',
    receiver_name TEXT DEFAULT '',
    sender_email TEXT DEFAULT '',
    receiver_email TEXT DEFAULT '',
    sender_number TEXT DEFAULT '',
    receiver_number TEXT DEFAULT '',
    sender_address TEXT DEFAULT '',
    receiver_address TEXT DEFAULT '',
    weight_kg REAL DEFAULT 0,
    ship_date TEXT DEFAULT '',
    expected_delivery_date TEXT DEFAULT '',
    expected_delivery_time TEXT DEFAULT '',
    piece_type TEXT DEFAULT 'Carton'
  );
  CREATE TABLE IF NOT EXISTS shipment_events (
    id INTEGER PRIMARY KEY,
    shipment_id INTEGER NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    covered_km REAL NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    payload TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

// Safe migration for existing SQLite databases
const migrations = [
  "ALTER TABLE shipments ADD COLUMN shipment_type TEXT DEFAULT 'Air Freight'",
  "ALTER TABLE shipments ADD COLUMN sender_name TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN receiver_name TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN sender_email TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN receiver_email TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN sender_number TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN receiver_number TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN sender_address TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN receiver_address TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN weight_kg REAL DEFAULT 0",
  "ALTER TABLE shipments ADD COLUMN ship_date TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN expected_delivery_date TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN expected_delivery_time TEXT DEFAULT ''",
  "ALTER TABLE shipments ADD COLUMN piece_type TEXT DEFAULT 'Carton'",
];

for (const sql of migrations) {
  try {
    db.exec(sql);
  } catch {
    // Column already exists, safe to ignore
  }
}
