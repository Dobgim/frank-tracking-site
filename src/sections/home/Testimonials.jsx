export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label reveal">Client Stories</span>
          <h2 className="section-title reveal delay-1">
            Trusted by <span className="underline-accent text-green">Thousands</span>
          </h2>
          <p className="section-subtitle mx-auto mt-3 reveal delay-2">
            Don't just take our word for it — hear from businesses we've helped across the globe.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4 reveal">
            <div className="testi-card">
              <span className="testi-ribbon">Sample Review</span>
              <div className="testi-quote">"</div>
              <div className="testi-stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="testi-text">
                Global Tropical Cargos has been our go-to freight partner for two years. Their real-time
                tracking portal and responsive team make cross-border shipping effortless. Highly recommend!
              </p>
              <div className="testi-author">
                <img src="/images/pexels-3184338-w100.jpeg" alt="Client" className="testi-avatar" />
                <div>
                  <div className="testi-name">Sample Client A</div>
                  <div className="testi-role">Satisfied Client · Arizona, USA</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-1">
            <div className="testi-card">
              <span className="testi-ribbon">Sample Review</span>
              <div className="testi-quote">"</div>
              <div className="testi-stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="testi-text">
                We rely on Global Tropical Cargos for time-sensitive medical equipment shipments across the US
                and internationally. They have never missed a deadline. Outstanding reliability and
                professionalism.
              </p>
              <div className="testi-author">
                <img src="/images/pexels-5668858-w100.jpeg" alt="Client" className="testi-avatar" />
                <div>
                  <div className="testi-name">Sample Client B</div>
                  <div className="testi-role">Satisfied Client · Chicago, IL</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 reveal delay-2">
            <div className="testi-card">
              <span className="testi-ribbon">Sample Review</span>
              <div className="testi-quote">"</div>
              <div className="testi-stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
              <p className="testi-text">
                Switched to Global Tropical Cargos for our ocean freight imports from Asia and the difference
                has been night and day — competitive rates, clean documentation, zero customs delays.
              </p>
              <div className="testi-author">
                <img src="/images/pexels-3184405-w100.jpeg" alt="Client" className="testi-avatar" />
                <div>
                  <div className="testi-name">Sample Client C</div>
                  <div className="testi-role">Satisfied Client · Los Angeles, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
