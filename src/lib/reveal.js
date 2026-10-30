const THRESHOLDS = { "/services": 0.1, "/contact": 0.1 };

// Adds .visible to .reveal elements as they scroll into view. Returns a cleanup.
export function observeReveals(pathname) {
  const stagger = pathname === "/contact" ? 100 : 0;
  const timers = [];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (stagger) {
          timers.push(setTimeout(() => entry.target.classList.add("visible"), i * stagger));
        } else {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: THRESHOLDS[pathname] ?? 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    timers.forEach(clearTimeout);
  };
}
