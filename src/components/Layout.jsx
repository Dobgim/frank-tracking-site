import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toaster from "./Toaster";
import { META } from "../data/meta";
import { activatePageStyle } from "../lib/pageStyles";
import { observeReveals } from "../lib/reveal";

function setMeta(name, content) {
  document.querySelector(`meta[name="${name}"]`)?.setAttribute("content", content);
}

export default function Layout() {
  const { pathname } = useLocation();

  // Runs before paint so a new route never shows with the old route's styles.
  useLayoutEffect(() => {
    activatePageStyle(pathname);
    window.scrollTo({ top: 0, behavior: "instant" });

    const meta = META[pathname];
    if (meta) {
      document.title = meta.title;
      setMeta("keywords", meta.keywords);
      setMeta("description", meta.description);
    }
  }, [pathname]);

  useEffect(() => observeReveals(pathname), [pathname]);

  // Header and footer are keyed by route so each navigation starts them fresh,
  // like the full page loads on the original site (mobile menu closed, footer
  // reveal animation replayed).
  return (
    <>
      <div className="demo-banner" role="note">
        Global Tropical Cargos · Global Cargo &amp; Freight Portal · Real-time Tracking &amp; Fleet Operations
      </div>
      <Header key={`header-${pathname}`} />
      <Outlet />
      <Footer key={`footer-${pathname}`} />
      <Toaster />
    </>
  );
}
