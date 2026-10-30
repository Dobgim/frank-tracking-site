const TIMEOUT_MS = 20000;

let loading;

// Loads the Google Maps script once. Rejects if the key is missing or refused.
export function loadGoogleMaps() {
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const key =
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
      "AIzaSyBpxYpVUtQlXjQgBCJNDvLkADlgTQ9IbLs";
    if (!key) {
      reject(new Error("The Google Maps API key is not set."));
      return;
    }
    const timer = setTimeout(() => reject(new Error("Google Maps took too long to load. Please refresh.")), TIMEOUT_MS);
    window.gm_authFailure = () => reject(new Error("Google Maps refused this API key."));
    window.initGoogleMaps = () => {
      clearTimeout(timer);
      resolve(window.google.maps);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=initGoogleMaps&loading=async`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps could not be loaded."));
    document.head.appendChild(script);
  });

  return loading;
}
