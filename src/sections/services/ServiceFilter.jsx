export default function ServiceFilter({ filter, onFilter }) {
  return (
    <section id="svc-filter">
      <div className="container">
        <div className="filter-tabs" role="tablist">
          <button className={`ftab${filter === "all" ? " active" : ""}`} onClick={() => onFilter("all")}>
            <i className="bi bi-grid-3x3-gap"></i> All Services
          </button>{" "}
          <button className={`ftab${filter === "sea" ? " active" : ""}`} onClick={() => onFilter("sea")}>
            <i className="bi bi-water"></i> Sea &amp; Ocean
          </button>{" "}
          <button className={`ftab${filter === "air" ? " active" : ""}`} onClick={() => onFilter("air")}>
            <i className="bi bi-airplane"></i> Air Freight
          </button>{" "}
          <button className={`ftab${filter === "road" ? " active" : ""}`} onClick={() => onFilter("road")}>
            <i className="bi bi-truck"></i> Road &amp; Rail
          </button>{" "}
          <button
            className={`ftab${filter === "customs" ? " active" : ""}`}
            onClick={() => onFilter("customs")}
          >
            <i className="bi bi-clipboard2-check"></i> Customs
          </button>{" "}
          <button
            className={`ftab${filter === "warehouse" ? " active" : ""}`}
            onClick={() => onFilter("warehouse")}
          >
            <i className="bi bi-building"></i> Warehousing
          </button>{" "}
          <button
            className={`ftab${filter === "supply" ? " active" : ""}`}
            onClick={() => onFilter("supply")}
          >
            <i className="bi bi-diagram-3"></i> Supply Chain
          </button>
        </div>
      </div>
    </section>
  );
}
