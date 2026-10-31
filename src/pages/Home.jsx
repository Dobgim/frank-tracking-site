import Hero from "../sections/home/Hero";
import StatsRibbon from "../sections/home/StatsRibbon";
import Services from "../sections/home/Services";
import WhyUs from "../sections/home/WhyUs";
import HowItWorks from "../sections/home/HowItWorks";
import Coverage from "../sections/home/Coverage";
import Testimonials from "../sections/home/Testimonials";
import Trust from "../sections/home/Trust";
import PartnersMarquee from "../sections/home/PartnersMarquee";
import Marquee from "../sections/home/Marquee";
import LocationStrip from "../sections/home/LocationStrip";
import CtaBanner from "../sections/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsRibbon />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Coverage />
      <Testimonials />
      <Trust />
      <PartnersMarquee />
      <Marquee />
      <LocationStrip />
      <CtaBanner />
    </>
  );
}
