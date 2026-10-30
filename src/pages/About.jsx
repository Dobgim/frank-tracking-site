import { useEffect } from "react";
import AOS from "aos";
import Hero from "../sections/about/Hero";
import Story from "../sections/about/Story";
import Mission from "../sections/about/Mission";
import Values from "../sections/about/Values";
import Team from "../sections/about/Team";
import Timeline from "../sections/about/Timeline";
import Certifications from "../sections/about/Certifications";
import CtaBand from "../sections/about/CtaBand";

export default function About() {
  useEffect(() => {
    AOS.init({ once: true, offset: 60, easing: "ease-out-cubic" });
    document.body.classList.add("page-fade");
    return () => document.body.classList.remove("page-fade");
  }, []);

  return (
    <>
      <Hero />
      <Story />
      <Mission />
      <Values />
      <Team />
      <Timeline />
      <Certifications />
      <CtaBand />
    </>
  );
}
