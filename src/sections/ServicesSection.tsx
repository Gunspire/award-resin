import React from "react";

import { ServiceCard } from "../components/ServiceCard";
import { SectionHeading } from "../components/SectionHeading";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="Our Expertise" center>
        Premium Resin Bound Surfacing
      </SectionHeading>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          title="Resin Driveways"
          description="Transform your driveway with stunning resin bound surfacing. Durable, permeable, and available in a wide range of colours and aggregates."
          imageSrc="/service-new-roof.png"
          imageAlt="Beautiful resin bound driveway installation"
        />
        <ServiceCard
          title="Resin Patios"
          description="Create a stunning outdoor living space with our premium resin patio solutions. Low maintenance and slip-resistant for year-round enjoyment."
          imageSrc="/service-repairs.png"
          imageAlt="Elegant resin patio area with outdoor furniture"
        />
        <ServiceCard
          title="Pathways & Walkways"
          description="Seamless, weed-free pathways that complement your garden. Our resin bound paths are smooth, durable, and wheelchair accessible."
          imageSrc="/service-flat-roof.png"
          imageAlt="Curved resin pathway through a garden"
        />
        <ServiceCard
          title="Pool Surrounds"
          description="Safe, slip-resistant surfaces for pool areas. Our resin bound finishes are perfect for wet environments and look stunning."
          imageSrc="/service-chimney.png"
          imageAlt="Resin bound pool surround with loungers"
        />
        <ServiceCard
          title="Tree Pits & Planters"
          description="Porous resin surfaces that allow water to reach tree roots while preventing weeds. Perfect for commercial and residential landscaping."
          imageSrc="/service-emergency.png"
          imageAlt="Resin bound tree pit in urban setting"
        />
        <ServiceCard
          title="Commercial Surfacing"
          description="Large-scale resin installations for car parks, public spaces, and commercial properties. Durable solutions built to last."
          imageSrc="/service-fascias.png"
          imageAlt="Commercial resin bound car park"
        />
      </div>
    </section>
  );
}
