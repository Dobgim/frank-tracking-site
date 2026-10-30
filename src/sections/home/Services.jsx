import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-6 reveal">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title mb-3">
              Logistics <span className="underline-accent text-green">Solutions</span>
              <br />
              Built for Scale
            </h2>
            <p className="section-subtitle">
              From a single parcel to full container loads, we move freight by sea, air and road — with
              complete visibility from pickup to delivery.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0 reveal delay-2">
            <Link className="btn-primary-ttl" to="/services">
              {" "}
              All Services <i className="bi bi-arrow-right"></i>{" "}
            </Link>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4 reveal">
            <div className="service-card">
              <div className="svc-icon fi-blue">
                <i className="bi bi-water"></i>
              </div>
              <h4>Ocean Freight</h4>
              <p>
                FCL and LCL shipping across major global ports. Cost-effective sea freight with full container
                tracking and customs clearance support.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-1">
            <div className="service-card">
              <div className="svc-icon fi-green">
                <i className="bi bi-airplane"></i>
              </div>
              <h4>Air Freight</h4>
              <p>
                Time-critical air cargo solutions with next-flight-out options. Charter or consolidated
                airfreight to destinations worldwide.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-2">
            <div className="service-card">
              <div className="svc-icon fi-orange">
                <i className="bi bi-truck"></i>
              </div>
              <h4>Road Transport</h4>
              <p>
                Flexible road freight across the US and beyond. FTL &amp; LTL trucking with live GPS tracking
                and temperature-controlled options.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-1">
            <div className="service-card">
              <div className="svc-icon fi-blue">
                <i className="bi bi-clipboard2-check"></i>
              </div>
              <h4>Customs Clearance</h4>
              <p>
                Expert customs brokerage, documentation and compliance services. We handle duties, permits and
                regulatory requirements seamlessly.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-2">
            <div className="service-card">
              <div className="svc-icon fi-green">
                <i className="bi bi-building"></i>
              </div>
              <h4>Warehousing &amp; Storage</h4>
              <p>
                Secure, climate-controlled warehouses with inventory management, pick-and-pack and last-mile
                delivery options.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-3">
            <div className="service-card">
              <div className="svc-icon fi-orange">
                <i className="bi bi-diagram-3"></i>
              </div>
              <h4>Supply Chain Mgmt</h4>
              <p>
                End-to-end supply chain visibility and optimization. We integrate into your business to
                streamline procurement to delivery.
              </p>
              <Link className="svc-arrow" to="/services">
                Explore <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
