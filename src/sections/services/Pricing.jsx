import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="text-center mb-5 reveal">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Simple, <span className="underline-accent text-green">Transparent</span> Rates
          </h2>
          <p
            className="mt-3"
            style={{
              color: "var(--gray)",
              maxWidth: "480px",
              margin: "1rem auto 0",
              fontSize: ".95rem",
              lineHeight: "1.7",
            }}
          >
            Choose a plan that fits your business. All plans include tracking, documentation support and
            dedicated customer service.
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4 reveal">
            <div className="price-card">
              <div className="price-tier-name">Starter</div>
              <p className="price-desc">Ideal for individuals and small businesses shipping occasionally.</p>
              <ul className="price-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i> LCL Ocean &amp; Standard Air
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Basic customs documentation
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Online tracking portal access
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Email &amp; phone support
                </li>
                <li>
                  <i className="bi bi-dash-circle" style={{ color: "#ccc" }}></i> Dedicated account manager
                </li>
                <li>
                  <i className="bi bi-dash-circle" style={{ color: "#ccc" }}></i> Supply chain consulting
                </li>
              </ul>
              <Link
                className="btn-outline-blue"
                style={{ width: "100%", justifyContent: "center" }}
                to="/contact"
              >
                {" "}
                Get Started <i className="bi bi-arrow-right"></i>{" "}
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-1">
            <div className="price-card featured-price">
              <span className="price-badge">Most Popular</span>
              <div className="price-tier-name">Business</div>
              <p className="price-desc">
                For growing businesses with regular freight requirements and broader needs.
              </p>
              <ul className="price-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i> FCL, LCL, Air &amp; Road freight
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Full customs clearance
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Warehousing &amp; storage
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Dedicated account manager
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Priority 24/7 support
                </li>
                <li>
                  <i className="bi bi-dash-circle" style={{ color: "rgba(255,255,255,.3)" }}></i> Supply chain
                  consulting
                </li>
              </ul>
              <Link
                className="btn-primary-ttl"
                style={{ width: "100%", justifyContent: "center" }}
                to="/contact"
              >
                {" "}
                Get Started <i className="bi bi-arrow-right"></i>{" "}
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-2">
            <div className="price-card">
              <div className="price-tier-name">Enterprise</div>
              <p className="price-desc">
                Full-service logistics partner for large companies with complex supply chains.
              </p>
              <ul className="price-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i> All freight modes covered
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> End-to-end supply chain mgmt
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Custom SLAs &amp; reporting
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> On-site logistics coordinator
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Supply chain consulting
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Preferential volume pricing
                </li>
              </ul>
              <Link
                className="btn-outline-blue"
                style={{ width: "100%", justifyContent: "center" }}
                to="/contact"
              >
                {" "}
                Contact Sales <i className="bi bi-arrow-right"></i>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
