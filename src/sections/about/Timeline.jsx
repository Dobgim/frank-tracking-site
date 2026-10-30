export default function Timeline() {
  return (
    <section id="timeline">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-4" data-aos="fade-right">
            <div className="section-label">Our Journey</div>
            <h2 className="section-title mb-4">
              Milestones That <span className="hl">Shaped</span> Us
            </h2>
            <p style={{ color: "var(--gray)", lineHeight: "1.8", fontSize: ".98rem" }}>
              From a single fleet in Arizona to a global logistics network — every year has brought new
              lessons, new routes, and new commitments to our clients across the U.S. and the world.
            </p>
            <div className="mt-4">
              <img
                src="/images/pexels-4481259-w700.jpeg"
                alt="logistics warehouse"
                style={{
                  width: "100%",
                  borderRadius: "1.2rem",
                  boxShadow: "0 16px 50px rgba(10,61,98,.14)",
                  objectFit: "cover",
                  maxHeight: "280px",
                }}
              />
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-left" data-aos-delay="100">
            <div className="timeline-wrap">
              <div className="tl-item">
                <div className="tl-dot">10</div>
                <div className="tl-year">2010</div>
                <h5>Foundation</h5>
                <p>
                  Demo Freight Co. founded in Arizona with a dedicated fleet and a mission to provide
                  reliable freight solutions across the Gulf Coast and beyond.
                </p>
              </div>
              <div className="tl-item">
                <div className="tl-dot">13</div>
                <div className="tl-year">2013</div>
                <h5>Licensed Customs Broker</h5>
                <p>
                  Obtained full U.S. Customs Brokerage license, enabling us to manage seamless end-to-end
                  import and export processing for clients nationwide.
                </p>
              </div>
              <div className="tl-item">
                <div className="tl-dot">16</div>
                <div className="tl-year">2016</div>
                <h5>Sea &amp; Air Freight Expansion</h5>
                <p>
                  Launched international sea and air freight services out of the Port of Arizona, forging
                  partnerships with global carriers around the world.
                </p>
              </div>
              <div className="tl-item">
                <div className="tl-dot">19</div>
                <div className="tl-year">2019</div>
                <h5>Digital Tracking Platform</h5>
                <p>
                  Rolled out our proprietary Track &amp; Trace technology — giving clients 24/7 real-time
                  visibility over every shipment from origin to destination.
                </p>
              </div>
              <div className="tl-item">
                <div className="tl-dot">23</div>
                <div className="tl-year">2023</div>
                <h5>Global Network Expansion</h5>
                <p>
                  Expanded to 38 countries across the Americas, Europe, Asia, and Africa — establishing bonded
                  warehouses in Arizona, and Miami to support high-volume trade lanes.
                </p>
              </div>
              <div className="tl-item">
                <div className="tl-dot">→</div>
                <div className="tl-year">Today</div>
                <h5>Still Delivering</h5>
                <p>
                  12,000+ shipments annually, 99% on-time rate, and a team of 200+ logistics professionals
                  across Arizona and beyond — committed to your next delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
