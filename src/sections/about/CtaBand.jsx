import { Link } from "react-router-dom";

export default function CtaBand() {
  return (
    <section id="cta-band">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-7" data-aos="fade-right">
            <h2>Ready to Ship With Confidence?</h2>
            <p>
              From a single pallet to a full container — we have a solution for every cargo, every
              destination, every timeline.
            </p>
          </div>
          <div className="col-lg-5 d-flex flex-wrap gap-3 justify-content-lg-end" data-aos="fade-left">
            <Link className="btn-primary-ttl" to="/track-and-trace">
              {" "}
              <i className="bi bi-geo-alt-fill"></i> Track a Shipment{" "}
            </Link>{" "}
            <Link className="btn-outline-ttl" to="/contact">
              {" "}
              <i className="bi bi-chat-dots"></i> Talk to Us{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
