import React from "react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";

export function ServiceAreaSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading subtitle="Service Area">Hampshire & Surrounding Areas</SectionHeading>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We're based in Eastleigh and typically cover{" "}
              <span className="font-semibold text-slate-900">up to ~50 miles</span> for resin driveways,
              patios, pathways, and all resin bound surfacing work.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Hampshire",
                  items: ["Eastleigh", "Southampton", "Winchester", "Portsmouth"],
                },
                {
                  title: "Surrounding Counties",
                  items: [
                    "Dorset",
                    "Wiltshire",
                    "West Sussex",
                    "Surrey",
                    "Berkshire",
                    "Isle of Wight",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <p className="font-bold text-slate-900">{block.title}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {block.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600/70" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button as="a" href="#contact">
                Check Availability
              </Button>
              <Button variant="outline" as="a" href="tel:08000726609">
                Call 0800 072 6609
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <div className="aspect-square relative">
                <iframe
                  title="Service area map (Eastleigh, Hampshire)"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Eastleigh,+Hampshire,+UK&z=9&output=embed"
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/80 bg-blue-500/10 shadow-[0_0_0_8px_rgba(37,99,235,0.10)]"
                  style={{ width: "72%", height: "72%" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
