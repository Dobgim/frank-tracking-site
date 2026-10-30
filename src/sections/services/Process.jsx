export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="text-center mb-5 reveal">
          <span className="section-label">How We Work</span>
          <h2 className="section-title">
            Your Shipment <span className="underline-accent text-green">Journey</span>
          </h2>
          <p
            className="mt-3"
            style={{
              color: "var(--gray)",
              maxWidth: "500px",
              margin: "1rem auto 0",
              fontSize: ".95rem",
              lineHeight: "1.7",
            }}
          >
            A streamlined 5-step process from quote to delivery — with full transparency at every stage.
          </p>
        </div>
        <div className="process-line reveal delay-1">
          <div className="process-step">
            <div className="ps-dot blue">
              <i className="bi bi-pencil-square" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <h5>Request Quote</h5>
            <p>Fill our online form or call us. Get a detailed quote within hours.</p>
          </div>
          <div className="process-step">
            <div className="ps-dot green">
              <i className="bi bi-credit-card" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <h5>Confirm &amp; Book</h5>
            <p>Approve your quote, pay deposit and receive booking confirmation.</p>
          </div>
          <div className="process-step">
            <div className="ps-dot orange">
              <i className="bi bi-box-seam" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <h5>Cargo Handover</h5>
            <p>Drop off at our depot or schedule a collection from your premises.</p>
          </div>
          <div className="process-step">
            <div className="ps-dot teal">
              <i className="bi bi-radar" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <h5>Track Live</h5>
            <p>Monitor your shipment in real-time with milestone SMS/email alerts.</p>
          </div>
          <div className="process-step">
            <div className="ps-dot blue" style={{ background: "var(--green)" }}>
              <i className="bi bi-house-check" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <h5>Safe Delivery</h5>
            <p>Cargo arrives on time. Receive POD and final invoice instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
