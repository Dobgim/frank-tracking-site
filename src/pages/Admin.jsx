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

const SPEED_PRESETS = [
  { label: "✈️ Air (900 km/h)", value: 900 },
  { label: "⚡ Express (500 km/h)", value: 500 },
  { label: "🚛 Road (90 km/h)", value: 90 },
  { label: "🚢 Ocean (40 km/h)", value: 40 },
];

const EMPTY_FORM = {
  code: "",
  description: "",
  originName: "",
  destinationName: "",
  speedKmh: 900,
};

// ─── Offline Credentials Fallback ─────────────────────────────────────────────
const ADMIN_CREDENTIALS = {
  "admin@primelogisticsflow.com": "admin123",
  "admin@demofreight.test": "admin123",
};

// ─── API Helper (tries backend first, falls back to offline storage) ───────────
async function tryApi(path, options = {}) {
  try {
    const response = await fetch(`/api/admin${path}`, {
      ...options,
      headers: { "Content-Type": "application/json" },
      body: options.body && JSON.stringify(options.body),
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error || "Server error"), { status: response.status });
    return { ok: true, data };
  } catch (err) {
    if (err.message === "Failed to fetch" || err.name === "AbortError" || err.name === "TimeoutError") {
      return { ok: false, offline: true };
    }
    return { ok: false, error: err.message, status: err.status };
  }
}

function generateTrackingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PLF-${random}`;
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

    // 1. Try real Node.js backend
    const result = await tryApi("/login", { method: "POST", body: { email, password } });
    if (result.ok) {
      onLogin(result.data);
      setLoading(false);
      return;
    }

    // 2. Offline fallback
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
            alt="PrimeLogisticsFlow"
            style={{ height: "60px", width: "60px", marginBottom: "12px" }}
          />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#061f33", marginBottom: "4px" }}>
            Prime<span style={{ color: "#1abc9c" }}>Logistics</span>
            <span style={{ color: "#f39c12" }}>Flow</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Mobile Admin Portal</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <label>
          Admin Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@primelogisticsflow.com"
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

// ─── Shipment Card (Mobile-Optimized) ──────────────────────────────────────────
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
      // Fallback
      window.prompt("Copy tracking URL:", trackingUrl);
    }
  };

  const percent = shipment.distanceKm
    ? Math.min(100, Math.round(((shipment.coveredKm ?? 0) / shipment.distanceKm) * 100))
    : 0;

  return (
    <div className="admin-shipment-card">
      <div className="admin-card-top">
        <a
          href={trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="admin-code-badge"
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

      <div className="admin-card-desc">
        {shipment.description || "General cargo"}
      </div>

      <div className="admin-card-route">
        <i className="bi bi-geo-alt-fill" style={{ color: "#0a3d62" }}></i>
        <span>{shipment.origin?.name ?? "—"}</span>
        <i className="bi bi-arrow-right" style={{ color: "#1abc9c" }}></i>
        <i className="bi bi-geo-alt-fill" style={{ color: "#f39c12" }}></i>
        <span>{shipment.destination?.name ?? "—"}</span>
      </div>

      <div className="admin-progress-bar-wrap">
        <div className="admin-progress-bar" style={{ width: `${percent}%` }}></div>
      </div>
      <div className="admin-progress-meta">
        <span>
          {Math.round(shipment.coveredKm ?? 0).toLocaleString()} of{" "}
          {Math.round(shipment.distanceKm ?? 0).toLocaleString()} km
        </span>
        <b>{percent}%</b>
      </div>

      <div className="admin-card-controls">
        <select
          value={shipment.status}
          disabled={delivered}
          onChange={(e) => patch({ status: e.target.value })}
          aria-label="Change Status"
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
        />
      </div>

      <div className="admin-card-actions">
        <a
          href={trackingUrl}
          target="_blank"
          rel="noreferrer"
          className="admin-btn-action admin-btn-track"
        >
          <i className="bi bi-radar"></i> View Tracking
        </a>
        <button
          type="button"
          className="admin-btn-action admin-btn-copy"
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
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);
  const [offline, setOffline] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("shipments"); // 'shipments' | 'new' | 'messages'
  const [creating, setCreating] = useState(false);

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

  const create = async (event) => {
    event.preventDefault();
    setError(null);
    setCreating(true);

    const body = {
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || "General cargo",
      originName: form.originName,
      destinationName: form.destinationName,
      speedKmh: Number(form.speedKmh) || 900,
    };

    // 1. Try real Node.js backend
    const result = await tryApi("/shipments", { method: "POST", body });
    if (result.ok) {
      setLastCreated(result.data);
      setForm(EMPTY_FORM);
      showNotification(`Shipment ${result.data.code} created in database!`);
      refresh();
      setActiveTab("shipments");
      setCreating(false);
      return;
    }

    // 2. Offline fallback
    if (result.offline) {
      try {
        const local = createLocalShipment(body);
        setLastCreated(local);
        setForm(EMPTY_FORM);
        showNotification(`Shipment ${local.code} saved to local storage!`);
        refresh();
        setActiveTab("shipments");
      } catch (err) {
        setError(err.message);
      }
      setCreating(false);
      return;
    }

    setError(result.error || "Could not create shipment.");
    setCreating(false);
  };

  const logout = async () => {
    await tryApi("/logout", { method: "POST" }).catch(() => {});
    clearLocalSession();
    onLogout();
  };

  const count = (status) => shipments.filter((s) => s.status === status).length;

  const filteredShipments = shipments.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.code?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.origin?.name?.toLowerCase().includes(q) ||
      s.destination?.name?.toLowerCase().includes(q) ||
      s.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <img src="/assets/logo/logo.svg" alt="" style={{ height: "34px", width: "34px" }} />
          <strong>
            Prime<span style={{ color: "#1abc9c" }}>Logistics</span>
            <span style={{ color: "#f39c12" }}>Flow</span>
          </strong>
          {offline && (
            <span
              style={{
                background: "#f39c12",
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
          <Link to="/" className="admin-site-btn" target="_blank" rel="noreferrer">
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

      <main>
        {/* Alerts & Feedback */}
        {error && <div className="admin-error"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}
        {notice && (
          <div className="admin-success-banner" style={{ background: "#d1fae5", borderColor: "#6ee7b7", color: "#065f46" }}>
            <i className="bi bi-check-circle-fill"></i> {notice}
          </div>
        )}

        {/* Success Banner when a shipment was just created */}
        {lastCreated && (
          <div className="admin-success-banner">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
              <div>
                <strong style={{ fontSize: "1.05rem", color: "#0e6251" }}>
                  ✅ Shipment {lastCreated.code} is Live!
                </strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#0e6251" }}>
                  Route: {lastCreated.origin?.name} → {lastCreated.destination?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLastCreated(null)}
                style={{ background: "none", border: 0, fontSize: "1.1rem", cursor: "pointer", color: "#0e6251" }}
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a
                href={`/track-and-trace?code=${lastCreated.code}`}
                target="_blank"
                rel="noreferrer"
                className="admin-btn-action admin-btn-track"
                style={{ padding: "10px 16px" }}
              >
                <i className="bi bi-radar"></i> Open Tracking Page
              </a>
              <button
                type="button"
                className="admin-btn-action admin-btn-copy"
                style={{ padding: "10px 16px" }}
                onClick={() => {
                  const url = `${window.location.origin}/track-and-trace?code=${lastCreated.code}`;
                  navigator.clipboard.writeText(url);
                  showNotification("Tracking link copied to clipboard!");
                }}
              >
                <i className="bi bi-link-45deg"></i> Copy Client Link
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <b>{shipments.length}</b>
            <span>Total Shipments</span>
          </div>
          {Object.entries(STATUSES).map(([value, label]) => (
            <div className="admin-stat-card" key={value}>
              <b>{count(value)}</b>
              <span>{label}</span>
            </div>
          ))}
          <div className="admin-stat-card">
            <b>{messages.length}</b>
            <span>Inquiries</span>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button
            type="button"
            className={`admin-btn-secondary ${activeTab === "shipments" ? "active" : ""}`}
            style={{
              flex: 1,
              padding: "12px",
              background: activeTab === "shipments" ? "#0a3d62" : "#ffffff",
              color: activeTab === "shipments" ? "#ffffff" : "#1e293b",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 700,
            }}
            onClick={() => setActiveTab("shipments")}
          >
            <i className="bi bi-boxes"></i> Shipments ({shipments.length})
          </button>
          <button
            type="button"
            className={`admin-btn-secondary ${activeTab === "new" ? "active" : ""}`}
            style={{
              flex: 1,
              padding: "12px",
              background: activeTab === "new" ? "#0a3d62" : "#ffffff",
              color: activeTab === "new" ? "#ffffff" : "#1e293b",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 700,
            }}
            onClick={() => setActiveTab("new")}
          >
            <i className="bi bi-plus-circle"></i> New Shipment
          </button>
          <button
            type="button"
            className={`admin-btn-secondary ${activeTab === "messages" ? "active" : ""}`}
            style={{
              padding: "12px 16px",
              background: activeTab === "messages" ? "#0a3d62" : "#ffffff",
              color: activeTab === "messages" ? "#ffffff" : "#1e293b",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 700,
            }}
            onClick={() => setActiveTab("messages")}
          >
            <i className="bi bi-envelope"></i> ({messages.length})
          </button>
        </div>

        {/* TAB 1: NEW SHIPMENT FORM */}
        {activeTab === "new" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>
                <i className="bi bi-plus-circle-fill" style={{ color: "#1abc9c" }}></i>
                Create New Shipment
              </h2>
            </div>

            <form onSubmit={create}>
              <div className="admin-form-grid">
                {/* Code Field with Generate Button */}
                <div className="admin-form-field">
                  <label>Tracking Code *</label>
                  <div className="admin-code-group">
                    <input
                      type="text"
                      placeholder="e.g. PLF-8821"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                      required
                    />
                    <button
                      type="button"
                      className="admin-btn-secondary"
                      onClick={() => setForm({ ...form, code: generateTrackingCode() })}
                      title="Generate random code"
                    >
                      🎲 Generate
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="admin-form-field">
                  <label>Description / Contents</label>
                  <input
                    type="text"
                    placeholder="e.g. Heavy Equipment, 520 kg"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                {/* Origin City */}
                <div className="admin-form-field">
                  <label>Origin City *</label>
                  <select
                    value={form.originName}
                    onChange={(e) => setForm({ ...form, originName: e.target.value })}
                    required
                  >
                    <option value="">Select origin city…</option>
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination City */}
                <div className="admin-form-field">
                  <label>Destination City *</label>
                  <select
                    value={form.destinationName}
                    onChange={(e) => setForm({ ...form, destinationName: e.target.value })}
                    required
                  >
                    <option value="">Select destination city…</option>
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speed & Presets */}
                <div className="admin-form-field" style={{ gridColumn: "1 / -1" }}>
                  <label>Transit Speed (km/h) *</label>
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    value={form.speedKmh}
                    onChange={(e) => setForm({ ...form, speedKmh: e.target.value })}
                    required
                  />
                  <div className="admin-presets">
                    {SPEED_PRESETS.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        className={`admin-preset-chip ${Number(form.speedKmh) === p.value ? "active" : ""}`}
                        onClick={() => setForm({ ...form, speedKmh: p.value })}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="admin-submit-btn" disabled={creating}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                {creating ? "Creating Shipment…" : "Save & Launch Shipment"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ACTIVE SHIPMENTS */}
        {activeTab === "shipments" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>
                <i className="bi bi-box-seam-fill" style={{ color: "#0a3d62" }}></i>
                Shipments ({filteredShipments.length})
              </h2>
              <button
                type="button"
                className="admin-btn-secondary"
                style={{ padding: "6px 12px" }}
                onClick={() => setActiveTab("new")}
              >
                + Add New
              </button>
            </div>

            {/* Search Input for Mobile */}
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="🔍 Search tracking code, city, status…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.5px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {filteredShipments.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 16px", color: "#64748b" }}>
                <i className="bi bi-inbox" style={{ fontSize: "2.5rem", display: "block", marginBottom: "8px" }}></i>
                {search ? "No shipments matched your search." : "No shipments yet."}
                <div style={{ marginTop: "12px" }}>
                  <button
                    type="button"
                    className="admin-btn-action admin-btn-track"
                    style={{ margin: "0 auto", padding: "10px 20px" }}
                    onClick={() => setActiveTab("new")}
                  >
                    Create First Shipment
                  </button>
                </div>
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
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === "messages" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>
                <i className="bi bi-envelope-fill" style={{ color: "#0a3d62" }}></i>
                Customer Inquiries ({messages.length})
              </h2>
            </div>

            {messages.length === 0 ? (
              <p style={{ color: "#64748b", textAlign: "center", padding: "30px 0" }}>No customer messages yet.</p>
            ) : (
              messages.map(({ id, at, ...fields }) => (
                <div className="admin-message-card" key={id}>
                  <small>
                    <i className="bi bi-clock"></i> {new Date(at).toLocaleString()}
                  </small>
                  {Object.entries(fields).map(([name, value]) => (
                    <div key={name} style={{ marginBottom: "4px" }}>
                      <b>{name.replace(/_/g, " ")}:</b> {String(value)}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Root Admin Component ───────────────────────────────────────────────────────
export default function Admin() {
  const [admin, setAdmin] = useState(undefined); // undefined = loading

  const logout = useCallback(() => {
    clearLocalSession();
    setAdmin(null);
  }, []);

  useEffect(() => {
    document.title = "PrimeLogisticsFlow - Admin Dashboard";

    // 1. Check server session
    tryApi("/me").then((result) => {
      if (result.ok) {
        setAdmin(result.data);
        return;
      }
      // 2. Fall back to local session
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
          background: "#061f33",
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
          <div>Loading PrimeLogisticsFlow Admin…</div>
        </div>
      </div>
    );
  }

  return admin ? <Dashboard admin={admin} onLogout={logout} /> : <Login onLogin={setAdmin} />;
}
