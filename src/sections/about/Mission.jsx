export default function Mission() {
  return (
    <section id="mission">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-aos="fade-up">
            <div className="section-label justify-content-center">What Drives Us</div>
            <h2 className="section-title">
              Our <span className="hl">Guiding</span> Principles
            </h2>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
            <div className="mv-card">
              <div className="mv-icon" style={{ background: "rgba(26,188,156,.15)" }}>
                <i className="bi bi-compass" style={{ color: "var(--green)", fontSize: "1.6rem" }}></i>
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver seamless, end-to-end logistics solutions that empower businesses to trade
                confidently across borders — combining speed, transparency, and care at every mile.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="120">
            <div className="mv-card">
              <div className="mv-icon" style={{ background: "rgba(243,156,18,.15)" }}>
                <i className="bi bi-eye" style={{ color: "var(--orange)", fontSize: "1.6rem" }}></i>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted logistics partner for U.S. businesses and their global partners — where
                innovation meets integrity, and where no trade lane is too distant or too complex.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="240">
            <div className="mv-card">
              <div className="mv-icon" style={{ background: "rgba(255,255,255,.1)" }}>
                <i className="bi bi-heart-pulse" style={{ color: "#e74c3c", fontSize: "1.6rem" }}></i>
              </div>
              <h3>Our Purpose</h3>
              <p>
                We believe global trade should be accessible to every business. From our base in Arizona, we
                connect American companies to world markets — creating opportunity, efficiency, and growth at
                every step of the supply chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
