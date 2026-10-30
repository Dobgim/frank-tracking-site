import { useNavigate } from "react-router-dom";
import { showToast } from "./toast";
import { saveLocalMessage } from "./storageService";

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
  const payload = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error();
    form.reset();
    showToast("success", "Your message has been sent.");
  } catch {
    // Offline fallback — save to localStorage
    const saved = saveLocalMessage(payload);
    form.reset();
    if (saved) {
      showToast("success", "Message saved. It will be sent when the server is online.");
    } else {
      showToast("error", "Your message could not be sent. Please try again.");
    }
  }
}
