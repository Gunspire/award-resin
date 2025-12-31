import type { Metadata } from "next";
import React from "react";

import { ReviewGate } from "../../components/ReviewGate";
import { UpsidesBox } from "../../components/UpsidesBox";
import { Footer } from "../../sections/Footer";
import { Header } from "../../sections/Header";

export const metadata: Metadata = {
  title: "Leave a Review | Award Resin Ltd",
  description:
    "Quick review page for Award Resin Ltd. Select a star rating and, if you're happy, you'll be sent to Google to leave a public review.",
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="py-14 sm:py-20">
        <ReviewGate />

        <section className="mt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <UpsidesBox className="bg-slate-50">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    t: "Higher on Google",
                    d: "More recent 5★ reviews help you show up more in local search and Maps.",
                  },
                  {
                    t: "More trust",
                    d: "Reviews reduce hesitation and make it easier to choose you over competitors.",
                  },
                  {
                    t: "More calls & enquiries",
                    d: "Stronger social proof increases conversions from people already searching.",
                  },
                  {
                    t: "Stand out locally",
                    d: "A high rating makes your listing look premium at a glance.",
                  },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm font-extrabold text-slate-900">{c.t}</div>
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</div>
                  </div>
                ))}
              </div>
            </UpsidesBox>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


