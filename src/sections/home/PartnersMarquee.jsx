// PartnersMarquee.jsx – Animated scrolling partnerships strip
// Edit PARTNERS to add/remove companies shown in the strip.
const PARTNERS = [
  { name: "FedEx",         emoji: "📦", color: "#4d148c" },
  { name: "USPS",          emoji: "📮", color: "#004b87" },
  { name: "UPS",           emoji: "🚚", color: "#351c15" },
  { name: "DHL",           emoji: "✈️",  color: "#d40511" },
  { name: "Maersk",        emoji: "🚢", color: "#00243d" },
  { name: "MSC",           emoji: "🛳️", color: "#0061a1" },
  { name: "CMA CGM",       emoji: "⚓", color: "#00205b" },
  { name: "Hapag-Lloyd",   emoji: "🌊", color: "#f47920" },
  { name: "DB Schenker",   emoji: "🚂", color: "#ec0016" },
  { name: "Kuehne+Nagel",  emoji: "🔷", color: "#003399" },
  { name: "Panalpina",     emoji: "🌍", color: "#e2001a" },
  { name: "Bolloré",       emoji: "🌐", color: "#004f9f" },
  { name: "CEVA Logistics",emoji: "📋", color: "#e5002b" },
  { name: "XPO Logistics", emoji: "🔴", color: "#0d5fbe" },
  { name: "TNT",           emoji: "💛", color: "#f60" },
  { name: "Agility",       emoji: "🏳️", color: "#e31837" },
  { name: "Geodis",        emoji: "🟢", color: "#009639" },
  { name: "Rhenus",        emoji: "🔵", color: "#004899" },
  { name: "Evergreen",     emoji: "🌱", color: "#007c3b" },
  { name: "Yang Ming",     emoji: "🚢", color: "#c8102e" },
];

function PartnerItem({ name, emoji, color }) {
  return (
    <li className="partners-item" style={{ "--dot-color": color }}>
      <span className="partners-dot" aria-hidden="true" />
      <span className="partners-emoji" aria-hidden="true">{emoji}</span>
      <span className="partners-name">{name}</span>
    </li>
  );
}

function PartnerTrack({ reversed = false, hidden = false }) {
  const list = reversed ? [...PARTNERS].reverse() : PARTNERS;
  return (
    <ul
      className={`partners-track${reversed ? " partners-track--reverse" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {/* Duplicate for seamless loop */}
      {[...list, ...list].map((p, i) => (
        <PartnerItem key={i} {...p} />
      ))}
    </ul>
  );
}

export default function PartnersMarquee() {
  return (
    <section id="partners-marquee" aria-label="Our logistics partners">
      <div className="partners-header">
        <span className="partners-badge">Trusted Partners</span>
        <h2 className="partners-title">
          Global Network of <span>Industry Leaders</span>
        </h2>
        <p className="partners-sub">
          We work hand-in-hand with the world's most trusted shipping &amp;
          logistics companies to deliver your cargo safely and on time.
        </p>
      </div>

      <div className="partners-overflow">
        {/* Row 1 – scrolls left */}
        <PartnerTrack />
        <PartnerTrack hidden />
        {/* Row 2 – scrolls right */}
        <PartnerTrack reversed />
        <PartnerTrack reversed hidden />
      </div>
    </section>
  );
}
