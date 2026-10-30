export default function ValueStrip() {
  return (
    <section id="value-strip">
      <div className="container">
        <div className="row g-2">
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal">
            <div className="vp-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h5>Fully Insured</h5>
            <p>All cargo covered against loss and damage</p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal delay-1">
            <div className="vp-icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <h5>Live Tracking</h5>
            <p>GPS updates at every shipment milestone</p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal delay-2">
            <div className="vp-icon">
              <i className="bi bi-headset"></i>
            </div>
            <h5>24/7 Support</h5>
            <p>Dedicated account managers always available</p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal delay-3">
            <div className="vp-icon">
              <i className="bi bi-globe2"></i>
            </div>
            <h5>85+ Countries</h5>
            <p>Worldwide network of trusted agents</p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal delay-4">
            <div className="vp-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <h5>Clear Pricing</h5>
            <p>No hidden fees or surprise charges</p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 vp-item reveal delay-5">
            <div className="vp-icon">
              <i className="bi bi-patch-check"></i>
            </div>
            <h5>Certified Team</h5>
            <p>Licensed brokers and logistics experts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
