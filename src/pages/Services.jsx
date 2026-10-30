import { useState } from "react";
import Hero from "../sections/services/Hero";
import ServiceFilter from "../sections/services/ServiceFilter";
import ServicesGrid from "../sections/services/ServicesGrid";
import FeaturedService from "../sections/services/FeaturedService";
import Process from "../sections/services/Process";
import Sectors from "../sections/services/Sectors";
import ValueStrip from "../sections/services/ValueStrip";
import Pricing from "../sections/services/Pricing";
import Faq from "../sections/services/Faq";
import CtaBottom from "../sections/services/CtaBottom";

export default function Services() {
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(false);

  const handleFilter = (next) => {
    setFilter(next);
    setFiltered(true);
  };

  return (
    <>
      <Hero />
      <ServiceFilter filter={filter} onFilter={handleFilter} />
      <ServicesGrid filter={filter} filtered={filtered} />
      <FeaturedService />
      <Process />
      <Sectors />
      <ValueStrip />
      <Pricing />
      <Faq />
      <CtaBottom />
    </>
  );
}
