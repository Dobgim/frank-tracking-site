import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
            <div className="d-flex align-items-center flex-wrap gap-1">
              <i className="bi bi-telephone-fill" style={{ color: "var(--green)" }}></i>{" "}
              <a href="tel:+0000000000">+1(559)213-2902</a> <span className="divider">|</span>{" "}
              <i className="bi bi-envelope-fill" style={{ color: "var(--green)" }}></i>{" "}
              <a href="mailto:info@globaltropicalcargo.com">info@globaltropicalcargo.com</a>
            </div>
            <div className="d-none d-lg-flex align-items-center gap-3">
              <span>
                <i className="bi bi-clock" style={{ color: "var(--green)" }}></i> Mon–Fri: 08:00 – 18:00
              </span>{" "}
              <span className="divider">|</span>{" "}
              <Link to="/track-and-trace">
                <i className="bi bi-radar"></i> Track Shipment
              </Link>
              <div className="d-flex gap-2 ms-2">
                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>{" "}
                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>{" "}
                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="announce-strip" aria-label="Announcements">
        <div className="ticker-wrap">
          <span>
            🚢 Real-time cargo tracking across 50+ countries &nbsp;|&nbsp; 🌍 Global Tropical Cargo – Your
            trusted freight partner &nbsp;|&nbsp; 📦 Air, Sea &amp; Road Freight Solutions &nbsp;|&nbsp; ⚡
            Express delivery now available &nbsp;|&nbsp;
          </span>{" "}
          <span>
            🚢 Real-time cargo tracking across 50+ countries &nbsp;|&nbsp; 🌍 Global Tropical Cargo – Your
            trusted freight partner &nbsp;|&nbsp; 📦 Air, Sea &amp; Road Freight Solutions &nbsp;|&nbsp; ⚡
            Express delivery now available &nbsp;|&nbsp;
          </span>
        </div>
      </div>
      <nav
        id="mainNav"
        aria-label="Main navigation"
        className={`navbar navbar-main navbar-expand-lg${scrolled ? " scrolled" : ""}`}
      >
        <div className="container">
          {" "}
          <Link className="navbar-brand" to="/">
            {" "}
            <img
              src="/assets/logo/ttllogo.png"
              alt="Global Tropical Cargo Logo"
              className="logo-img"
              style={{ height: "100px", width: "100px" }}
            />{" "}
          </Link>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>{" "}
          <div
            className="collapse navbar-collapse justify-content-end align-items-center gap-lg-1"
            id="navMenu"
          >
            <ul className="navbar-nav align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link-custom active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-custom active" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-custom" to="/about-us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-custom" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>{" "}
            <Link className="btn-track ms-lg-3" to="/track-and-trace">
              {" "}
              <i className="bi bi-radar"></i> Track Shipment{" "}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
