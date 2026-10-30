export default function Team() {
  return (
    <section id="team">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-aos="fade-up">
            <div className="section-label justify-content-center">The People Behind Every Mile</div>
            <h2 className="section-title">
              Meet Our <span className="hl">Leadership</span>
            </h2>
            <p className="text-muted mt-3" style={{ fontSize: ".98rem", lineHeight: "1.8" }}>
              Seasoned professionals with decades of combined experience in freight, customs, trade finance,
              and supply chain management.
            </p>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
            <div className="team-card">
              <div className="team-img">
                <img src="/images/pexels-2379004-w500.jpeg" alt="CEO" />
                <div className="team-overlay">
                  <div className="team-socials">
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>{" "}
                    <a href="#">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h5>James R. Mitchell</h5>
                <div className="role">Chief Executive Officer</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div className="team-card">
              <div className="team-img">
                <img src="/images/pexels-3756679-w500.jpeg" alt="COO" />
                <div className="team-overlay">
                  <div className="team-socials">
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>{" "}
                    <a href="#">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h5>Maria L. Torres</h5>
                <div className="role">Chief Operations Officer</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="team-card">
              <div className="team-img">
                <img src="/images/pexels-1681010-w500.jpeg" alt="Head of Freight" />
                <div className="team-overlay">
                  <div className="team-socials">
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>{" "}
                    <a href="#">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h5>Derek A. Coleman</h5>
                <div className="role">Head of Freight</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div className="team-card">
              <div className="team-img">
                <img src="/images/pexels-3769021-w500.jpeg" alt="Technology Director" />
                <div className="team-overlay">
                  <div className="team-socials">
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>{" "}
                    <a href="#">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h5>Priya S. Nair</h5>
                <div className="role">Technology Director</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
