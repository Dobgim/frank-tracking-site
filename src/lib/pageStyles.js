// Each original page shipped its own stylesheet and they reuse class names
// (.hero-title, .fade-up, ...), so only the current route's sheet may be active.
export function activatePageStyle(pathname) {
  document.querySelectorAll("link[data-page-style]").forEach((link) => {
    link.media = link.dataset.pageStyle.split(" ").includes(pathname) ? "all" : "not all";
  });
}
