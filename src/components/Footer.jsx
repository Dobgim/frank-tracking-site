import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(() => window.scrollY > 400);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <section className="cta-band reveal">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div className="cta-label">Ready to Ship?</div>
              <h2 className="cta-heading">
                Get Your <span>Cargo Moving</span>
                <br />
                Today
              </h2>
            </div>
            <div className="col-lg-3 col-md-6">
              <p className="cta-sub">
                Talk to our logistics experts and get a custom freight quote within 24 hours.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 d-flex flex-column gap-3 align-items-md-end">
              <Link className="btn-cta" to="/contact">
                {" "}
                <i className="bi bi-send-fill"></i> Get a Quote{" "}
              </Link>{" "}
              <Link className="btn-cta-outline" to="/track-and-trace">
                {" "}
                <i className="bi bi-radar"></i> Track Shipment{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-main">
        <div className="container position-relative">
          <div className="row gy-5">
            <div className="col-lg-4 col-md-6 reveal">
              <Link to="/">
                {" "}
                <img
                  src="/assets/logo/logo.svg"
                  alt="PrimeLogisticsFlow"
                  className="footer-logo-img"
                  style={{ height: "64px", width: "64px" }}
                />{" "}
              </Link>
              <div className="footer-brand-name">
                Prime<span>Logistics</span><span style={{ color: "var(--orange)" }}>Flow</span>
              </div>
              <span className="footer-tagline">Global Freight &amp; Cargo Solutions</span>
              <p className="footer-desc">
                A trusted partner in global freight forwarding, warehousing, and end-to-end supply chain
                management. From local docks to every corner of the world.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>{" "}
                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>{" "}
                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>{" "}
                <a href="#" aria-label="Twitter/X">
                  <i className="bi bi-twitter-x"></i>
                </a>{" "}
                <a href="#" aria-label="WhatsApp">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 reveal" style={{ transitionDelay: "0.1s" }}>
              <h3 className="footer-col-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/services">
                    <i className="bi bi-chevron-right"></i> Services
                  </Link>
                </li>
                <li>
                  <Link to="/about-us">
                    <i className="bi bi-chevron-right"></i> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/track-and-trace">
                    <i className="bi bi-chevron-right"></i> Track Shipment
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <i className="bi bi-chevron-right"></i> Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy">
                    <i className="bi bi-chevron-right"></i> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms">
                    <i className="bi bi-chevron-right"></i> Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-6 reveal" style={{ transitionDelay: "0.2s" }}>
              <h3 className="footer-col-title">Our Services</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/services">
                    <i className="bi bi-ship"></i> Sea Freight
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <i className="bi bi-airplane"></i> Air Freight
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <i className="bi bi-truck"></i> Road Transport
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <i className="bi bi-building"></i> Warehousing
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <i className="bi bi-box-seam"></i> Customs Clearance
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <i className="bi bi-arrow-repeat"></i> Supply Chain
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 reveal" style={{ transitionDelay: "0.3s" }}>
              <h3 className="footer-col-title">Get In Touch</h3>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <div className="contact-label">Headquarters</div>
                  <div className="contact-value">Arizona, USA</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">
                    <a href="tel:+15550100100">+1 (555) 010-0100</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:demo@example.com">demo@example.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <div>
                  <div className="contact-label">Office Hours</div>
                  <div className="contact-value">Mon – Fri: 08:00 – 18:00</div>
                </div>
              </div>
              <div className="mt-4">
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginBottom: "10px" }}>
                  Subscribe for logistics news &amp; updates:
                </p>
                <div className="newsletter-form">
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Your email address"
                    aria-label="Email address"
                  />{" "}
                  <button className="newsletter-btn" aria-label="Subscribe">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <div className="badge-item">
                  <i className="bi bi-shield-check"></i> Sample Badge A
                </div>
                <div className="badge-item">
                  <i className="bi bi-award"></i> Sample Badge B
                </div>
                <div className="badge-item">
                  <i className="bi bi-globe2"></i> Sample Badge C
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center gy-2">
              <div className="col-md-6">
                <p className="copyright mb-0">
                  © <span id="year">{new Date().getFullYear()}</span>{" "}
                  <Link to="/">PrimeLogisticsFlow</Link>. All rights reserved.
                </p>
              </div>
              <div className="col-md-6">
                <nav className="legal-links" aria-label="Legal links">
                  <Link to="/privacy">Privacy Policy</Link> <Link to="/terms">Terms of Use</Link>{" "}
                  <Link to="/contact">Support</Link>{" "}
                  <Link to="/admin" style={{ color: "var(--orange)", fontWeight: "600" }}>Admin Dashboard</Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <a
        href="#"
        id="scrollTop"
        aria-label="Scroll to top"
        className={`scroll-top${showTop ? " visible" : ""}`}
        onClick={scrollToTop}
      >
        {" "}
        <i className="bi bi-chevron-up"></i>{" "}
      </a>
    </>
  );
}
