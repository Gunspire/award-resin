import React from "react";

import { Button } from "../components/Button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-12">
      <div className="absolute inset-0">
        <img src="/hero-2.png" alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-blue-950/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/60 to-blue-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a Resin Specialist You Can Trust?</h2>
        <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto">
          {"Transform your driveway or patio with stunning resin bound surfacing. Contact our expert team today for a free quote."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="white" size="md" as="a" href="#contact">
            Get a Free Quote
          </Button>
          <Button
            variant="outline"
            size="md"
            className="border-white text-white hover:bg-white/10"
            as="a"
            href="tel:08000726609"
          >
            Call 0800 072 6609
          </Button>
        </div>
      </div>
    </section>
  );
}
