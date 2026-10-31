// PartnersMarquee.jsx – Animated scrolling partnerships strip with real logos
const PARTNERS = [
  { name: "FedEx",          logo: "https://logo.clearbit.com/fedex.com",              bg: "#4d148c" },
  { name: "USPS",           logo: "https://logo.clearbit.com/usps.com",               bg: "#004b87" },
  { name: "UPS",            logo: "https://logo.clearbit.com/ups.com",                bg: "#351c15" },
  { name: "DHL",            logo: "https://logo.clearbit.com/dhl.com",                bg: "#d40511" },
  { name: "Maersk",         logo: "https://logo.clearbit.com/maersk.com",             bg: "#00243d" },
  { name: "MSC",            logo: "https://logo.clearbit.com/msc.com",                bg: "#0061a1" },
  { name: "CMA CGM",        logo: "https://logo.clearbit.com/cmacgm-group.com",       bg: "#00205b" },
  { name: "Hapag-Lloyd",    logo: "https://logo.clearbit.com/hapag-lloyd.com",        bg: "#f47920" },
  { name: "DB Schenker",    logo: "https://logo.clearbit.com/dbschenker.com",         bg: "#ec0016" },
  { name: "Kuehne+Nagel",   logo: "https://logo.clearbit.com/kuehne-nagel.com",       bg: "#003399" },
  { name: "TNT",            logo: "https://logo.clearbit.com/tnt.com",                bg: "#e85d00" },
  { name: "Geodis",         logo: "https://logo.clearbit.com/geodis.com",             bg: "#009639" },
  { name: "CEVA Logistics", logo: "https://logo.clearbit.com/cevalogistics.com",      bg: "#e5002b" },
  { name: "XPO Logistics",  logo: "https://logo.clearbit.com/xpo.com",               bg: "#0d5fbe" },
  { name: "Agility",        logo: "https://logo.clearbit.com/agility.com",            bg: "#c8102e" },
  { name: "Bolloré",        logo: "https://logo.clearbit.com/bollore.com",            bg: "#004f9f" },
  { name: "Evergreen",      logo: "https://logo.clearbit.com/evergreen-marine.com",   bg: "#007c3b" },
  { name: "Yang Ming",      logo: "https://logo.clearbit.com/yangming.com",           bg: "#c8102e" },
  { name: "Rhenus",         logo: "https://logo.clearbit.com/rhenus.com",             bg: "#004899" },
  { name: "DSV",            logo: "https://logo.clearbit.com/dsv.com",               bg: "#e2001a" },
];

function LogoImg({ name, logo, bg }) {
  return (
    <img
      src={logo}
      alt={name}
      className="pm-logo-img"
      loading="lazy"
      onError={(e) => {
        // Fallback: hide broken image and show coloured initial badge
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "flex";
      }}
    />
  );
}

function PartnerPill({ name, logo, bg }) {
  return (
    <li className="pm-pill">
      <span className="pm-logo-wrap">
        <LogoImg name={name} logo={logo} bg={bg} />
        {/* Fallback initial badge – hidden unless logo fails */}
        <span
          className="pm-initial"
          style={{ background: bg, display: "none" }}
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
      </span>
      <span className="pm-name">{name}</span>
    </li>
  );
}

function PartnerTrack({ partners, direction = "left" }) {
  const doubled = [...partners, ...partners];
  return (
    <div className="pm-wrapper">
      <ul className={`pm-track pm-track--${direction}`}>
        {doubled.map((p, i) => (
          <PartnerPill key={i} {...p} />
        ))}
      </ul>
    </div>
  );
}

export default function PartnersMarquee() {
  const reversed = [...PARTNERS].reverse();

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
      <PartnerTrack partners={PARTNERS} direction="left" />

      {/* Row 2 – scrolls right */}
      <div style={{ marginTop: "14px" }}>
        <PartnerTrack partners={reversed} direction="right" />
      </div>
    </section>
  );
}
