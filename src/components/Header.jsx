import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

const TICKER_MESSAGES = [
  { icon: "ship", text: "Real-time cargo tracking across 85+ countries" },
  { icon: "globe", text: "PrimeLogisticsFlow – Your trusted freight & cargo partner" },
  { icon: "box", text: "Air, Sea & Road Freight Solutions" },
  { icon: "bolt", text: "Express delivery & live GPS tracking now active" },
];

function TickerMessages() {
  return (
    <span>
      {TICKER_MESSAGES.map(({ icon, text }) => (
        <Fragment key={icon}>
          <img className="ticker-icon" src={`/images/icons/${icon}.svg`} alt="" /> {text} &nbsp;|&nbsp;{" "}
        </Fragment>
      ))}
    </span>
  );
}

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
              <a href="tel:+15550100100">+1 (555) 010-0100</a> <span className="divider">|</span>{" "}
              <i className="bi bi-envelope-fill" style={{ color: "var(--green)" }}></i>{" "}
              <a href="mailto:support@primelogisticsflow.com">support@primelogisticsflow.com</a>
            </div>
            <div className="d-none d-lg-flex align-items-center gap-3">
              <span>
                <i className="bi bi-clock" style={{ color: "var(--green)" }}></i> Mon–Fri: 08:00 – 18:00
              </span>{" "}
              <span className="divider">|</span>{" "}
              <Link to="/track-and-trace">
                <i className="bi bi-radar"></i> Track Shipment
              </Link>
              <span className="divider">|</span>{" "}
              <Link to="/admin" style={{ color: "var(--orange)", fontWeight: 600 }}>
                <i className="bi bi-shield-lock-fill"></i> Admin
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
          <TickerMessages />
          <TickerMessages />
        </div>
      </div>
      <nav
        id="mainNav"
        aria-label="Main navigation"
        className={`navbar navbar-main navbar-expand-lg${scrolled ? " scrolled" : ""}`}
      >
        <div className="container">
          {" "}
          <Link className="navbar-brand d-flex align-items-center gap-2 py-2" to="/">
            {" "}
            <img
              src="/assets/logo/logo.svg"
              alt="PrimeLogisticsFlow Logo"
              className="logo-img"
              style={{ height: "54px", width: "54px", objectFit: "contain" }}
            />{" "}
            <div className="d-flex flex-column text-start">
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", letterSpacing: "0.5px", lineHeight: "1.1" }}>
                Prime<span style={{ color: "var(--green)" }}>Logistics</span><span style={{ color: "var(--orange)" }}>Flow</span>
              </span>
              <span style={{ fontSize: "0.64rem", color: "rgba(255,255,255,0.72)", letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 600 }}>
                Global Freight &amp; Cargo
              </span>
            </div>
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
              <li className="nav-item d-lg-none">
                <Link className="nav-link-custom" to="/admin" style={{ color: "var(--orange)" }}>
                  Admin Dashboard
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
