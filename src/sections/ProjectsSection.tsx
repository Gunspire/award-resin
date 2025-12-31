import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { cn } from "../lib/cn";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Our Work" center>
          Recent Projects
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              img: "/hero-2.png",
              title: "Resin Driveway Transformation",
              loc: "Southampton",
              date: "Aug 2025",
              duration: "2 days",
              highlights: ["Premium aggregate", "UV stable resin", "15-year guarantee"],
              alt: "Completed resin driveway installation in Southampton",
            },
            {
              img: "/hero-1.png",
              title: "Garden Patio & Pathway",
              loc: "Winchester",
              date: "Jul 2025",
              duration: "3 days",
              highlights: ["Seamless finish", "Natural stone blend", "Full drainage"],
              alt: "Completed resin patio installation in Winchester",
            },
            {
              img: "/hero-bg.png",
              title: "Pool Surround Installation",
              loc: "Eastleigh",
              date: "Sep 2025",
              duration: "2 days",
              highlights: ["Slip-resistant", "Fast curing", "Premium finish"],
              alt: "Resin pool surround installation in Eastleigh",
            },
          ].map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] ring-1 ring-slate-200 bg-slate-100"
            >
              <img
                src={project.img}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold leading-snug">{project.title}</h4>
                <p className="text-blue-200 font-semibold flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {project.loc}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-300" />
                    <span className="font-medium">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="font-medium">{project.duration}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className={cn(
                        "inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur"
                      )}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">View Full Portfolio</Button>
        </div>
      </div>
    </section>
  );
}
