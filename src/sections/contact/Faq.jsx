import { Link } from "react-router-dom";
import { useState } from "react";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="faq-section">
      <div className="container position-relative" style={{ zIndex: "2" }}>
        <div className="row g-5 align-items-start">
          <div className="col-lg-4 reveal">
            <div className="section-label">Quick Answers</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>
              Frequently <em>Asked</em> Questions
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.6)",
                fontSize: ".93rem",
                lineHeight: "1.7",
                marginTop: "14px",
              }}
            >
              Can't find your answer? Call us at{" "}
              <strong style={{ color: "var(--green)" }}>(559) 213-2902</strong> or use the contact form above.
            </p>
            <Link className="btn-submit mt-4" to="/track-and-trace">
              {" "}
              <i className="fas fa-satellite-dish"></i> Track My Shipment{" "}
            </Link>
          </div>
          <div className="col-lg-8 reveal">
            <div className={`faq-item${openFaq === 0 ? " open" : ""}`}>
              <div className="faq-q" onClick={() => setOpenFaq((open) => (open === 0 ? null : 0))}>
                How do I get a freight quote? <i className="fas fa-plus"></i>
              </div>
              <div className="faq-a">
                You can request a quote by clicking the "Request a Quote" tab in the form above, or by calling
                us directly at (559) 213-2902. Our team will get back to you with a competitive rate within 2
                business hours.
              </div>
            </div>
            <div className={`faq-item${openFaq === 1 ? " open" : ""}`}>
              <div className="faq-q" onClick={() => setOpenFaq((open) => (open === 1 ? null : 1))}>
                How can I track my shipment? <i className="fas fa-plus"></i>
              </div>
              <div className="faq-a">
                Visit our{" "}
                <Link style={{ color: "var(--green)" }} to="/track-and-trace">
                  Track &amp; Trace
                </Link>{" "}
                portal and enter your tracking code. You can also enter your tracking code in the contact form
                for immediate support from our team.
              </div>
            </div>
            <div className={`faq-item${openFaq === 2 ? " open" : ""}`}>
              <div className="faq-q" onClick={() => setOpenFaq((open) => (open === 2 ? null : 2))}>
                What documents are needed for customs clearance? <i className="fas fa-plus"></i>
              </div>
              <div className="faq-a">
                Typical documents include a commercial invoice, packing list, bill of lading or airway bill,
                certificate of origin, and any applicable permits. Our customs team will guide you through the
                specifics for your shipment route.
              </div>
            </div>
            <div className={`faq-item${openFaq === 3 ? " open" : ""}`}>
              <div className="faq-q" onClick={() => setOpenFaq((open) => (open === 3 ? null : 3))}>
                Do you offer cargo insurance? <i className="fas fa-plus"></i>
              </div>
              <div className="faq-a">
                Yes! We offer comprehensive marine and air cargo insurance for all shipments. Coverage options
                can be tailored to your cargo value and risk profile. Ask us about this when requesting your
                quote.
              </div>
            </div>
            <div className={`faq-item${openFaq === 4 ? " open" : ""}`}>
              <div className="faq-q" onClick={() => setOpenFaq((open) => (open === 4 ? null : 4))}>
                How long does sea freight from Arizona to West Africa take? <i className="fas fa-plus"></i>
              </div>
              <div className="faq-a">
                Transit times vary by destination port. From Arizona or Savannah to West African ports (e.g.
                Douala, Lagos), expect approximately 18–28 days. We'll provide an estimated schedule when
                confirming your booking.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
