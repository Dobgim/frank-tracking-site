import CountUp from "../../components/CountUp";

export default function Hero() {
  return (
    <section className="about-hero">
      <div className="about-hero__bg"></div>{" "}
      <svg
        className="shape"
        style={{ top: "10%", right: "8%", width: "320px" }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1ABC9C"
          d="M44.8,-76.2C57.6,-69.6,67,-56.3,74.1,-42.2C81.2,-28.1,86,-13,84.4,1.5C82.8,16,74.8,29.9,65.5,42.2C56.2,54.5,45.7,65.2,32.7,72.3C19.7,79.4,4,82.9,-10.7,79.3C-25.5,75.7,-39.2,65,-51.1,53.5C-63,42,-73.1,29.7,-77.3,15.7C-81.4,1.7,-79.5,-14,-73.2,-27.5C-66.9,-41,-56,-52.3,-43.4,-59.1C-30.7,-65.9,-16,-68.3,-0.3,-67.8C15.4,-67.4,32,-82.8,44.8,-76.2Z"
          transform="translate(100 100)"
        ></path>
      </svg>
      <div className="container about-hero__content">
        <div className="row align-items-center min-vh-85">
          <div className="col-lg-8 col-xl-7">
            <div className="hero-tag">
              <span className="dot"></span> Our Story &amp; Mission
            </div>{" "}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                color: "rgba(255,255,255,.5)",
                fontSize: ".78rem",
                marginBottom: "1rem",
              }}
            >
              <i className="bi bi-geo-alt-fill" style={{ color: "var(--orange)" }}></i> Headquartered in
              Arizona, USA
            </div>
            <h1>
              Moving Cargo,
              <br /> Connecting <span className="accent">Continents</span>
            </h1>
            <p className="lead">
              Demo Freight Co. — headquartered in Arizona — is your end-to-end freight partner built on
              trust, powered by technology, and driven by a relentless commitment to getting your goods there
              on time, every time.
            </p>
            <div className="hero-stats">
              <div className="stat-pill">
                <CountUp target={14} /> <span className="lbl">Years Experience</span>
              </div>
              <div className="stat-pill">
                <CountUp target={38} plus /> <span className="lbl">Countries Served</span>
              </div>
              <div className="stat-pill">
                <CountUp target={12000} /> <span className="lbl">Shipments / yr</span>
              </div>
              <div className="stat-pill">
                <span className="num">
                  99
                  <span style={{ color: "var(--orange)" }}>%</span>
                </span>{" "}
                <span className="lbl">On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
