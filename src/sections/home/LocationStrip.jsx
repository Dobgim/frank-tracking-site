import { Link } from "react-router-dom";

export default function LocationStrip() {
  return (
    <section id="location-strip">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label reveal">Find Us</span>
          <h2 className="section-title reveal delay-1">
            Our <span className="underline-accent text-green">Location</span> &amp; Contact
          </h2>
          <p className="section-subtitle mx-auto mt-3 reveal delay-2">
            Headquartered in Arizona, USA and serving clients nationwide and across the globe. Get in touch
            with our team today.
          </p>
        </div>
        <div className="location-card reveal">
          <div className="location-inner">
            <div className="row g-4 align-items-center">
              <div className="col-lg-5">
                <span
                  className="section-label"
                  style={{ background: "rgba(243,156,18,.18)", color: "var(--orange)" }}
                >
                  Headquarters
                </span>
                <h2>Arizona, USA</h2>
                <p className="sub">
                  Our main operations hub for domestic and international freight across the Americas, Europe,
                  Asia and beyond. Visit us, call us, or reach out online — we're ready to ship.
                </p>
                <Link className="btn-primary-ttl" to="/contact">
                  {" "}
                  <i className="bi bi-envelope-fill"></i> Contact Us{" "}
                </Link>
              </div>
              <div className="col-lg-7">
                <div className="loc-info-grid">
                  <div className="loc-info-item">
                    <i className="bi bi-geo-alt-fill lii-icon"></i>
                    <div className="lii-label">Address</div>
                    <div className="lii-value">Arizona, United States of America</div>
                  </div>
                  <div className="loc-info-item">
                    <i className="bi bi-telephone-fill lii-icon"></i>
                    <div className="lii-label">Phone</div>
                    <div className="lii-value">+1 (555) 010-0100</div>
                  </div>
                  <div className="loc-info-item">
                    <i className="bi bi-envelope-fill lii-icon"></i>
                    <div className="lii-label">Email</div>
                    <div className="lii-value">demo@example.com</div>
                  </div>
                  <div className="loc-info-item">
                    <i className="bi bi-clock-fill lii-icon"></i>
                    <div className="lii-label">Office Hours</div>
                    <div className="lii-value">Mon – Fri · 8:00am – 6:00pm CT</div>
                  </div>
                  <div className="loc-info-item">
                    <i className="bi bi-flag-fill lii-icon"></i>
                    <div className="lii-label">Registered In</div>
                    <div className="lii-value">State of Arizona, USA</div>
                  </div>
                  <div className="loc-info-item">
                    <i className="bi bi-globe2 lii-icon"></i>
                    <div className="lii-label">Global Coverage</div>
                    <div className="lii-value">85+ Countries · 200+ Agents</div>
                  </div>
                </div>
                <Link
                  className="region-tag"
                  style={{ marginTop: ".5rem", textDecoration: "none" }}
                  to="/contact"
                >
                  {" "}
                  <i className="bi bi-map"></i> View Full Contact Details{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
