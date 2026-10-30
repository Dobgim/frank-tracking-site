export default function Coverage() {
  return (
    <section id="coverage">
      <div className="container">
        <div className="coverage-map-wrap">
          <div className="row align-items-center g-4">
            <div className="col-lg-5 coverage-info">
              <span
                className="section-label"
                style={{ background: "rgba(26,188,156,.2)", color: "var(--green)" }}
              >
                Global Reach
              </span>
              <h2>
                We Ship to <span style={{ color: "var(--green)" }}>85+ Countries</span> Worldwide
              </h2>
              <p>
                From our Arizona, USA headquarters — connecting North America to Europe, Latin America to Asia
                Pacific and the Middle East. Our freight network spans every major trade lane on the planet.
                No destination is too far.
              </p>
              <div className="mb-3">
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> USA &amp; Canada
                </span>{" "}
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> Latin America
                </span>{" "}
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> Europe
                </span>{" "}
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> Asia Pacific
                </span>{" "}
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> Middle East
                </span>{" "}
                <span className="region-tag">
                  <i className="bi bi-geo-alt-fill"></i> Africa
                </span>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-6">
                  <div
                    className="coverage-stat"
                    style={{ background: "rgba(255,255,255,.08)", borderRadius: "14px" }}
                  >
                    <div className="num">
                      85
                      <span>+</span>
                    </div>
                    <div className="lbl">Countries</div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="coverage-stat"
                    style={{ background: "rgba(255,255,255,.08)", borderRadius: "14px" }}
                  >
                    <div className="num">
                      200
                      <span>+</span>
                    </div>
                    <div className="lbl">Global Agents</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 reveal delay-2">
              <img
                src="/images/pexels-2226458-w1000.jpeg"
                alt="Global logistics network"
                className="coverage-map-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
