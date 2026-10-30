import { Link } from "react-router-dom";

export default function WhyUs() {
  return (
    <section id="why-us">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5 reveal">
            <div className="why-img-stack">
              <div className="exp-badge">
                <div className="num">15</div>
                <div className="lbl">
                  Years
                  <br />
                  Experience
                </div>
              </div>
              <img
                src="/images/pexels-4481259-w800.jpeg"
                alt="US logistics warehouse"
                className="why-img-main"
              />{" "}
              <img
                src="/images/pexels-3184291-w400.jpeg"
                alt="Professional logistics team"
                className="why-img-small"
              />
            </div>
          </div>
          <div className="col-lg-7 reveal delay-2">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title mb-2">
              Logistics You Can
              <br />
              <span className="underline-accent text-green">Trust</span> — Every Mile
            </h2>
            <p className="text-muted mb-3" style={{ lineHeight: "1.75" }}>
              PrimeLogisticsFlow combines deep industry expertise with a powerful global freight network to
              deliver your cargo safely, on time and at competitive rates. Operating out of our Arizona, USA
              headquarters, we are more than a logistics company — we are your dedicated supply chain partner.
            </p>
            <div className="row g-3 mb-4">
              <div className="col-sm-6 reveal delay-1">
                <div className="address-card">
                  <div className="addr-icon fi-orange">
                    <i className="bi bi-building-fill"></i>
                  </div>
                  <div>
                    <div className="addr-label">Headquarters</div>
                    <div className="addr-value">Arizona, USA</div>
                    <div className="addr-sub">Main Operations Center</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 reveal delay-2">
                <div className="address-card">
                  <div className="addr-icon fi-green">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div>
                    <div className="addr-label">Office Hours</div>
                    <div className="addr-value">Mon – Fri: 8am – 6pm</div>
                    <div className="addr-sub">Central Time (CT)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-feature reveal delay-1">
              <div className="feature-icon fi-green">
                <i className="bi bi-shield-check"></i>
              </div>
              <div>
                <h5>Cargo Insurance &amp; Safety</h5>
                <p>
                  All shipments are insured against loss, damage and theft. Our trained handlers follow strict
                  safety protocols at every touchpoint.
                </p>
              </div>
            </div>
            <div className="why-feature reveal delay-2">
              <div className="feature-icon fi-blue">
                <i className="bi bi-geo-alt"></i>
              </div>
              <div>
                <h5>Real-Time GPS Tracking</h5>
                <p>
                  Monitor your cargo 24/7 on our online portal. Get automated alerts at every milestone from
                  dispatch to delivery.
                </p>
              </div>
            </div>
            <div className="why-feature reveal delay-3">
              <div className="feature-icon fi-orange">
                <i className="bi bi-headset"></i>
              </div>
              <div>
                <h5>Dedicated Account Manager</h5>
                <p>
                  Every client gets a dedicated logistics expert available by phone, email and WhatsApp around
                  the clock.
                </p>
              </div>
            </div>
            <div className="why-feature reveal delay-4">
              <div className="feature-icon fi-green">
                <i className="bi bi-globe2"></i>
              </div>
              <div>
                <h5>Global Partner Network</h5>
                <p>
                  Through our network of 200+ trusted agents worldwide, we have coverage in virtually every
                  corner of the globe.
                </p>
              </div>
            </div>
            <Link className="btn-primary-ttl mt-3" to="/about-us">
              {" "}
              Learn More About Us <i className="bi bi-arrow-right"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
