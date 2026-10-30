import { Link } from "react-router-dom";

export default function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-4 reveal">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Frequently Asked <span className="underline-accent text-green">Questions</span>
            </h2>
            <p className="mt-4" style={{ color: "var(--gray)", lineHeight: "1.75", fontSize: ".9rem" }}>
              Can't find your answer here? Our team is ready to help any time.
            </p>
            <Link className="btn-primary-ttl mt-4" to="/contact">
              {" "}
              <i className="bi bi-chat-dots"></i> Ask Us Anything{" "}
            </Link>
          </div>
          <div className="col-lg-8 reveal delay-2">
            <div className="accordion faq-accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    How do I get a freight quote?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Simply visit our Contact page and fill in the quote request form with your shipment
                    details — origin, destination, cargo type and weight. Our team will respond with a
                    competitive quote within 2–4 business hours.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    What documents are needed for international shipping?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Typically you will need a Commercial Invoice, Packing List, Bill of Lading (or Airway
                    Bill), and Certificate of Origin. Some goods and destinations require additional permits
                    or licences. Our customs team will guide you through every requirement.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    How can I track my shipment?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Once your shipment is booked, you will receive a unique TTL tracking number. Enter it on
                    our{" "}
                    <Link style={{ color: "var(--green)", fontWeight: "600" }} to="/track-and-trace">
                      Track &amp; Trace
                    </Link>{" "}
                    page to see live status, location updates and milestone alerts via SMS or email.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                  >
                    Is my cargo insured during transit?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes. We offer comprehensive cargo insurance covering loss, damage and theft throughout
                    transit. Cargo insurance can be added at booking stage and our team will advise on
                    coverage options based on the nature and value of your goods.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq5"
                  >
                    Do you handle dangerous goods (DG) shipments?
                  </button>
                </h2>
                <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes. We are certified to handle and transport a wide range of dangerous goods by air
                    (IATA), sea (IMDG) and road (ADR). Please declare all DG items at booking so we can
                    arrange compliant packaging, labelling and documentation.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq6"
                  >
                    What payment methods do you accept?
                  </button>
                </h2>
                <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    We accept bank transfer (SWIFT/SEPA), mobile money, credit/debit cards and Letter of
                    Credit (LC) for large enterprise shipments. Payment terms vary by service tier and are
                    confirmed with your quotation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
