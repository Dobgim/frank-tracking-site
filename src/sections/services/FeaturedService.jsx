import { Link } from "react-router-dom";

export default function FeaturedService() {
  return (
    <section id="featured-svc">
      <div className="container">
        <div className="featured-card reveal">
          <div className="featured-card-inner">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <span
                  className="section-label"
                  style={{ background: "rgba(26,188,156,.2)", border: "1px solid rgba(26,188,156,.3)" }}
                >
                  {" "}
                  Most Popular{" "}
                </span>
                <h2>Ocean Freight — Our Flagship Service</h2>
                <p>
                  Our ocean freight division handles over 8,000 container movements per year across 60+ trade
                  lanes. Whether you're an SME or a multinational, we tailor sea freight solutions to your
                  exact requirements.
                </p>
                <div className="featured-feats">
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> FCL &amp; LCL
                  </span>{" "}
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> 60+ Trade Lanes
                  </span>{" "}
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> Door-to-Door
                  </span>{" "}
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> Live Container Tracking
                  </span>{" "}
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> Competitive Rates
                  </span>{" "}
                  <span className="feat-pill">
                    <i className="bi bi-check2-circle"></i> Customs Included
                  </span>
                </div>
                <Link className="btn-primary-ttl" to="/contact">
                  {" "}
                  <i className="bi bi-send-fill"></i> Request Ocean Freight Quote{" "}
                </Link>
              </div>
              <div className="col-lg-6">
                <img src="/images/pexels-906494-w900.jpeg" alt="Port aerial" className="featured-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
