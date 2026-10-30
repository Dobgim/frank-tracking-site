import { showToast } from "./toast";

const CONTACT_EMAIL = "info@globaltropicalcargo.com";

// There is no tracking backend yet: the original form posted to a PHP server.
// Connect the real lookup here.
export function handleTrackSubmit(event) {
  event.preventDefault();
  const reference = new FormData(event.currentTarget).get("track")?.trim();
  if (!reference) {
    showToast("error", "Please enter your tracking number.");
    return;
  }
  showToast("error", `Online tracking is not connected yet. Please contact us with reference ${reference}.`);
}

// Without a backend, enquiries open in the visitor's email app, ready to send.
export function handleContactSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = data.get("subject") || "Website enquiry";
  const body = [...data.entries()]
    .filter(([name, value]) => name !== "subject" && value)
    .map(([name, value]) => `${name.replace(/_/g, " ")}: ${value}`)
    .join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast("success", "Opening your email app to send this message.");
}
