import { useCallback, useEffect, useState } from "react";

const STATUSES = { pending: "Pending", in_transit: "In transit", on_hold: "On hold", delivered: "Delivered" };
const EMPTY_FORM = { code: "", description: "", originName: "", destinationName: "", speedKmh: 900 };

async function api(path, options = {}) {
  const response = await fetch(`/api/admin${path}`, {
    ...options,
    headers: { "Content-Type": "application/json" },
    body: options.body && JSON.stringify(options.body),
  });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.error), { status: response.status });
  return data;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    try {
      onLogin(await api("/login", { method: "POST", body: { email, password } }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={submit}>
        <h1>Demo Freight Co.</h1>
        <p>Admin login (demo)</p>
        {error && <div className="admin-error">{error}</div>}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

function ShipmentRow({ shipment, onChange, onError }) {
  const [speed, setSpeed] = useState(shipment.speedKmh);
  const delivered = shipment.status === "delivered";

  const patch = async (body) => {
    try {
      await api(`/shipments/${shipment.id}`, { method: "PATCH", body });
      onChange();
    } catch (err) {
      onError(err.message);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete ${shipment.code}?`)) return;
    try {
      await api(`/shipments/${shipment.id}`, { method: "DELETE" });
      onChange();
    } catch (err) {
      onError(err.message);
    }
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
        {shipment.origin.name} → {shipment.destination.name}
      </td>
      <td>
        {Math.round(shipment.coveredKm).toLocaleString()} / {Math.round(shipment.distanceKm).toLocaleString()} km
      </td>
      <td>
        <select value={shipment.status} disabled={delivered} onChange={(e) => patch({ status: e.target.value })}>
          {Object.entries(STATUSES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
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
        <button type="button" className="admin-danger" onClick={remove}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function Dashboard({ admin, onLogout }) {
  const [shipments, setShipments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const [nextShipments, nextMessages] = await Promise.all([api("/shipments"), api("/messages")]);
      setShipments(nextShipments);
      setMessages(nextMessages);
    } catch (err) {
      if (err.status === 401) onLogout();
      else setError(err.message);
    }
  }, [onLogout]);

  useEffect(() => {
    api("/cities").then(setCities).catch((err) => setError(err.message));
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
    try {
      await api("/shipments", { method: "POST", body: { ...form, speedKmh: Number(form.speedKmh) } });
      setForm(EMPTY_FORM);
      setError(null);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await api("/logout", { method: "POST" }).catch(() => {});
    onLogout();
  };

  const count = (status) => shipments.filter((s) => s.status === status).length;
  const cityOptions = cities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ));

  return (
    <div className="admin">
      <header>
        <strong>Demo Freight Co. Admin</strong>
        <span>
          {admin.email} <button onClick={logout}>Log out</button>
        </span>
      </header>
      <main>
        {error && <div className="admin-error">{error}</div>}

        <div className="admin-stats">
          {Object.entries(STATUSES).map(([value, label]) => (
            <div key={value}>
              <b>{count(value)}</b>
              {label}
            </div>
          ))}
        </div>

        <h2>New shipment</h2>
        <form className="admin-form" onSubmit={create}>
          <input placeholder="Tracking code, e.g. DEMO-2001" {...field("code")} />
          <input placeholder="Description" {...field("description")} />
          <select {...field("originName")}>
            <option value="">From…</option>
            {cityOptions}
          </select>
          <select {...field("destinationName")}>
            <option value="">To…</option>
            {cityOptions}
          </select>
          <label>
            Speed (km/h)
            <input type="number" min="1" max="100000" {...field("speedKmh")} />
          </label>
          <button type="submit">Create</button>
        </form>

        <h2>Shipments</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Route</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Speed (km/h)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <ShipmentRow key={shipment.id} shipment={shipment} onChange={refresh} onError={setError} />
              ))}
            </tbody>
          </table>
        </div>

        <h2>Contact messages</h2>
        {messages.length === 0 && <p>No messages yet.</p>}
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

export default function Admin() {
  const [admin, setAdmin] = useState(undefined);
  const logout = useCallback(() => setAdmin(null), []);

  useEffect(() => {
    document.title = "Demo Freight Co. - Admin";
    api("/me").then(setAdmin).catch(() => setAdmin(null));
  }, []);

  if (admin === undefined) return null;
  return admin ? <Dashboard admin={admin} onLogout={logout} /> : <Login onLogin={setAdmin} />;
}
