import { Link } from "react-router-dom";

export default function ServicesGrid({ filter, filtered }) {
  return (
    <section id="services-main">
      <div className="container">
        <div className="text-center mb-5 reveal">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">
            Comprehensive <span className="underline-accent text-green">Logistics</span> Suite
          </h2>
          <p
            className="mt-3"
            style={{
              color: "var(--gray)",
              maxWidth: "540px",
              margin: "1rem auto 0",
              fontSize: "1rem",
              lineHeight: "1.7",
            }}
          >
            Choose from our wide range of logistics and freight solutions, each designed to meet the demands
            of modern global trade.
          </p>
        </div>
        <div className="row g-4" id="services-grid">
          <div
            className={`col-md-6 col-lg-4 reveal svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "sea".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-1427541-w700.jpeg" alt="Ocean Freight" className="svc-card-img" />{" "}
                <span className="svc-tag">Sea Freight</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-blue">
                    <i className="bi bi-water"></i>
                  </div>
                  <span className="svc-num">01</span>
                </div>
                <h3>Ocean Freight</h3>
                <p>
                  Reliable and cost-effective sea freight solutions for businesses of all sizes. We manage
                  both Full Container Load (FCL) and Less than Container Load (LCL) shipments globally.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> FCL &amp; LCL container shipping
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Major port-to-port &amp; door-to-door
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Reefer &amp; hazardous cargo handling
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Real-time container tracking
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">From $150/CBM</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-1 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "air".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-358220-w700.jpeg" alt="Air Freight" className="svc-card-img" />{" "}
                <span className="svc-tag green-tag">Air Cargo</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-green">
                    <i className="bi bi-airplane"></i>
                  </div>
                  <span className="svc-num">02</span>
                </div>
                <h3>Air Freight</h3>
                <p>
                  Speed is everything. Our air freight services connect you to destinations worldwide with
                  next-flight-out options, consolidated cargo and charter solutions.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Express &amp; standard air cargo
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Next-flight-out emergency services
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Perishable &amp; pharma-grade handling
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Airport-to-door delivery
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">From $3.5/kg</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-2 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "road".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-1427521-w700.jpeg" alt="Road Transport" className="svc-card-img" />{" "}
                <span className="svc-tag orange-tag">Road &amp; Rail</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-orange">
                    <i className="bi bi-truck"></i>
                  </div>
                  <span className="svc-num">03</span>
                </div>
                <h3>Road Transport</h3>
                <p>
                  Flexible and reliable road haulage across Africa and major continental routes. Our fleet
                  handles FTL and LTL loads with full GPS monitoring at every kilometre.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> FTL &amp; LTL trucking
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Cross-border African routes
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Temperature-controlled vehicles
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Live GPS fleet tracking
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">Custom pricing</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "customs".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img
                  src="/images/pexels-5668858-w700.jpeg"
                  alt="Customs Clearance"
                  className="svc-card-img"
                />{" "}
                <span className="svc-tag">Customs</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-blue">
                    <i className="bi bi-clipboard2-check"></i>
                  </div>
                  <span className="svc-num">04</span>
                </div>
                <h3>Customs Clearance</h3>
                <p>
                  Navigating customs regulations can be complex. Our licensed brokers handle all
                  documentation, duty calculations and regulatory compliance so your goods move without
                  delays.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Import &amp; export documentation
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Duty &amp; tax computation
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Trade compliance advisory
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Multi-country clearance
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">From $80/declaration</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-1 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "warehouse".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-1181397-w700.jpeg" alt="Warehousing" className="svc-card-img" />{" "}
                <span className="svc-tag green-tag">Warehousing</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-green">
                    <i className="bi bi-building"></i>
                  </div>
                  <span className="svc-num">05</span>
                </div>
                <h3>Warehousing &amp; Storage</h3>
                <p>
                  Secure, modern warehouses with state-of-the-art inventory management. Our facilities offer
                  bonded storage, pick-and-pack, cross-docking and distribution services.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Bonded &amp; climate-controlled storage
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Real-time inventory management
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Pick, pack &amp; dispatch
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Last-mile delivery integration
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">From $0.8/pallet/day</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-2 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "supply".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-3183150-w700.jpeg" alt="Supply Chain" className="svc-card-img" />{" "}
                <span className="svc-tag orange-tag">Supply Chain</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-orange">
                    <i className="bi bi-diagram-3"></i>
                  </div>
                  <span className="svc-num">06</span>
                </div>
                <h3>Supply Chain Management</h3>
                <p>
                  End-to-end supply chain visibility and optimisation. We embed ourselves in your operations,
                  streamlining vendor management, procurement and inbound/outbound logistics.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Vendor &amp; supplier coordination
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Procurement &amp; purchase order mgmt
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Demand forecasting &amp; planning
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Integrated reporting dashboard
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">Custom enterprise pricing</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "sea road".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-236722-w700.jpeg" alt="Project Cargo" className="svc-card-img" />{" "}
                <span className="svc-tag">Project Cargo</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-blue">
                    <i className="bi bi-gear-wide-connected"></i>
                  </div>
                  <span className="svc-num">07</span>
                </div>
                <h3>Project Cargo &amp; Heavy Lift</h3>
                <p>
                  Oversized, heavy and out-of-gauge cargo handled with precision. We plan and execute complex
                  project logistics for oil &amp; gas, construction and industrial clients.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Out-of-gauge &amp; heavy-lift cargo
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Route surveys &amp; permits
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Modular &amp; break-bulk handling
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Dedicated project coordinators
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">Custom pricing</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-1 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "warehouse supply".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-4393668-w700.jpeg" alt="E-Commerce" className="svc-card-img" />{" "}
                <span className="svc-tag green-tag">E-Commerce</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-green">
                    <i className="bi bi-cart3"></i>
                  </div>
                  <span className="svc-num">08</span>
                </div>
                <h3>E-Commerce Fulfillment</h3>
                <p>
                  Powering online retailers with seamless fulfilment. From inbound receiving and storage to
                  pick-pack-ship, returns management and last-mile delivery at scale.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Multi-channel order fulfilment
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Returns &amp; reverse logistics
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> B2C &amp; B2B last-mile delivery
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Platform integrations (Shopify etc.)
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">From $2.5/order</span>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-lg-4 reveal delay-2 svc-item${filtered ? " visible" : ""}`}
            style={{ display: filter === "all" || "sea air".includes(filter) ? undefined : "none" }}
          >
            <div className="svc-mega-card">
              <div className="svc-img-wrap">
                <img src="/images/pexels-2760241-w700.jpeg" alt="Dangerous Goods" className="svc-card-img" />{" "}
                <span className="svc-tag orange-tag">Hazardous</span>
              </div>
              <div className="svc-card-body">
                <div className="svc-icon-row">
                  <div className="svc-icon-box sib-orange">
                    <i className="bi bi-exclamation-triangle"></i>
                  </div>
                  <span className="svc-num">09</span>
                </div>
                <h3>Dangerous Goods Shipping</h3>
                <p>
                  Certified handling and transport of hazardous materials under IATA, IMDG and ADR
                  regulations. Our DG specialists ensure full compliance and zero-incident delivery.
                </p>
                <ul className="svc-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> IATA / IMDG compliant packing
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Hazmat documentation &amp; labelling
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Specialised DG containers
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Certified DG handlers
                  </li>
                </ul>
              </div>
              <div className="svc-card-footer">
                <Link className="svc-link" to="/contact">
                  Get a Quote <i className="bi bi-arrow-right"></i>
                </Link>{" "}
                <span className="svc-price-hint">Custom pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
