// To change what scrolls, edit this list.
const ITEMS = [
  { icon: "bi-water", label: "Ocean Freight" },
  { icon: "bi-airplane", label: "Air Freight" },
  { icon: "bi-truck", label: "Road Transport" },
  { icon: "bi-clipboard2-check", label: "Customs Clearance" },
  { icon: "bi-building", label: "Warehousing & Storage" },
  { icon: "bi-diagram-3", label: "Supply Chain Management" },
];

function MarqueeGroup({ hidden = false }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {[...ITEMS, ...ITEMS].map(({ icon, label }, i) => (
        <li className="marquee-item" key={i}>
          <i className={`bi ${icon}`}></i>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section id="marquee" aria-label="Our shipping services">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}
