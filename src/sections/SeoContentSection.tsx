"use client";

import React from "react";
import { FileText, MapPin, Search, Sparkles } from "lucide-react";

import { SectionHeading } from "../components/SectionHeading";
import { UpsidesBox } from "../components/UpsidesBox";

export function SeoContentSection() {
  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Feature">SEO + on‑page content that ranks</SectionHeading>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-slate-600 text-lg leading-relaxed">
              We write and structure the text on every page so Google understands exactly what you do,
              where you do it, and who it’s for — which helps you rank higher for local searches.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-extrabold tracking-wider text-slate-500 uppercase">
                What we do (in plain English)
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-0.5">
                    <Search className="w-5 h-5 text-blue-700" />
                  </span>
                  <span>
                    <span className="font-extrabold text-slate-900">Target the right searches:</span>{" "}
                    &quot;resin driveways in {`{area}`}&quot;, &quot;resin patio {`{town}`}&quot;, etc.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </span>
                  <span>
                    <span className="font-extrabold text-slate-900">Write service pages that convert:</span>{" "}
                    clear headings, FAQs, proof, and local relevance (not keyword spam).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">
                    <MapPin className="w-5 h-5 text-blue-700" />
                  </span>
                  <span>
                    <span className="font-extrabold text-slate-900">Explain locations properly:</span>{" "}
                    towns/areas covered and what jobs you do there, so Google can match you to local intent.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">
                    <Sparkles className="w-5 h-5 text-blue-700" />
                  </span>
                  <span>
                    <span className="font-extrabold text-slate-900">Keep it fresh:</span> we can add new
                    copy for new services, seasonal pages, and new locations.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
              <p className="text-sm font-extrabold text-slate-900">Example: how Google “reads” your site</p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                When your pages are structured clearly, Google can associate your business with specific
                services + locations. That’s what helps you show up for the searches that actually make
                you money.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    t: "Service intent",
                    d: "'Resin driveway installation', 'resin patio', 'resin bound surfacing'…",
                  },
                  {
                    t: "Local intent",
                    d: "Hampshire, Southampton, Winchester, Portsmouth — and the specific towns you want to win.",
                  },
                  {
                    t: "Proof intent",
                    d: "Before/after, reviews, warranties, and clear process build trust signals.",
                  },
                  {
                    t: "Clarity",
                    d: "Proper headings + FAQs make content scannable for humans and search engines.",
                  },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-sm font-extrabold text-slate-900">{c.t}</div>
                    <div className="mt-2 text-sm text-slate-600">{c.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <UpsidesBox className="bg-slate-50">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      {
                        t: "Higher local rankings",
                        d: "Google understands your services + areas, so you appear for more local searches.",
                      },
                      {
                        t: "More inbound leads",
                        d: "Better pages + better visibility = more calls and quote requests.",
                      },
                      {
                        t: "Less wasted traffic",
                        d: "You attract people searching for the exact job you want — not random clicks.",
                      },
                    ].map((c) => (
                      <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-sm font-extrabold text-slate-900">{c.t}</div>
                        <div className="mt-1 text-sm text-slate-600">{c.d}</div>
                      </div>
                    ))}
                  </div>
                </UpsidesBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


