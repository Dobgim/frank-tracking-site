import { Link } from "react-router-dom";
import { useTrackSubmit } from "../../lib/forms";

export default function Hero() {
  const handleTrackSubmit = useTrackSubmit();
  return (
    <section id="hero">
      <div className="hero-circles">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
        <div className="circle c4"></div>
      </div>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-content">
            <div className="hero-eyebrow fade-up">
              <i className="bi bi-globe2"></i> Trusted Logistics Partner
            </div>
            <h1 className="hero-title fade-up delay-1">
              Moving Cargo <span>Across</span>
              <br />
              Every Horizon
            </h1>
            <p className="hero-subtitle fade-up delay-2">
              PrimeLogisticsFlow delivers world-class freight, shipping and supply chain solutions across
              North America, Europe, Asia and beyond — with precision and speed.
            </p>
            <div className="hero-address fade-up delay-2">
              <i className="bi bi-geo-alt-fill"></i> Headquartered in Arizona, USA &nbsp;·&nbsp; Serving 85+
              Countries Worldwide
            </div>
            <div className="hero-cta fade-up delay-3">
              <Link className="btn-primary-ttl" to="/track-and-trace">
                {" "}
                <i className="bi bi-search"></i> Track Shipment{" "}
              </Link>{" "}
              <Link className="btn-outline-ttl" to="/services">
                {" "}
                Our Services <i className="bi bi-arrow-right"></i>{" "}
              </Link>
            </div>
            <div className="track-bar fade-up delay-4">
              <p className="track-bar-label">
                <i className="bi bi-radar"></i> Quick Shipment Tracker
              </p>
              <form className="track-form-wrapper" onSubmit={handleTrackSubmit}>
                {" "}
                <div className="track-form-group">
                  <input
                    className="track-real-input"
                    type="text"
                    placeholder="Enter tracking number (e.g. DEMO-1001)"
                    name="track"
                    autoComplete="off"
                    spellCheck="false"
                  />{" "}
                  <button type="submit" className="btn-track-submit" aria-label="Track Shipment">
                    <i className="bi bi-geo-fill"></i> <span>Track Now</span>
                  </button>
                </div>
              </form>
              <div className="track-bar-note">
                <i className="bi bi-shield-check"></i> Secure real-time tracking &nbsp;·&nbsp; Enter your
                reference number above
              </div>
            </div>
          </div>
          <div className="col-lg-6 hero-img-wrap slide-left delay-2">
            <img
              src="/images/pexels-906494-w900.jpeg"
              alt="Container freight terminal"
              className="hero-img-main"
            />
            <div className="hero-badge b1">
              <div className="badge-icon green">
                <i className="bi bi-check2-circle"></i>
              </div>
              <div>
                <p className="badge-title">On-Time Delivery</p>
                <p className="badge-sub">98.7% success rate</p>
              </div>
            </div>
            <div className="hero-badge b2">
              <div className="badge-icon orange">
                <i className="bi bi-box-seam"></i>
              </div>
              <div>
                <p className="badge-title">Live Tracking</p>
                <p className="badge-sub">Real-time GPS updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
