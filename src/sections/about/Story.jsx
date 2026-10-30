export default function Story() {
  return (
    <section id="story">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5" data-aos="fade-right" data-aos-duration="900">
            <div className="story-img-wrap me-lg-3" style={{ marginBottom: "2.5rem" }}>
              <img src="/images/pexels-906494-w900.jpeg" alt="Logistics operations – containers at port" />
              <div className="story-badge">
                <span className="yr">2010</span> <span className="est">EST.</span>
              </div>
            </div>
          </div>
          <div
            className="col-lg-7 story-text"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            <div className="section-label">Who We Are</div>
            <h2 className="section-title mb-4">
              Based in Arizona,
              <br /> Moving <span className="hl">the World</span>
            </h2>
            <p>
              Founded in 2010 in Arizona, Global Tropical Cargo was born out of a simple but powerful
              conviction: every business — no matter its size — deserves reliable, transparent, and affordable
              freight solutions. Strategically headquartered in the heart of America's energy and trade
              capital, we were built to connect U.S. businesses to the world.
            </p>
            <p>
              From humble beginnings managing regional road haulage across the Gulf Coast, we have grown into
              a full-spectrum logistics company with capabilities spanning sea freight, air cargo, customs
              brokerage, warehousing, and last-mile delivery across more than 38 countries on four continents.
            </p>
            <p>
              Our approach is deeply human. We don't just move boxes — we build partnerships, solve supply
              chain puzzles, and celebrate every shipment that reaches its destination safely and on schedule.
            </p>
            <div className="story-highlights">
              <div className="sh-item">
                <i className="bi bi-shield-check"></i>
                <div>
                  <strong>Licensed &amp; Insured</strong>{" "}
                  <span>
                    Fully certified by national and international freight bodies with comprehensive cargo
                    insurance.
                  </span>
                </div>
              </div>
              <div className="sh-item">
                <i className="bi bi-globe2"></i>
                <div>
                  <strong>Global Network</strong>{" "}
                  <span>
                    Strategic partnerships with leading carriers and port agents across every major trade
                    lane.
                  </span>
                </div>
              </div>
              <div className="sh-item">
                <i className="bi bi-cpu"></i>
                <div>
                  <strong>Technology-Driven</strong>{" "}
                  <span>
                    Real-time shipment tracking, digital documentation, and automated customs filing for total
                    visibility.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
