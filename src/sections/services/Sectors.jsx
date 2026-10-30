export default function Sectors() {
  return (
    <section id="sectors">
      <div className="container">
        <div className="text-center mb-5 reveal">
          <span className="section-label">Industries We Serve</span>
          <h2 className="section-title">
            Built for <span className="underline-accent text-green">Every</span> Industry
          </h2>
        </div>
        <div className="row g-3">
          <div className="col-6 col-md-4 col-lg-2 reveal">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-capsule"></i>
              </div>
              <h5>Pharma &amp; Health</h5>
              <p>Cold chain, temp-control</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 reveal delay-1">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-droplet"></i>
              </div>
              <h5>Oil &amp; Gas</h5>
              <p>Heavy-lift, project cargo</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 reveal delay-2">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-shop"></i>
              </div>
              <h5>Retail &amp; FMCG</h5>
              <p>High-volume, last-mile</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 reveal">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-cpu"></i>
              </div>
              <h5>Technology</h5>
              <p>Air freight, white-glove</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 reveal delay-1">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-building-gear"></i>
              </div>
              <h5>Manufacturing</h5>
              <p>Raw materials, exports</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 reveal delay-2">
            <div className="sector-card">
              <div className="sec-icon">
                <i className="bi bi-tree"></i>
              </div>
              <h5>Agriculture</h5>
              <p>Perishables, fumigation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
