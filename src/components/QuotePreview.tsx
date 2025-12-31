"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./Button";
import { Logo } from "./Logo";

type LineItem = { label: string; qty?: string; amountPence: number };

type QuotePreviewPayload = {
  quoteNumber: string;
  createdAt: string;
  customer: { name: string; postcode: string; email: string; phone: string };
  job: { roofTypeLabel: string; serviceLabel: string; areaSqm: number };
  items: LineItem[];
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  notes: string;
};

const STORAGE_KEY = "award_resin_quote_preview_v1";

export function QuotePreview() {
  const router = useRouter();
  const [quote, setQuote] = React.useState<QuotePreviewPayload | null>(null);

  React.useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as QuotePreviewPayload;
      if (!parsed?.quoteNumber) return;
      setQuote(parsed);
    } catch {
      // ignore
    }
  }, []);

  if (!quote) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8">
          <h1 className="text-2xl font-extrabold text-slate-900">No quote to preview</h1>
          <p className="text-slate-600 mt-2">
            Generate a quote from the homepage invoice tool first.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.push("/")}>Back to homepage</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="print:hidden sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-700 font-semibold hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-7 sm:px-10 py-8 border-b border-slate-200 flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo className="h-[66px] sm:h-[72px]" />
              <div>
                <div className="text-lg font-extrabold tracking-tight text-slate-900">
                  Award Resin Ltd
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Quote preview (demo) • Created {quote.createdAt}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-700">Quote</div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                {quote.quoteNumber}
              </div>
            </div>
          </div>

          <div className="px-7 sm:px-10 py-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                  Customer
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">
                  {quote.customer.name || "—"}
                </div>
                <div className="text-sm text-slate-600 mt-1">{quote.customer.postcode || "—"}</div>
                <div className="text-sm text-slate-600 mt-1">
                  {quote.customer.phone || "—"} • {quote.customer.email || "—"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                  Job details
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">{quote.job.serviceLabel}</div>
                <div className="text-sm text-slate-600 mt-1">
                  {quote.job.roofTypeLabel} • {quote.job.areaSqm} m²
                </div>
                <div className="text-sm text-slate-600 mt-1">Subject to survey and access</div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3 font-extrabold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((it, idx) => (
                    <tr key={`${it.label}-${idx}`} className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{it.label}</div>
                        {it.qty ? (
                          <div className="text-xs font-semibold text-slate-500 mt-0.5">{it.qty}</div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <div className="text-sm font-extrabold text-slate-900">No prices shown</div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                This is a demo quote summary. Final pricing is confirmed after a survey.
              </div>
            </div>

            {quote.notes.trim() ? (
              <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-white">
                <div className="text-sm font-extrabold text-slate-900">Notes</div>
                <div className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{quote.notes}</div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <span className="rounded-full border border-slate-200 px-3 py-1">Quote summary</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">No prices shown</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">
                Start date agreed after survey
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-extrabold text-slate-900">
                You’ve been notified of your quote summary.
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                Our team will contact you shortly to confirm details and arrange a survey if needed.
              </div>
            </div>

            <div className="print:hidden mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => window.print()} className="gap-2 w-full sm:w-auto">
                Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/quote")}
                className="w-full sm:w-auto"
              >
                Create another quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


