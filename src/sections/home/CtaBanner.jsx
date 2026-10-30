import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner reveal">
          <span className="section-label">Ready to Ship?</span>
          <h2>
            Start Shipping With
            <br />
            <span style={{ color: "var(--green)" }}>Confidence</span> Today
          </h2>
          <p>
            Join thousands of businesses that trust Global Tropical Cargos — headquartered in Arizona, USA — to
            move their cargo anywhere in the world, safely, affordably and on time.
          </p>
          <div className="cta-btns">
            <Link className="btn-primary-ttl" to="/contact">
              {" "}
              <i className="bi bi-envelope-fill"></i> Get a Free Quote{" "}
            </Link>{" "}
            <Link className="btn-outline-ttl" to="/track-and-trace">
              {" "}
              <i className="bi bi-search"></i> Track Shipment{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
