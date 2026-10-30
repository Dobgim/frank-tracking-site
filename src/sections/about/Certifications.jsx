export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <div className="row justify-content-center text-center mb-2" data-aos="fade-up">
          <div className="col-lg-7">
            <div className="section-label justify-content-center">Compliance &amp; Trust</div>
            <h2 className="section-title">
              Certified &amp; <span className="hl">Accredited</span>
            </h2>
            <p className="text-muted mt-3" style={{ fontSize: ".98rem" }}>
              Our credentials reflect our commitment to international standards, ethical trade, and industry
              best practices.
            </p>
          </div>
        </div>
        <div className="cert-row" data-aos="fade-up" data-aos-delay="100">
          <div className="cert-badge">
            <i className="bi bi-award-fill"></i> <span>IATA Certified</span>
          </div>
          <div className="cert-badge">
            <i className="bi bi-patch-check-fill" style={{ color: "var(--green)" }}></i>{" "}
            <span>ISO 9001:2015</span>
          </div>
          <div className="cert-badge">
            <i className="bi bi-truck" style={{ color: "var(--orange)" }}></i> <span>FIATA Member</span>
          </div>
          <div className="cert-badge">
            <i className="bi bi-globe-americas" style={{ color: "#2980b9" }}></i> <span>WCA Partner</span>
          </div>
          <div className="cert-badge">
            <i className="bi bi-lock-fill" style={{ color: "var(--blue)" }}></i> <span>AEO Approved</span>
          </div>
          <div className="cert-badge">
            <i className="bi bi-clipboard2-check-fill" style={{ color: "#8e44ad" }}></i>{" "}
            <span>C-TPAT Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
