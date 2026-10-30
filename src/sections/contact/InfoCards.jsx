import { Link } from "react-router-dom";

export default function InfoCards() {
  return (
    <div className="container info-cards">
      <div className="row g-3">
        <div className="col-sm-6 col-lg-3">
          <div className="info-card">
            <div className="info-card__icon">
              <i className="fas fa-phone-volume"></i>
            </div>
            <div>
              <div className="info-card__label">Call Us</div>
              <div className="info-card__value">+1(559) 213-2902</div>
              <div className="info-card__sub">Mon–Fri, 8 AM – 6 PM CST</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="info-card">
            <div className="info-card__icon">
              <i className="fas fa-envelope-open-text"></i>
            </div>
            <div>
              <div className="info-card__label">Email Us</div>
              <div className="info-card__value">info@globaltropicalcargo.com</div>
              <div className="info-card__sub">Response within 2 hours</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="info-card">
            <div className="info-card__icon">
              <i className="fas fa-location-dot"></i>
            </div>
            <div>
              <div className="info-card__label">Our Office</div>
              <div className="info-card__value">Arizona, USA</div>
              <div className="info-card__sub">Arizona, United States</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="info-card">
            <div className="info-card__icon">
              <i className="fas fa-satellite-dish"></i>
            </div>
            <div>
              <div className="info-card__label">Track &amp; Trace</div>
              <div className="info-card__value">
                <Link style={{ color: "var(--blue)", textDecoration: "none" }} to="/track-and-trace">
                  Track Shipment
                </Link>
              </div>
              <div className="info-card__sub">24/7 live tracking portal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
