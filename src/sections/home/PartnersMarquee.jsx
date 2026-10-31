// PartnersMarquee.jsx – Animated scrolling partnerships strip
// Edit PARTNERS to add/remove companies.
const PARTNERS = [
  { name: "FedEx",          color: "#4d148c" },
  { name: "USPS",           color: "#004b87" },
  { name: "UPS",            color: "#351c15" },
  { name: "DHL",            color: "#d40511" },
  { name: "Maersk",         color: "#00243d" },
  { name: "MSC",            color: "#0061a1" },
  { name: "CMA CGM",        color: "#00205b" },
  { name: "Hapag-Lloyd",    color: "#f47920" },
  { name: "DB Schenker",    color: "#ec0016" },
  { name: "Kuehne+Nagel",   color: "#003399" },
  { name: "TNT",            color: "#f60" },
  { name: "Geodis",         color: "#009639" },
  { name: "CEVA Logistics", color: "#e5002b" },
  { name: "XPO Logistics",  color: "#0d5fbe" },
  { name: "Agility",        color: "#e31837" },
  { name: "Bolloré",        color: "#004f9f" },
  { name: "Evergreen",      color: "#007c3b" },
  { name: "Yang Ming",      color: "#c8102e" },
  { name: "Rhenus",         color: "#004899" },
  { name: "Panalpina",      color: "#e2001a" },
];

export default function PartnersMarquee() {
  // Duplicate the list so the scroll loops seamlessly
  const doubled = [...PARTNERS, ...PARTNERS];
  const reversed = [...PARTNERS].reverse();
  const doubledRev = [...reversed, ...reversed];

  return (
    <section id="partners-marquee" aria-label="Our logistics partners">
      {/* Header */}
      <div className="pm-header">
        <span className="pm-badge">Trusted Partners</span>
        <h2 className="pm-title">
          Global Network of <span>Industry Leaders</span>
        </h2>
        <p className="pm-sub">
          We work hand-in-hand with the world&apos;s most trusted shipping &amp;
          logistics companies to deliver your cargo safely and on time.
        </p>
      </div>

      {/* Row 1 – scrolls left */}
      <div className="pm-wrapper">
        <ul className="pm-track pm-track--left">
          {doubled.map((p, i) => (
            <li key={i} className="pm-pill" style={{ "--dot": p.color }}>
              <span className="pm-dot" />
              <span className="pm-name">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Row 2 – scrolls right */}
      <div className="pm-wrapper" style={{ marginTop: "14px" }}>
        <ul className="pm-track pm-track--right">
          {doubledRev.map((p, i) => (
            <li key={i} className="pm-pill" style={{ "--dot": p.color }}>
              <span className="pm-dot" />
              <span className="pm-name">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
