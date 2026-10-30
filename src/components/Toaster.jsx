import { useSyncExternalStore } from "react";
import { dismissToast, getToasts, subscribeToasts } from "../lib/toast";

// Uses the toastr classes from the original site's stylesheet.
export default function Toaster() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts);

  return (
    <div id="toast-container" className="toast-top-right" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`} style={{ display: "block", opacity: 1 }}>
          <button
            type="button"
            className="toast-close-button"
            aria-label="Close"
            onClick={() => dismissToast(toast.id)}
          >
            ×
          </button>
          <div className="toast-message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
