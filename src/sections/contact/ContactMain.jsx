import { useState } from "react";
import { handleContactSubmit } from "../../lib/forms";
import { COUNTRIES } from "../../data/countries";

export default function ContactMain() {
  const [tab, setTab] = useState("contact");
  return (
    <section style={{ padding: "0 0 100px" }}>
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-8 reveal">
            <div className="mb-4">
              <div className="section-label">Contact &amp; Quotes</div>
              <h2 className="section-title">
                Send Us a <em>Message</em>
              </h2>
              <p style={{ color: "var(--gray)", fontSize: ".93rem", lineHeight: "1.7", maxWidth: "520px" }}>
                Whether you need a freight quote, want to track a shipment, or have a general inquiry — fill
                in the form below and our team will be in touch shortly.
              </p>
            </div>
            <div className="form-tabs-wrap">
              <div className="form-tab-nav">
                <button
                  className={`form-tab-btn${tab === "contact" ? " active" : ""}`}
                  onClick={() => setTab("contact")}
                >
                  <i className="fas fa-envelope"></i> <span className="tab-label">Contact Us</span>
                </button>{" "}
                <button
                  className={`form-tab-btn${tab === "quote" ? " active" : ""}`}
                  onClick={() => setTab("quote")}
                >
                  <i className="fas fa-file-invoice-dollar"></i>{" "}
                  <span className="tab-label">Request a Quote</span>
                </button>
              </div>
              <div id="tab-contact" className={`form-tab-content${tab === "contact" ? " active" : ""}`}>
                <form onSubmit={handleContactSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="field-label">
                        First Name <span>*</span>
                      </label>{" "}
                      <input type="text" name="first_name" placeholder="e.g. John" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Last Name <span>*</span>
                      </label>{" "}
                      <input type="text" name="last_name" placeholder="e.g. Doe" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Country <span>*</span>
                      </label>{" "}
                      <select name="country" className="ttl-input " defaultValue="Select A Country">
                        <option disabled>Select A Country</option>
                        {COUNTRIES.map((country) => (
                          <option value={country} key={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Email Address <span>*</span>
                      </label>{" "}
                      <input type="email" name="email" placeholder="you@example.com" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Phone Number</label>{" "}
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="+1 (210) 000-0000"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Postal Code</label>{" "}
                      <input type="text" name="postal_code" placeholder="e.g. 78201" className="ttl-input" />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Tracking Code</label>{" "}
                      <input
                        type="text"
                        name="tracking_code"
                        placeholder="e.g. DEMO-1001"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Subject <span>*</span>
                      </label>{" "}
                      <input
                        type="text"
                        name="subject"
                        placeholder="How can we help?"
                        className="ttl-input "
                      />
                    </div>
                    <div className="col-12">
                      <label className="field-label">
                        Your Message <span>*</span>
                      </label>{" "}
                      <textarea
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        className="ttl-input "
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <button type="submit" className="btn-submit">
                        <i className="fas fa-paper-plane"></i> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div id="tab-quote" className={`form-tab-content${tab === "quote" ? " active" : ""}`}>
                <form onSubmit={handleContactSubmit}>
                  {" "}
                  <input type="hidden" name="subject" defaultValue="Quote Request" />{" "}
                  <div className="form-section-head">
                    <i className="fas fa-user-tie me-2"></i>
                    Your Details
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="field-label">
                        First Name <span>*</span>
                      </label>{" "}
                      <input type="text" name="first_name" placeholder="e.g. John" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Last Name <span>*</span>
                      </label>{" "}
                      <input type="text" name="last_name" placeholder="e.g. Doe" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Email Address <span>*</span>
                      </label>{" "}
                      <input type="email" name="email" placeholder="you@example.com" className="ttl-input " />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Phone Number</label>{" "}
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="+1 (210) 000-0000"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Company / Organisation</label>{" "}
                      <input
                        type="text"
                        name="company"
                        placeholder="Your company name"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Country <span>*</span>
                      </label>{" "}
                      <select name="country" className="ttl-input " defaultValue="Select A Country">
                        <option disabled>Select A Country</option>
                        {COUNTRIES.map((country) => (
                          <option value={country} key={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-section-head">
                    <i className="fas fa-boxes-stacked me-2"></i>
                    Shipment Details
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="field-label">
                        Service Type <span>*</span>
                      </label>{" "}
                      <select name="service_type" className="ttl-input" defaultValue="Select Service">
                        <option disabled>Select Service</option>
                        <option>Sea Freight – FCL</option>
                        <option>Sea Freight – LCL</option>
                        <option>Air Freight – Express</option>
                        <option>Air Freight – Standard</option>
                        <option>Road Freight – FTL</option>
                        <option>Road Freight – LTL</option>
                        <option>Warehousing &amp; Storage</option>
                        <option>Customs Clearance Only</option>
                        <option>Supply Chain Management</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">Cargo Type</label>{" "}
                      <select name="cargo_type" className="ttl-input" defaultValue="Select Cargo Type">
                        <option disabled>Select Cargo Type</option>
                        <option>General Cargo</option>
                        <option>Perishables / Refrigerated</option>
                        <option>Hazardous / Dangerous Goods</option>
                        <option>Heavy Machinery / OOG</option>
                        <option>Pharmaceuticals</option>
                        <option>Electronics</option>
                        <option>Vehicles / Automotive</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Origin City / Port <span>*</span>
                      </label>{" "}
                      <input
                        type="text"
                        name="origin"
                        placeholder="e.g. San Antonio, TX / Houston Port"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="field-label">
                        Destination City / Port <span>*</span>
                      </label>{" "}
                      <input
                        type="text"
                        name="destination"
                        placeholder="e.g. Douala, Cameroon"
                        className="ttl-input"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="field-label">Est. Weight (kg)</label>{" "}
                      <input type="text" name="weight" placeholder="e.g. 500 kg" className="ttl-input" />
                    </div>
                    <div className="col-md-4">
                      <label className="field-label">Est. Volume (CBM)</label>{" "}
                      <input type="text" name="volume" placeholder="e.g. 2.5 CBM" className="ttl-input" />
                    </div>
                    <div className="col-md-4">
                      <label className="field-label">Ready-to-Ship Date</label>{" "}
                      <input type="date" name="ship_date" className="ttl-input" />
                    </div>
                    <div className="col-12">
                      <label className="field-label">Additional Details / Special Requirements</label>{" "}
                      <textarea
                        name="message"
                        placeholder="Describe your cargo, any special handling needs, or questions for our team..."
                        className="ttl-input "
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <button type="submit" className="btn-submit btn-submit-orange">
                        <i className="fas fa-file-invoice-dollar"></i> Request My Quote
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4 reveal">
            <div className="location-panel">
              <div className="location-panel__info">
                <div className="location-panel__title">Global Tropical Cargos</div>
                <div className="loc-row">
                  <i className="fas fa-location-dot"></i>
                  <div className="loc-row__text">
                    <strong>Headquarters</strong> Arizona, USA
                  </div>
                </div>
                <div className="loc-row">
                  <i className="fas fa-phone"></i>
                  <div className="loc-row__text">
                    <strong>Phone</strong> (555) 010-0100
                  </div>
                </div>
                <div className="loc-row">
                  <i className="fas fa-envelope"></i>
                  <div className="loc-row__text">
                    <strong>Email</strong> demo@example.com
                  </div>
                </div>
                <div className="loc-row">
                  <i className="fas fa-clock"></i>
                  <div className="loc-row__text">
                    <strong>Business Hours</strong> Mon – Fri: 8:00 AM – 6:00 PM CST
                    <br /> Sat: 9:00 AM – 1:00 PM CST
                  </div>
                </div>
                <div className="loc-row">
                  <i className="fas fa-globe"></i>
                  <div className="loc-row__text">
                    <strong>Coverage</strong> 50+ countries across Africa, Americas &amp; Europe
                  </div>
                </div>
                <div className="social-row">
                  <a href="#" className="social-btn" title="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>{" "}
                  <a href="#" className="social-btn" title="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>{" "}
                  <a href="#" className="social-btn" title="Twitter/X">
                    <i className="fab fa-x-twitter"></i>
                  </a>{" "}
                  <a href="#" className="social-btn" title="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                  </a>{" "}
                  <a href="#" className="social-btn" title="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
