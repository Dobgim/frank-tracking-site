import { handleTrackSubmit } from "../../lib/forms";

export default function TrackForm() {
  return (
    <section className="container-fluid py-5 bg-light border-bottom border-1 td-print-none px-5 px-md-0">
      <h3 className="text-center display-5">Trace Your Package in RealTime</h3>
      <p className="text-center fs-6">
        Enter your tracking code below and click the "Track Now" button to find out exactly where your cargo
        is right now and when it will arrive at its final destination.
      </p>
      <div className="container mt-5 mb-5 w-100 w-lg-40 mx-auto">
        <form onSubmit={handleTrackSubmit}>
          {" "}
          <div className="input-group">
            <input
              className="form-control form-control-lg rounded-0"
              type="text"
              placeholder="Type Tracking Reference"
              name="track"
            />{" "}
            <button
              type="submit"
              aria-roledescription="Track Button"
              className="btn btn-secondary td-btn fs-4 rounded-0"
            >
              <i className="bi bi-geo-fill"></i> <span className="d-none d-md-inline"> Track Now</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
