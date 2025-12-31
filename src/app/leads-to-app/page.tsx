import type { Metadata } from "next";
import React from "react";

import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { LeadsToAppSection } from "../../sections/LeadsToAppSection";

export const metadata: Metadata = {
  title: "Leads to App | Award Resin Ltd",
  description: "Demo: website form submissions delivered instantly to your phone via our agency app.",
};

export default function LeadsToAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        <LeadsToAppSection />
      </main>
      <Footer />
    </div>
  );
}


