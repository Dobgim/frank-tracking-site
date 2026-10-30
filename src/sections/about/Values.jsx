export default function Values() {
  return (
    <section id="values">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-aos="fade-up">
            <div className="section-label justify-content-center">What We Stand For</div>
            <h2 className="section-title">
              Our Core <span className="hl">Values</span>
            </h2>
            <p className="text-muted mt-3" style={{ fontSize: ".98rem", lineHeight: "1.8" }}>
              These aren't just words on a wall — they're the operating system behind every decision we make
              and every shipment we handle.
            </p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-6 col-lg-3" data-aos="zoom-in" data-aos-delay="0">
            <div className="value-card">
              <div
                className="value-icon"
                style={{ background: "rgba(26,188,156,.1)", color: "var(--green)" }}
              >
                <i className="bi bi-hand-thumbs-up-fill"></i>
              </div>
              <h4>Reliability</h4>
              <p>
                Your cargo's safety and punctuality is our personal commitment — no excuses, no surprises.
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="zoom-in" data-aos-delay="80">
            <div className="value-card">
              <div className="value-icon" style={{ background: "rgba(10,61,98,.1)", color: "var(--blue)" }}>
                <i className="bi bi-eye-fill"></i>
              </div>
              <h4>Transparency</h4>
              <p>Real-time tracking, honest pricing, and proactive communication at every stage.</p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="zoom-in" data-aos-delay="160">
            <div className="value-card">
              <div
                className="value-icon"
                style={{ background: "rgba(243,156,18,.1)", color: "var(--orange)" }}
              >
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h4>Speed</h4>
              <p>Rapid processing, optimised routes, and agile responses when time is of the essence.</p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="zoom-in" data-aos-delay="240">
            <div className="value-card">
              <div className="value-icon" style={{ background: "rgba(52,152,219,.1)", color: "#2980b9" }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <h4>Partnership</h4>
              <p>We grow when you grow. Your success is the only metric that truly matters to us.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
