"use client";

import React from "react";
import { BadgeCheck, CheckCircle2, Star } from "lucide-react";

import { Button } from "../components/Button";
import { cn } from "../lib/cn";

export function HeroSection() {
  const heroImages = ["/hero-1.png", "/hero-2.png"];
  const [heroImageIndex, setHeroImageIndex] = React.useState(0);

  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">(
    "idle"
  );

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [heroImages.length]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    window.setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              idx === heroImageIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/50 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <BadgeCheck className="w-4 h-4 text-blue-400" />
              <span className="text-blue-100 text-sm font-medium">Top Rated Resin Specialists</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Premium resin driveways in <span className="text-blue-500">Hampshire</span>. Fast quotes, stunning finishes,
              guaranteed work.
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              From driveways to patios and pathways, we deliver premium resin bound surfacing
              across Hampshire and the South. 15-year warranty on all installations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" as="a" href="#contact">
                Get a Free Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
                as="a"
                href="#projects"
              >
                View Our Work
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col max-w-[200px]">
                <p className="text-slate-200 italic text-sm mb-2">
                  {"Best resin driveway company I've used. Quick, clean and professional."}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    J
                  </div>
                  <span className="text-slate-400 text-xs font-bold">James D.</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-slate-300 text-sm">4.9/5 from 120+ reviews</span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-4 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform hover:scale-[1.01] transition-transform duration-300"
            id="contact"
          >
            {formStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Quote Requested!</h3>
                <p className="text-slate-600">
                  {"We'll be in touch within 24 hours to discuss your resin surfacing needs."}
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setFormStatus("idle")}
                >
                  Request Another
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Get a Free Quote</h3>
                  <p className="text-slate-500 mt-1">Fast response. No obligation.</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Postcode</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="07700 900000"
                    />
                  </div>

<div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Service Needed</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                        <option>Resin Driveway</option>
                        <option>Resin Patio</option>
                        <option>Resin Pathway</option>
                        <option>Pool Surround</option>
                        <option>Tree Pit / Planter</option>
                        <option>Other Resin Surfacing</option>
                      </select>
                    </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Details</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                      placeholder="Briefly describe the issue..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full text-lg" disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? "Sending..." : "Request a Free Quote"}
                  </Button>

                  <p className="text-xs text-center text-slate-400 mt-4">
                    Your data is secure. We never share your details.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
