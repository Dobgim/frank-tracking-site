import { Link } from "react-router-dom";

export default function CtaBottom() {
  return (
    <section id="cta-bottom">
      <div className="container">
        <div className="cta-inner reveal">
          <span
            className="section-label"
            style={{ background: "rgba(243,156,18,.18)", color: "var(--orange)" }}
          >
            Ready to Ship?
          </span>
          <h2>
            Move Your Cargo with
            <br />
            <span style={{ color: "var(--green)" }}>Demo Freight</span> Co.
          </h2>
          <p>
            Get a free, no-obligation freight quote today. Our logistics experts are standing by to design the
            perfect shipping solution for your business.
          </p>
          <div className="cta-btns">
            <Link className="btn-primary-ttl" to="/contact">
              {" "}
              <i className="bi bi-envelope-fill"></i> Get a Free Quote{" "}
            </Link>{" "}
            <Link className="btn-ghost-white" to="/track-and-trace">
              {" "}
              <i className="bi bi-search"></i> Track a Shipment{" "}
            </Link>{" "}
            <Link className="btn-ghost-white" to="/about-us">
              {" "}
              <i className="bi bi-people"></i> About Us{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
