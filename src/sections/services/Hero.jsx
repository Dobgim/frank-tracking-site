import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-orb orb-1"></div>
      <div className="hero-orb orb-2"></div>
      <div className="hero-orb orb-3"></div>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-content">
            <nav className="hero-breadcrumb fade-in">
              <Link to="/">Home</Link> <i className="bi bi-chevron-right"></i>{" "}
              <span style={{ color: "var(--green)" }}>Services</span>
            </nav>
            <span
              className="section-label fade-up"
              style={{ background: "rgba(26,188,156,.18)", border: "1px solid rgba(26,188,156,.3)" }}
            >
              {" "}
              What We Do{" "}
            </span>
            <h1 className="hero-title fade-up delay-1">
              End-to-End
              <br /> <span className="accent">Logistics</span> &amp;
              <br /> <span className="accent2">Freight</span> Solutions
            </h1>
            <p className="hero-subtitle fade-up delay-2">
              From ocean freight to last-mile delivery, customs clearance to supply chain management — PrimeLogisticsFlow offers a full suite of services engineered to move your cargo across borders with
              speed, safety and precision.
            </p>
            <div className="hero-chips fade-up delay-3">
              <span className="chip">
                <i className="bi bi-water"></i> Ocean Freight
              </span>{" "}
              <span className="chip">
                <i className="bi bi-airplane"></i> Air Cargo
              </span>{" "}
              <span className="chip">
                <i className="bi bi-truck"></i> Road Haulage
              </span>{" "}
              <span className="chip">
                <i className="bi bi-clipboard2-check"></i> Customs
              </span>{" "}
              <span className="chip">
                <i className="bi bi-building"></i> Warehousing
              </span>
            </div>
            <div className="hero-cta fade-up delay-4">
              <Link className="btn-primary-ttl" to="/contact">
                {" "}
                <i className="bi bi-envelope-fill"></i> Get a Free Quote{" "}
              </Link>{" "}
              <Link className="btn-ghost-white" to="/track-and-trace">
                {" "}
                <i className="bi bi-search"></i> Track Shipment{" "}
              </Link>
            </div>
          </div>
          <div className="col-lg-6 hero-visual fade-in delay-2">
            <div style={{ position: "relative" }}>
              <div className="hero-img-grid">
                <img src="/images/pexels-1427541-w900.jpeg" alt="Container ship" className="hig-1" />{" "}
                <img src="/images/pexels-3806744-w500.jpeg" alt="Logistics team" className="hig-2" />{" "}
                <img src="/images/pexels-906494-w500.jpeg" alt="Port cargo" className="hig-3" />
              </div>
              <div className="hero-stat-pill p1">
                <div className="pill-icon pi-green">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div>
                  <div className="pill-val">12,000+</div>
                  <p className="pill-lbl">Shipments Completed</p>
                </div>
              </div>
              <div className="hero-stat-pill p2">
                <div className="pill-icon pi-orange">
                  <i className="bi bi-globe2"></i>
                </div>
                <div>
                  <div className="pill-val">85+ Countries</div>
                  <p className="pill-lbl">Global Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
