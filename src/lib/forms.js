import { useNavigate } from "react-router-dom";
import { showToast } from "./toast";

export function useTrackSubmit() {
  const navigate = useNavigate();

  return (event) => {
    event.preventDefault();
    const code = new FormData(event.currentTarget).get("track")?.trim().toUpperCase();
    if (!code) {
      showToast("error", "Please enter your tracking number.");
      return;
    }
    navigate(`/track-and-trace?code=${encodeURIComponent(code)}`);
  };
}

export async function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!response.ok) throw new Error();
    form.reset();
    showToast("success", "Your message has been sent.");
  } catch {
    showToast("error", "Your message could not be sent. Please try again.");
  }
}
