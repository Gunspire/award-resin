import type { Metadata } from "next";
import React from "react";

import { QuotePreview } from "../../components/QuotePreview";

export const metadata: Metadata = {
  title: "Quote Preview | Award Resin Ltd",
  description: "Preview and print a quote PDF for Award Resin Ltd.",
};

export default function QuotePreviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <QuotePreview />
    </div>
  );
}


