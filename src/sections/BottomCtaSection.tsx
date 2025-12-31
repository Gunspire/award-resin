"use client";

import React from "react";
import { CheckCircle2, Mail, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";

import { Button } from "../components/Button";

export function BottomCtaSection() {
  const [footerFormStatus, setFooterFormStatus] = React.useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleFooterQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFooterFormStatus("submitting");
    window.setTimeout(() => {
      setFooterFormStatus("success");
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0">
        <img src="/hero-1.png" alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-blue-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/60 to-blue-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 text-white">
            <p className="text-blue-200 font-semibold tracking-wider text-sm uppercase mb-3">Get in touch</p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Get a Free Quote — Fast Response, No Obligation
            </h2>
            <p className="text-blue-100/90 mt-4 text-lg leading-relaxed">
              Tell us what you need and we'll come back with a clear, itemised quote. Transform your
              outdoor space with stunning resin bound surfacing.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <a
                href="tel:08000726609"
                className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-5 py-4 hover:bg-white/15 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-tight">Call now</p>
                    <p className="text-blue-100/90 text-sm mt-1">0800 072 6609</p>
                    <p className="text-blue-200 text-xs mt-1">Free quotes & consultations</p>
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/448000726609?text=Hi%20Award%20Resin%20%E2%80%94%20I%27d%20like%20a%20free%20quote%20please."
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-5 py-4 hover:bg-white/15 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-tight">WhatsApp</p>
                    <p className="text-blue-100/90 text-sm mt-1">Quick photos & a rough estimate</p>
                    <p className="text-blue-200 text-xs mt-1">Typical reply within 1–2 hours</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:awardresinltd@gmail.com"
                className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-5 py-4 hover:bg-white/15 transition sm:col-span-2"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-tight">Email</p>
                    <p className="text-blue-100/90 text-sm mt-1">awardresinltd@gmail.com</p>
                    <p className="text-blue-200 text-xs mt-1">
                      Mon–Fri 8am–6pm • Quick response guaranteed
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-blue-100/90">
              <ShieldCheck className="w-5 h-5 text-blue-200" />
              <span className="text-sm">Fully insured • Written warranties • Clear, upfront pricing</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-white/90 backdrop-blur shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                {footerFormStatus === "success" ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-slate-900">Request sent</h3>
                    <p className="mt-2 text-slate-600">
                      Thanks — we’ll be in touch shortly to confirm details and arrange a visit.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setFooterFormStatus("idle")}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Request a free quote</h3>
                        <p className="text-slate-600 mt-1">We’ll confirm availability for your postcode.</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        <Send className="w-4 h-4" />
                        2‑minute form
                      </div>
                    </div>

                    <form onSubmit={handleFooterQuoteSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            placeholder="Full name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Postcode</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            placeholder="e.g., SW1A 1AA"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Phone</label>
                          <input
                            type="tel"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            placeholder="e.g., 07700 900000"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Email (optional)</label>
                          <input
                            type="email"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            placeholder="you@example.co.uk"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Service</label>
                          <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                            <option>Resin Driveway</option>
                            <option>Resin Patio</option>
                            <option>Pathway / Walkway</option>
                            <option>Pool Surround</option>
                            <option>Tree Pit / Planter</option>
                            <option>Commercial Surfacing</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-slate-700">Urgency</label>
                          <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                            <option>As soon as possible</option>
                            <option>Within 7 days</option>
                            <option>Within 30 days</option>
                            <option>Just looking for a quote</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Details</label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white resize-none"
                          placeholder="Briefly describe the issue, and when it started. If it’s urgent, include the best time to call."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                        <p className="text-xs text-slate-500">
                          By submitting, you agree we may contact you about your enquiry. We never sell
                          your data.
                        </p>
                        <Button type="submit" disabled={footerFormStatus === "submitting"}>
                          {footerFormStatus === "submitting" ? "Sending..." : "Send request"}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
