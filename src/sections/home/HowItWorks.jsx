import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label reveal">Simple Process</span>
          <h2 className="section-title reveal delay-1">
            How It <span className="underline-accent text-green">Works</span>
          </h2>
          <p
            className="section-subtitle mx-auto mt-3 reveal delay-2"
            style={{ color: "rgba(255,255,255,.65)" }}
          >
            Ship with us in four easy steps — from booking to doorstep delivery.
          </p>
        </div>
        <div className="row align-items-start g-3 justify-content-center">
          <div className="col-sm-6 col-lg reveal">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon">
                <i className="bi bi-pencil-square"></i>
              </div>
              <h4>Get a Quote</h4>
              <p>
                Fill in your shipment details online or call our Arizona office. Receive a transparent,
                competitive quote within minutes.
              </p>
            </div>
          </div>
          <div className="col-auto step-connector d-none d-lg-flex reveal">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="col-sm-6 col-lg reveal delay-1">
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-icon">
                <i className="bi bi-box-seam"></i>
              </div>
              <h4>Book &amp; Handover</h4>
              <p>
                Confirm your booking, prepare your cargo and hand over to our collection team or drop off at
                our depot.
              </p>
            </div>
          </div>
          <div className="col-auto step-connector d-none d-lg-flex reveal delay-1">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="col-sm-6 col-lg reveal delay-2">
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-icon">
                <i className="bi bi-radar"></i>
              </div>
              <h4>Track in Real Time</h4>
              <p>
                Use your unique tracking number to monitor your shipment live through our online portal at any
                time.
              </p>
            </div>
          </div>
          <div className="col-auto step-connector d-none d-lg-flex reveal delay-2">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="col-sm-6 col-lg reveal delay-3">
            <div className="step-card">
              <div className="step-num">04</div>
              <div className="step-icon">
                <i className="bi bi-house-check"></i>
              </div>
              <h4>Delivered Safely</h4>
              <p>
                Your cargo arrives on schedule. Receive instant confirmation and documentation upon successful
                delivery.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 reveal delay-4">
          <Link className="btn-primary-ttl" to="/track-and-trace">
            {" "}
            <i className="bi bi-search"></i> Track a Shipment{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}
