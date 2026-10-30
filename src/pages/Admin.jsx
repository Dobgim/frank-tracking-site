import { useCallback, useEffect, useState } from "react";
import {
  CITIES,
  clearLocalSession,
  createLocalShipment,
  deleteLocalShipment,
  findLocalShipmentByCode,
  getLocalMessages,
  getLocalSession,
  getLocalShipments,
  saveLocalMessage,
  setLocalSession,
  updateLocalShipment,
} from "../lib/storageService";

const STATUSES = { pending: "Pending", in_transit: "In transit", on_hold: "On hold", delivered: "Delivered" };
const EMPTY_FORM = { code: "", description: "", originName: "", destinationName: "", speedKmh: 900 };

// ─── Credentials (fallback mode) ───────────────────────────────────────────────
const ADMIN_CREDENTIALS = {
  "admin@primelogisticsflow.com": "admin123",
  "admin@demofreight.test": "admin123",
};

// ─── API helper — attempts real backend first, falls back to local storage ─────
async function tryApi(path, options = {}) {
  try {
    const response = await fetch(`/api/admin${path}`, {
      ...options,
      headers: { "Content-Type": "application/json" },
      body: options.body && JSON.stringify(options.body),
      signal: AbortSignal.timeout(4000),
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

    // 1. Try real backend
    const result = await tryApi("/login", { method: "POST", body: { email, password } });
    if (result.ok) {
      onLogin(result.data);
      setLoading(false);
      return;
    }

    // 2. Offline fallback — local credentials check
    const trimmedEmail = email.trim().toLowerCase();
    const expectedPwd = ADMIN_CREDENTIALS[trimmedEmail];
    if (expectedPwd && password === expectedPwd) {
      const session = { email: trimmedEmail };
      setLocalSession(trimmedEmail);
      onLogin(session);
      setLoading(false);
      return;
    }

    // 3. Generic error
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
            style={{ height: "64px", width: "64px", marginBottom: "12px" }}
          />
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#061f33", marginBottom: "4px" }}>
            Prime<span style={{ color: "#1abc9c" }}>Logistics</span>
            <span style={{ color: "#f39c12" }}>Flow</span>
          </h1>
          <p style={{ color: "#7f8c8d", fontSize: "0.9rem", margin: 0 }}>Admin Dashboard Login</p>
        </div>
        {error && <div className="admin-error">{error}</div>}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "0.78rem", color: "#7f8c8d" }}>
          Default: admin@primelogisticsflow.com / admin123
        </p>
      </form>
    </div>
  );
}

// ─── Shipment Row ───────────────────────────────────────────────────────────────
function ShipmentRow({ shipment, onChange, onError }) {
  const [speed, setSpeed] = useState(shipment.speedKmh);
  const delivered = shipment.status === "delivered";

  const patch = async (body) => {
    // Try backend first
    const result = await tryApi(`/shipments/${shipment.id}`, { method: "PATCH", body });
    if (result.ok) { onChange(); return; }
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
    if (result.ok) { onChange(); return; }
    if (result.offline) {
      deleteLocalShipment(shipment.id);
      onChange();
      return;
    }
    onError(result.error || "Delete failed.");
  };

  return (
    <tr>
      <td>
        <a href={`/track-and-trace?code=${shipment.code}`} target="_blank" rel="noreferrer">
          {shipment.code}
        </a>
        <small>{shipment.description}</small>
      </td>
      <td>
        {shipment.origin?.name ?? "—"} → {shipment.destination?.name ?? "—"}
      </td>
      <td>
        {Math.round(shipment.coveredKm ?? 0).toLocaleString()} /{" "}
        {Math.round(shipment.distanceKm ?? 0).toLocaleString()} km
      </td>
      <td>
        <select value={shipment.status} disabled={delivered} onChange={(e) => patch({ status: e.target.value })}>
          {Object.entries(STATUSES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          min="1"
          max="100000"
          value={speed}
          disabled={delivered}
          onChange={(e) => setSpeed(e.target.value)}
          onBlur={() => Number(speed) !== shipment.speedKmh && patch({ speedKmh: Number(speed) })}
        />
      </td>
      <td>
        <button type="button" className="admin-danger" onClick={remove}>Delete</button>
      </td>
    </tr>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────
function Dashboard({ admin, onLogout }) {
  const [shipments, setShipments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const refresh = useCallback(async () => {
    // Try backend
    const [shipRes, msgRes] = await Promise.all([tryApi("/shipments"), tryApi("/messages")]);

    if (shipRes.ok && msgRes.ok) {
      setShipments(shipRes.data);
      setMessages(msgRes.data);
      setOffline(false);
    } else if (shipRes.offline || msgRes.offline) {
      // Fall back to local storage
      setShipments(getLocalShipments());
      setMessages(getLocalMessages());
      setOffline(true);
    } else if (shipRes.status === 401 || msgRes.status === 401) {
      onLogout();
    } else {
      // Try local storage anyway
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

  const field = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
    required: name !== "description",
  });

  const create = async (event) => {
    event.preventDefault();
    setError(null);

    const body = { ...form, speedKmh: Number(form.speedKmh) };

    // Try backend
    const result = await tryApi("/shipments", { method: "POST", body });
    if (result.ok) {
      setForm(EMPTY_FORM);
      refresh();
      return;
    }
    if (result.offline) {
      // Local creation
      try {
        createLocalShipment({
          code: form.code,
          description: form.description,
          originName: form.originName,
          destinationName: form.destinationName,
          speedKmh: Number(form.speedKmh),
        });
        setForm(EMPTY_FORM);
        refresh();
      } catch (err) {
        setError(err.message);
      }
      return;
    }
    setError(result.error || "Could not create shipment.");
  };

  const logout = async () => {
    await tryApi("/logout", { method: "POST" }).catch(() => {});
    clearLocalSession();
    onLogout();
  };

  const count = (status) => shipments.filter((s) => s.status === status).length;
  const cityOptions = CITIES.map((city) => (
    <option key={city.name} value={city.name}>{city.name}</option>
  ));

  return (
    <div className="admin">
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/assets/logo/logo.svg" alt="" style={{ height: "36px", width: "36px" }} />
          <strong>
            Prime<span style={{ color: "#1abc9c" }}>Logistics</span>
            <span style={{ color: "#f39c12" }}>Flow</span> Admin
          </strong>
          {offline && (
            <span
              title="Running on local storage — backend not reachable"
              style={{
                background: "#f39c12",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "20px",
                letterSpacing: "0.5px",
              }}
            >
              ⚡ OFFLINE MODE
            </span>
          )}
        </div>
        <span>
          {admin.email}{" "}
          <button onClick={logout}>Log out</button>
        </span>
      </header>
      <main>
        {error && <div className="admin-error">{error}</div>}

        {/* Stats */}
        <div className="admin-stats">
          {Object.entries(STATUSES).map(([value, label]) => (
            <div key={value}>
              <b>{count(value)}</b>
              {label}
            </div>
          ))}
          <div>
            <b>{shipments.length}</b>
            Total Shipments
          </div>
          <div>
            <b>{messages.length}</b>
            Messages
          </div>
        </div>

        {/* New Shipment Form */}
        <h2>New Shipment</h2>
        <form className="admin-form" onSubmit={create}>
          <input placeholder="Tracking code (e.g. PLF-2001)" {...field("code")} />
          <input placeholder="Description (optional)" {...field("description")} />
          <select {...field("originName")}>
            <option value="">Origin city…</option>
            {cityOptions}
          </select>
          <select {...field("destinationName")}>
            <option value="">Destination city…</option>
            {cityOptions}
          </select>
          <label>
            Speed (km/h)
            <input type="number" min="1" max="100000" {...field("speedKmh")} />
          </label>
          <button type="submit">Create Shipment</button>
        </form>

        {/* Shipments Table */}
        <h2>Active Shipments ({shipments.length})</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Code / Description</th>
                <th>Route</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Speed (km/h)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#7f8c8d", padding: "24px" }}>
                    No shipments yet. Create one above.
                  </td>
                </tr>
              )}
              {shipments.map((shipment) => (
                <ShipmentRow
                  key={shipment.id}
                  shipment={shipment}
                  onChange={refresh}
                  onError={setError}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact Messages */}
        <h2>Contact Messages ({messages.length})</h2>
        {messages.length === 0 && <p style={{ color: "#7f8c8d" }}>No messages yet.</p>}
        {messages.map(({ id, at, ...fields }) => (
          <div className="admin-message" key={id}>
            <small>{new Date(at).toLocaleString()}</small>
            {Object.entries(fields).map(([name, value]) => (
              <div key={name}>
                <b>{name.replace(/_/g, " ")}:</b> {String(value)}
              </div>
            ))}
          </div>
        ))}
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
          <img src="/assets/logo/logo.svg" alt="" style={{ height: "56px", width: "56px", marginBottom: "16px" }} />
          <div>Loading PrimeLogisticsFlow Admin…</div>
        </div>
      </div>
    );
  }

  return admin ? <Dashboard admin={admin} onLogout={logout} /> : <Login onLogin={setAdmin} />;
}
