import CountStat from "../../components/CountStat";

export default function StatsRibbon() {
  return (
    <section id="stats-ribbon">
      <div className="container">
        <div className="d-flex align-items-center justify-content-around flex-wrap">
          <div className="stat-item reveal">
            <CountStat target={12} suffix="K+" />
            <div className="stat-label">Shipments Delivered</div>
          </div>
          <div className="stat-divider d-none d-md-block"></div>
          <div className="stat-item reveal delay-1">
            <CountStat target={85} suffix="+" />
            <div className="stat-label">Countries Served</div>
          </div>
          <div className="stat-divider d-none d-md-block"></div>
          <div className="stat-item reveal delay-2">
            <CountStat target={98} suffix="%" />
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-divider d-none d-md-block"></div>
          <div className="stat-item reveal delay-3">
            <CountStat target={15} suffix="+" />
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-divider d-none d-md-block"></div>
          <div className="stat-item reveal delay-4">
            <CountStat target={3} suffix="K+" />
            <div className="stat-label">Happy Business Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
