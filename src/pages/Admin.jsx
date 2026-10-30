import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CITIES,
  clearLocalSession,
  createLocalShipment,
  deleteLocalShipment,
  getLocalMessages,
  getLocalSession,
  getLocalShipments,
  setLocalSession,
  updateLocalShipment,
} from "../lib/storageService";

const STATUSES = {
  pending: "Pending",
  in_transit: "In transit",
  on_hold: "On hold",
  delivered: "Delivered",
};

const SHIPMENT_TYPES = [
  "Air Freight",
  "Ocean Freight",
  "Road Transport",
  "Express Courier",
  "Rail Freight",
  "Warehousing & Logistics",
];

const PIECE_TYPES = [
  "Carton",
  "Pallet",
  "Container",
  "Box",
  "Crate",
  "Envelope",
  "Barrel",
  "Loose Cargo",
];

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateTrackingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 7; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `GTC-2026-M${random}`;
}

const getInitialForm = () => ({
  code: generateTrackingCode(),
  shipmentType: "Air Freight",
  senderName: "",
  receiverName: "",
  senderEmail: "",
  receiverEmail: "",
  senderNumber: "",
  receiverNumber: "",
  originName: "Houston, USA",
  destinationName: "London, UK",
  weightKg: "12.5",
  status: "pending",
  shipDate: getTodayDateString(),
  expectedDeliveryDate: "",
  expectedDeliveryTime: "",
  pieceType: "Carton",
  senderAddress: "",
  receiverAddress: "",
  speedKmh: 900,
  description: "",
});

// ─── Offline Credentials Fallback ─────────────────────────────────────────────
const ADMIN_CREDENTIALS = {
  "admin@globaltropicalcargos.com": "globaladmin123",
  "admin@demofreight.test": "globaladmin123",
};

// ─── API Helper ───────────────────────────────────────────────────────────────
async function tryApi(path, options = {}) {
  try {
    const response = await fetch(`/api/admin${path}`, {
      ...options,
      headers: { "Content-Type": "application/json" },
      body: options.body && JSON.stringify(options.body),
      signal: AbortSignal.timeout(5000),
    });
    if (response.status === 404 || response.status === 502 || response.status === 503) {
      return { ok: false, offline: true };
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return { ok: false, offline: true };
    }
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error || "Server error"), { status: response.status });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, offline: true, error: err.message, status: err.status };
  }
}

// ─── Login Component ────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await tryApi("/login", { method: "POST", body: { email, password } });
    if (result.ok) {
      onLogin(result.data);
      setLoading(false);
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const expectedPwd = ADMIN_CREDENTIALS[trimmedEmail];
    if (expectedPwd && password === expectedPwd) {
      const session = { email: trimmedEmail };
      setLocalSession(trimmedEmail);
      onLogin(session);
      setLoading(false);
      return;
    }

    setError(result.error || "Incorrect email or password.");
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <form onSubmit={submit}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src="/assets/logo/logo.svg"
            alt="Global Tropical Cargos"
            style={{ height: "60px", width: "60px", marginBottom: "12px" }}
          />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#061f33", marginBottom: "4px" }}>
            Global<span style={{ color: "#1abc9c" }}>Tropical</span>
            <span style={{ color: "#f39c12" }}>Cargos</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Admin Management Portal</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <label>
          Admin Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
            autoFocus
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing in…" : "Sign In to Dashboard"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/" style={{ color: "#0a3d62", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>
            ← Back to Public Website
          </Link>
        </div>
      </form>
    </div>
  );
}

// ─── Create Shipment Modal (Matches User's Screenshot Exactly) ─────────────────
function CreateShipmentModal({ isOpen, onClose, onCreated, onError }) {
  const [form, setForm] = useState(getInitialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(getInitialForm());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || `${form.shipmentType} - ${form.pieceType}`,
      originName: form.originName.trim(),
      destinationName: form.destinationName.trim(),
      speedKmh: Number(form.speedKmh) || 900,
      status: form.status,
      shipmentType: form.shipmentType,
      senderName: form.senderName.trim(),
      receiverName: form.receiverName.trim(),
      senderEmail: form.senderEmail.trim(),
      receiverEmail: form.receiverEmail.trim(),
      senderNumber: form.senderNumber.trim(),
      receiverNumber: form.receiverNumber.trim(),
      senderAddress: form.senderAddress.trim(),
      receiverAddress: form.receiverAddress.trim(),
      weightKg: Number(form.weightKg) || 0,
      shipDate: form.shipDate,
      expectedDeliveryDate: form.expectedDeliveryDate,
      expectedDeliveryTime: form.expectedDeliveryTime,
      pieceType: form.pieceType,
    };

    // 1. Try real backend
    const result = await tryApi("/shipments", { method: "POST", body: payload });
    if (result.ok) {
      onCreated(result.data);
      setSubmitting(false);
      onClose();
      return;
    }

    // 2. Offline fallback
    if (result.offline) {
      try {
        const local = createLocalShipment(payload);
        onCreated(local);
        setSubmitting(false);
        onClose();
      } catch (err) {
        onError(err.message);
        setSubmitting(false);
      }
      return;
    }

    onError(result.error || "Failed to create shipment.");
    setSubmitting(false);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>Create New Shipment</h2>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div className="admin-modal-body">
            <div className="admin-dark-grid">
              {/* Row 1: Tracking ID & Shipment Type */}
              <div className="admin-dark-field">
                <label>TRACKING ID</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="GTC-2026-M79ARFC"
                    required
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, code: generateTrackingCode() }))}
                    title="Generate new ID"
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#94a3b8",
                      padding: "0 12px",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                    }}
                  >
                    <i className="bi bi-shuffle"></i>
                  </button>
                </div>
              </div>

              <div className="admin-dark-field">
                <label>SHIPMENT TYPE *</label>
                <select name="shipmentType" value={form.shipmentType} onChange={handleChange} required>
                  <option value="">Select type</option>
                  {SHIPMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Row 2: Sender Name & Receiver Name */}
              <div className="admin-dark-field">
                <label>SENDER NAME *</label>
                <input
                  type="text"
                  name="senderName"
                  value={form.senderName}
                  onChange={handleChange}
                  placeholder="Sender name"
                  required
                />
              </div>

              <div className="admin-dark-field">
                <label>RECEIVER NAME *</label>
                <input
                  type="text"
                  name="receiverName"
                  value={form.receiverName}
                  onChange={handleChange}
                  placeholder="Receiver name"
                  required
                />
              </div>

              {/* Row 3: Sender Email & Receiver Email */}
              <div className="admin-dark-field">
                <label>SENDER EMAIL</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={form.senderEmail}
                  onChange={handleChange}
                  placeholder="sender@example.com"
                />
              </div>

              <div className="admin-dark-field">
                <label>RECEIVER EMAIL</label>
                <input
                  type="email"
                  name="receiverEmail"
                  value={form.receiverEmail}
                  onChange={handleChange}
                  placeholder="receiver@example.com"
                />
              </div>

              {/* Row 4: Sender Number & Receiver Number */}
              <div className="admin-dark-field">
                <label>SENDER NUMBER</label>
                <input
                  type="tel"
                  name="senderNumber"
                  value={form.senderNumber}
                  onChange={handleChange}
                  placeholder="e.g. +1 234 567 8900"
                />
              </div>

              <div className="admin-dark-field">
                <label>RECEIVER NUMBER</label>
                <input
                  type="tel"
                  name="receiverNumber"
                  value={form.receiverNumber}
                  onChange={handleChange}
                  placeholder="e.g. +1 987 654 3210"
                />
              </div>

              {/* Row 5: Origin & Destination */}
              <div className="admin-dark-field">
                <label>ORIGIN *</label>
                <input
                  type="text"
                  name="originName"
                  value={form.originName}
                  onChange={handleChange}
                  placeholder="City, Country"
                  list="cities-list"
                  required
                />
              </div>

              <div className="admin-dark-field">
                <label>DESTINATION *</label>
                <input
                  type="text"
                  name="destinationName"
                  value={form.destinationName}
                  onChange={handleChange}
                  placeholder="City, Country"
                  list="cities-list"
                  required
                />
              </div>

              {/* Row 6: Weight (KG) & Status */}
              <div className="admin-dark-field">
                <label>WEIGHT (KG) *</label>
                <input
                  type="number"
                  step="0.1"
                  name="weightKg"
                  value={form.weightKg}
                  onChange={handleChange}
                  placeholder="0.0"
                  required
                />
              </div>

              <div className="admin-dark-field">
                <label>STATUS *</label>
                <select name="status" value={form.status} onChange={handleChange} required>
                  {Object.entries(STATUSES).map(([val, lbl]) => (
                    <option key={val} value={val}>{lbl}</option>
                  ))}
                </select>
              </div>

              {/* Row 7: Ship Date & Expected Delivery Date */}
              <div className="admin-dark-field">
                <label>SHIP DATE *</label>
                <input
                  type="date"
                  name="shipDate"
                  value={form.shipDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-dark-field">
                <label>EXPECTED DELIVERY DATE</label>
                <input
                  type="date"
                  name="expectedDeliveryDate"
                  value={form.expectedDeliveryDate}
                  onChange={handleChange}
                />
              </div>

              {/* Row 8: Expected Delivery Time & Piece Type */}
              <div className="admin-dark-field">
                <label>EXPECTED DELIVERY TIME</label>
                <input
                  type="time"
                  name="expectedDeliveryTime"
                  value={form.expectedDeliveryTime}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-dark-field">
                <label>PIECE TYPE</label>
                <select name="pieceType" value={form.pieceType} onChange={handleChange}>
                  <option value="">Select type</option>
                  {PIECE_TYPES.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {/* Row 9: Sender Address & Receiver Address */}
              <div className="admin-dark-field">
                <label>SENDER ADDRESS</label>
                <input
                  type="text"
                  name="senderAddress"
                  value={form.senderAddress}
                  onChange={handleChange}
                  placeholder="Full address"
                />
              </div>

              <div className="admin-dark-field">
                <label>RECEIVER ADDRESS</label>
                <input
                  type="text"
                  name="receiverAddress"
                  value={form.receiverAddress}
                  onChange={handleChange}
                  placeholder="Full address"
                />
              </div>

              {/* Description field - full width */}
              <div className="admin-dark-field" style={{ gridColumn: "1 / -1" }}>
                <label>SHIPMENT DESCRIPTION</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="e.g. Electronic Components, Auto Parts, Medical Equipment…"
                  rows={3}
                  style={{
                    resize: "vertical",
                    minHeight: "80px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Datalist for Cities suggestion */}
            <datalist id="cities-list">
              {CITIES.map((c) => (
                <option key={c.name} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#94a3b8",
                padding: "12px 20px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn-cyan" disabled={submitting}>
              {submitting ? "Creating…" : "Create Shipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Shipment Card ─────────────────────────────────────────────────────────────
function ShipmentCard({ shipment, onChange, onError, onCopied }) {
  const [speed, setSpeed] = useState(shipment.speedKmh);
  const delivered = shipment.status === "delivered";
  const trackingUrl = `${window.location.origin}/track-and-trace?code=${shipment.code}`;

  const patch = async (body) => {
    const result = await tryApi(`/shipments/${shipment.id}`, { method: "PATCH", body });
    if (result.ok) {
      onChange();
      return;
    }
    if (result.offline) {
      try {
        updateLocalShipment(shipment.id, body);
        onChange();
      } catch (err) {
        onError(err.message);
      }
      return;
    }
    onError(result.error || "Update failed.");
  };

  const remove = async () => {
    if (!window.confirm(`Delete shipment ${shipment.code}?`)) return;
    const result = await tryApi(`/shipments/${shipment.id}`, { method: "DELETE" });
    if (result.ok) {
      onChange();
      return;
    }
    if (result.offline) {
      deleteLocalShipment(shipment.id);
      onChange();
      return;
    }
    onError(result.error || "Delete failed.");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      onCopied(`Copied tracking link for ${shipment.code}`);
    } catch {
      window.prompt("Copy tracking URL:", trackingUrl);
    }
  };

  const percent = shipment.distanceKm
    ? Math.min(100, Math.round(((shipment.coveredKm ?? 0) / shipment.distanceKm) * 100))
    : 0;

  return (
    <div className="admin-shipment-card" style={{ background: "#0c1421", borderColor: "#1e293b", color: "#f1f5f9" }}>
      <div className="admin-card-top">
        <a
          href={trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="admin-code-badge"
          style={{ color: "#06b6d4" }}
          title="Click to open public tracking page"
        >
          <i className="bi bi-box-seam"></i>
          {shipment.code}
          <i className="bi bi-box-arrow-up-right" style={{ fontSize: "0.8rem", color: "#64748b" }}></i>
        </a>
        <span className={`admin-status-pill ${shipment.status}`}>
          {STATUSES[shipment.status] || shipment.status}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "8px 0" }}>
        {shipment.shipmentType && (
          <span style={{ fontSize: "0.75rem", background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
            {shipment.shipmentType}
          </span>
        )}
        {shipment.weightKg ? (
          <span style={{ fontSize: "0.75rem", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
            {shipment.weightKg} KG
          </span>
        ) : null}
        {shipment.pieceType && (
          <span style={{ fontSize: "0.75rem", background: "rgba(148, 163, 184, 0.15)", color: "#94a3b8", padding: "2px 8px", borderRadius: "4px" }}>
            {shipment.pieceType}
          </span>
        )}
      </div>

      {/* Sender & Receiver Info */}
      {(shipment.senderName || shipment.receiverName) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", background: "#111c2d", padding: "10px 12px", borderRadius: "8px", fontSize: "0.82rem", margin: "10px 0" }}>
          <div>
            <span style={{ color: "#64748b", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>Sender</span>
            <strong style={{ color: "#f1f5f9" }}>{shipment.senderName || "—"}</strong>
            {shipment.senderNumber && <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{shipment.senderNumber}</div>}
          </div>
          <div>
            <span style={{ color: "#64748b", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>Receiver</span>
            <strong style={{ color: "#f1f5f9" }}>{shipment.receiverName || "—"}</strong>
            {shipment.receiverNumber && <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{shipment.receiverNumber}</div>}
          </div>
        </div>
      )}

      <div className="admin-card-route" style={{ color: "#e2e8f0" }}>
        <i className="bi bi-geo-alt-fill" style={{ color: "#06b6d4" }}></i>
        <span>{shipment.origin?.name ?? "—"}</span>
        <i className="bi bi-arrow-right" style={{ color: "#64748b" }}></i>
        <i className="bi bi-geo-alt-fill" style={{ color: "#f59e0b" }}></i>
        <span>{shipment.destination?.name ?? "—"}</span>
      </div>

      <div className="admin-progress-bar-wrap" style={{ background: "#1e293b" }}>
        <div className="admin-progress-bar" style={{ background: "linear-gradient(90deg, #0284c7, #06b6d4)", width: `${percent}%` }}></div>
      </div>
      <div className="admin-progress-meta">
        <span style={{ color: "#94a3b8" }}>
          {Math.round(shipment.coveredKm ?? 0).toLocaleString()} of{" "}
          {Math.round(shipment.distanceKm ?? 0).toLocaleString()} km
        </span>
        <b style={{ color: "#06b6d4" }}>{percent}%</b>
      </div>

      {/* Dates row */}
      {(shipment.shipDate || shipment.expectedDeliveryDate) && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#94a3b8", marginBottom: "12px" }}>
          <span>Shipped: {shipment.shipDate || "—"}</span>
          <span>Delivery: {shipment.expectedDeliveryDate || "TBD"} {shipment.expectedDeliveryTime ? `at ${shipment.expectedDeliveryTime}` : ""}</span>
        </div>
      )}

      <div className="admin-card-controls">
        <select
          value={shipment.status}
          disabled={delivered}
          onChange={(e) => patch({ status: e.target.value })}
          aria-label="Change Status"
          style={{ background: "#141f32", borderColor: "#223249", color: "#f1f5f9" }}
        >
          {Object.entries(STATUSES).map(([value, label]) => (
            <option key={value} value={value}>
              Status: {label}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          max="100000"
          value={speed}
          disabled={delivered}
          placeholder="Speed (km/h)"
          onChange={(e) => setSpeed(e.target.value)}
          onBlur={() => Number(speed) !== shipment.speedKmh && patch({ speedKmh: Number(speed) })}
          aria-label="Speed (km/h)"
          style={{ background: "#141f32", borderColor: "#223249", color: "#f1f5f9" }}
        />
      </div>

      <div className="admin-card-actions" style={{ borderColor: "#1e293b" }}>
        <a
          href={trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="admin-btn-action"
          style={{ background: "#0284c7", color: "#ffffff" }}
        >
          <i className="bi bi-radar"></i> View Live
        </a>
        <button
          type="button"
          className="admin-btn-action"
          style={{ background: "#1e293b", color: "#f1f5f9" }}
          onClick={copyLink}
        >
          <i className="bi bi-clipboard"></i> Copy Link
        </button>
        <button
          type="button"
          className="admin-btn-action admin-btn-delete"
          onClick={remove}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard Component ────────────────────────────────────────────────────────
function Dashboard({ admin, onLogout }) {
  const [shipments, setShipments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);
  const [offline, setOffline] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const refresh = useCallback(async () => {
    const [shipRes, msgRes] = await Promise.all([tryApi("/shipments"), tryApi("/messages")]);

    if (shipRes.ok && msgRes.ok) {
      setShipments(shipRes.data);
      setMessages(msgRes.data);
      setOffline(false);
    } else if (shipRes.offline || msgRes.offline) {
      setShipments(getLocalShipments());
      setMessages(getLocalMessages());
      setOffline(true);
    } else if (shipRes.status === 401 || msgRes.status === 401) {
      onLogout();
    } else {
      setShipments(getLocalShipments());
      setMessages(getLocalMessages());
      setOffline(true);
    }
  }, [onLogout]);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 5000);
    return () => clearInterval(timer);
  }, [refresh]);

  const showNotification = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  const logout = async () => {
    await tryApi("/logout", { method: "POST" }).catch(() => {});
    clearLocalSession();
    onLogout();
  };

  const count = (status) => shipments.filter((s) => s.status === status).length;

  const filteredShipments = shipments.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.code?.toLowerCase().includes(q) ||
      s.senderName?.toLowerCase().includes(q) ||
      s.receiverName?.toLowerCase().includes(q) ||
      s.origin?.name?.toLowerCase().includes(q) ||
      s.destination?.name?.toLowerCase().includes(q) ||
      s.shipmentType?.toLowerCase().includes(q) ||
      s.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin" style={{ background: "#070e17" }}>
      {/* Header */}
      <header className="admin-header" style={{ background: "#0b1522", borderBottom: "1px solid #1e293b" }}>
        <div className="admin-header-brand">
          <img src="/assets/logo/logo.svg" alt="" style={{ height: "34px", width: "34px" }} />
          <strong>
            Global<span style={{ color: "#06b6d4" }}>Tropical</span>
            <span style={{ color: "#f59e0b" }}>Cargos</span>
          </strong>
          {offline && (
            <span
              style={{
                background: "#f59e0b",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "20px",
              }}
            >
              OFFLINE
            </span>
          )}
        </div>

        <div className="admin-header-user">
          <Link to="/" className="admin-site-btn" target="_blank" rel="noreferrer" style={{ color: "#06b6d4", borderColor: "#06b6d4" }}>
            <i className="bi bi-box-arrow-up-right"></i> View Site
          </Link>
          <span className="d-none d-sm-inline" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
            {admin.email}
          </span>
          <button type="button" className="admin-logout-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 16px" }}>
        {/* Top Alerts */}
        {error && <div className="admin-error"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}
        {notice && (
          <div className="admin-success-banner" style={{ background: "#064e3b", borderColor: "#059669", color: "#a7f3d0" }}>
            <i className="bi bi-check-circle-fill"></i> {notice}
          </div>
        )}

        {/* Recently Created Alert */}
        {lastCreated && (
          <div className="admin-success-banner" style={{ background: "#0c2838", borderColor: "#0284c7", color: "#bae6fd" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
              <div>
                <strong style={{ fontSize: "1.05rem", color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <i className="bi bi-check-circle-fill"></i> Shipment {lastCreated.code} is Live!
                </strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#93c5fd" }}>
                  {lastCreated.shipmentType} • {lastCreated.origin?.name} → {lastCreated.destination?.name} ({lastCreated.weightKg || 0} kg)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLastCreated(null)}
                style={{ background: "none", border: 0, fontSize: "1.1rem", cursor: "pointer", color: "#38bdf8" }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a
                href={`/track-and-trace?code=${lastCreated.code}`}
                target="_blank"
                rel="noreferrer"
                className="admin-btn-cyan"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <i className="bi bi-radar"></i> Open Tracking Page
              </a>
              <button
                type="button"
                style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => {
                  const url = `${window.location.origin}/track-and-trace?code=${lastCreated.code}`;
                  navigator.clipboard.writeText(url);
                  showNotification("Tracking link copied to clipboard!");
                }}
              >
                <i className="bi bi-link-45deg"></i> Copy Link
              </button>
            </div>
          </div>
        )}

        {/* STATS BAR (Matches User Screenshot 2 Exactly) */}
        <div className="admin-stats-bar">
          <div
            className={`admin-stat-box ${filterStatus === "all" ? "featured" : ""}`}
            onClick={() => setFilterStatus("all")}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-stat-icon-wrap teal">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-title">TOTAL SHIPMENTS</span>
              <span className="admin-stat-number">{shipments.length}</span>
            </div>
          </div>

          <div
            className={`admin-stat-box ${filterStatus === "in_transit" ? "featured" : ""}`}
            onClick={() => setFilterStatus(filterStatus === "in_transit" ? "all" : "in_transit")}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-stat-icon-wrap amber">
              <i className="bi bi-truck"></i>
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-title">IN TRANSIT</span>
              <span className="admin-stat-number">{count("in_transit")}</span>
            </div>
          </div>

          <div
            className={`admin-stat-box ${filterStatus === "delivered" ? "featured" : ""}`}
            onClick={() => setFilterStatus(filterStatus === "delivered" ? "all" : "delivered")}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-stat-icon-wrap green">
              <i className="bi bi-check-circle"></i>
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-title">DELIVERED</span>
              <span className="admin-stat-number">{count("delivered")}</span>
            </div>
          </div>

          <div
            className={`admin-stat-box ${filterStatus === "pending" ? "featured" : ""}`}
            onClick={() => setFilterStatus(filterStatus === "pending" ? "all" : "pending")}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-stat-icon-wrap purple">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-title">PENDING</span>
              <span className="admin-stat-number">{count("pending")}</span>
            </div>
          </div>
        </div>

        {/* Action Header & Search */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Search tracking ID, sender, receiver, destination…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "#0c1421",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "15px",
                color: "#f1f5f9",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <button
            type="button"
            className="admin-btn-cyan"
            onClick={() => setModalOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 20px" }}
          >
            <i className="bi bi-plus-lg"></i> Create New Shipment
          </button>
        </div>

        {/* Shipments List */}
        {filteredShipments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 16px", background: "#0c1421", borderRadius: "14px", border: "1px solid #1e293b", color: "#64748b" }}>
            <i className="bi bi-inbox" style={{ fontSize: "3rem", display: "block", marginBottom: "12px", color: "#334155" }}></i>
            <h3 style={{ color: "#94a3b8", fontSize: "1.2rem", margin: "0 0 8px" }}>
              {search ? "No shipments matched your search" : "No shipments yet"}
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: "0.9rem" }}>
              Click below to create your first shipment with all sender, receiver, and parcel details.
            </p>
            <button type="button" className="admin-btn-cyan" onClick={() => setModalOpen(true)}>
              + Create New Shipment
            </button>
          </div>
        ) : (
          <div className="admin-shipments-list">
            {filteredShipments.map((s) => (
              <ShipmentCard
                key={s.id}
                shipment={s}
                onChange={refresh}
                onError={setError}
                onCopied={showNotification}
              />
            ))}
          </div>
        )}
      </main>

      {/* CREATE SHIPMENT MODAL (Screenshot 1) */}
      <CreateShipmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(newShipment) => {
          setLastCreated(newShipment);
          showNotification(`Shipment ${newShipment.code} successfully created!`);
          refresh();
        }}
        onError={setError}
      />
    </div>
  );
}

// ─── Root Admin Component ───────────────────────────────────────────────────────
export default function Admin() {
  const [admin, setAdmin] = useState(undefined);

  const logout = useCallback(() => {
    clearLocalSession();
    setAdmin(null);
  }, []);

  useEffect(() => {
    document.title = "Global Tropical Cargos - Admin Dashboard";

    tryApi("/me").then((result) => {
      if (result.ok) {
        setAdmin(result.data);
        return;
      }
      const localSession = getLocalSession();
      setAdmin(localSession || null);
    });
  }, []);

  if (admin === undefined) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070e17",
          color: "#fff",
          fontSize: "1.1rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/assets/logo/logo.svg"
            alt=""
            style={{ height: "56px", width: "56px", marginBottom: "16px" }}
          />
          <div style={{ color: "#06b6d4", fontWeight: 600 }}>Loading Global Tropical Cargos Admin…</div>
        </div>
      </div>
    );
  }

  return admin ? <Dashboard admin={admin} onLogout={logout} /> : <Login onLogin={setAdmin} />;
}
