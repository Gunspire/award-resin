"use client";

import React from "react";
import { FileDown, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { UpsidesBox } from "../components/UpsidesBox";
import { cn } from "../lib/cn";

type SurfaceType = "driveway" | "patio" | "pathway" | "pool_surround" | "commercial";
type ServiceType =
  | "resin_bound"
  | "resin_bonded"
  | "overlay"
  | "full_preparation"
  | "repair"
  | "consultation";

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

const QUOTE_PREVIEW_STORAGE_KEY = "award_resin_quote_preview_v1";

const COMPANY = {
  name: "Award Resin Ltd",
  phoneDisplay: "0800 072 6609",
  phoneRaw: "08000726609",
  email: "awardresinltd@gmail.com",
};

/**
 * Pricing model
 * - Everything is in pence to avoid float issues.
 * - These are "instant estimate" numbers (not placeholders) you can tune quickly.
 */
const PRICING = {
  currency: "GBP",
  vatRate: 0.2,
  minTotalPence: 250_00,
  surfaceTypeMultiplier: {
    driveway: 1.0,
    patio: 0.95,
    pathway: 0.9,
    pool_surround: 1.1,
    commercial: 0.85,
  } satisfies Record<SurfaceType, number>,
  service: {
    resin_bound: { basePence: 450_00, perSqmPence: 75_00 },
    resin_bonded: { basePence: 350_00, perSqmPence: 55_00 },
    overlay: { basePence: 250_00, perSqmPence: 45_00 },
    full_preparation: { basePence: 550_00, perSqmPence: 85_00 },
    repair: { basePence: 180_00, perSqmPence: 35_00 },
    consultation: { basePence: 0, perSqmPence: 0 },
  } satisfies Record<ServiceType, { basePence: number; perSqmPence: number }>,
  addons: {
    edging: { label: "Aluminium edging", pence: 350_00 },
    skip: { label: "Waste removal / skip", pence: 240_00 },
    drainage: { label: "Drainage channel", pence: 420_00 },
    steps: { label: "Steps / levels", pence: 280_00 },
  },
} as const;

const SURFACE_TYPE_LABEL: Record<SurfaceType, string> = {
  driveway: "Driveway",
  patio: "Patio",
  pathway: "Pathway / walkway",
  pool_surround: "Pool surround",
  commercial: "Commercial area",
};

const SERVICE_LABEL: Record<ServiceType, string> = {
  resin_bound: "Resin bound surfacing",
  resin_bonded: "Resin bonded surfacing",
  overlay: "Overlay existing surface",
  full_preparation: "Full ground preparation",
  repair: "Repair / patch work",
  consultation: "Free consultation",
};

function formatGBPFromPence(pence: number) {
  const pounds = pence / 100;
  return pounds.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

function todayISO() {
  return new Date().toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function buildQuote(params: {
  surfaceType: SurfaceType;
  service: ServiceType;
  areaSqm: number;
  postcode: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  addons: Record<keyof typeof PRICING.addons, boolean>;
}) {
  const areaSqm = clampInt(params.areaSqm, 5, 500);
  const servicePricing = PRICING.service[params.service];
  const multiplier = PRICING.surfaceTypeMultiplier[params.surfaceType];

  const base = Math.round(servicePricing.basePence * multiplier);
  const variable = Math.round(servicePricing.perSqmPence * areaSqm * multiplier);

  const items: LineItem[] = [
    { label: `${SERVICE_LABEL[params.service]} — base`, amountPence: base },
  ];

  if (servicePricing.perSqmPence > 0) {
    items.push({
      label: `${SERVICE_LABEL[params.service]} — size`,
      qty: `${areaSqm} m²`,
      amountPence: variable,
    });
  }

  (Object.keys(PRICING.addons) as Array<keyof typeof PRICING.addons>).forEach((k) => {
    if (!params.addons[k]) return;
    items.push({
      label: PRICING.addons[k].label,
      amountPence: PRICING.addons[k].pence,
    });
  });

  const subtotal = items.reduce((sum, it) => sum + it.amountPence, 0);
  const minAdjustedSubtotal = Math.max(subtotal, PRICING.minTotalPence);
  const vat = Math.round(minAdjustedSubtotal * PRICING.vatRate);
  const total = minAdjustedSubtotal + vat;

  return {
    areaSqm,
    items,
    subtotal: minAdjustedSubtotal,
    vat,
    total,
    createdAt: todayISO(),
    surfaceTypeLabel: SURFACE_TYPE_LABEL[params.surfaceType],
    serviceLabel: SERVICE_LABEL[params.service],
  };
}

export function InvoiceQuoteSection() {
  const router = useRouter();
  const [surfaceType, setSurfaceType] = React.useState<SurfaceType>("driveway");
  const [service, setService] = React.useState<ServiceType>("resin_bound");
  const [areaSqm, setAreaSqm] = React.useState<number>(40);
  const [addons, setAddons] = React.useState<Record<keyof typeof PRICING.addons, boolean>>({
    edging: true,
    skip: true,
    drainage: false,
    steps: false,
  });

  const [name, setName] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const quote = React.useMemo(
    () =>
      buildQuote({
        surfaceType,
        service,
        areaSqm,
        postcode,
        name,
        email,
        phone,
        notes,
        addons,
      }),
    [surfaceType, service, areaSqm, postcode, name, email, phone, notes, addons]
  );

  const demoStats = {
    timeSavedPerWeek: "1–2 hours",
    qualifiedLeads: "+20–30%",
    fasterDecisions: "Same-day follow-up",
  } as const;

  const quoteNumber = React.useMemo(() => {
    const seed = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const short = seed.replaceAll(".", "").slice(-6).toUpperCase();
    return `AR-${short}`;
  }, []);

  const toggleAddon = (k: keyof typeof PRICING.addons) =>
    setAddons((prev) => ({ ...prev, [k]: !prev[k] }));

  const canGenerate = postcode.trim().length >= 4;

  return (
    <section className="bg-slate-50 py-12 lg:py-16 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Quote Builder">Generate a quote summary PDF</SectionHeading>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 text-slate-600 mb-7">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-base font-semibold">
                No prices shown • Subject to survey and access
              </span>
            </div>

            {/* Job details */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">Job details</p>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700">Surface type</label>
                  <select
                    value={surfaceType}
                    onChange={(e) => setSurfaceType(e.target.value as SurfaceType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                  >
                    {(Object.keys(SURFACE_TYPE_LABEL) as SurfaceType[]).map((k) => (
                      <option key={k} value={k}>
                        {SURFACE_TYPE_LABEL[k]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700">Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                  >
                    {(Object.keys(SERVICE_LABEL) as ServiceType[]).map((k) => (
                      <option key={k} value={k}>
                        {SERVICE_LABEL[k]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700">
                    Size <span className="text-slate-500">(m²)</span>
                  </label>
                  <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="number"
                        min={5}
                        max={500}
                        value={areaSqm}
                        onChange={(e) => setAreaSqm(Number(e.target.value))}
                        className="w-28 text-slate-900 font-bold outline-none bg-transparent text-base"
                      />
                      <span className="text-xs font-semibold text-slate-500">5–500</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={500}
                      value={areaSqm}
                      onChange={(e) => setAreaSqm(Number(e.target.value))}
                      className="mt-2 w-full accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other details */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">Other details</p>
              <div className="mt-4">
                <p className="text-base font-semibold text-slate-700 mb-3">Add-ons</p>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(PRICING.addons) as Array<keyof typeof PRICING.addons>).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => toggleAddon(k)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                        addons[k]
                          ? "border-blue-200 bg-blue-50 text-blue-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {PRICING.addons[k].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <label className="text-base font-semibold text-slate-700">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white resize-none text-base"
                  placeholder="Anything we should know (access, existing surface condition, etc.)"
                />
              </div>
            </div>

            {/* Customer details */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">Your details</p>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1.5 lg:col-span-2">
                  <label className="text-base font-semibold text-slate-700">Postcode</label>
                  <input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                    placeholder="e.g., SW1A 1AA"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                    placeholder="e.g., 07700 900000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                    placeholder="you@example.co.uk"
                  />
                </div>
                <div className="space-y-1.5 lg:col-span-2">
                  <label className="text-base font-semibold text-slate-700">Name (optional)</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-base"
                    placeholder="Full name"
                  />
                </div>
              </div>
            </div>

            {/* Action bar */}
            <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Summary</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900 leading-tight">
                    {quote.serviceLabel}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-600">
                    {quote.surfaceTypeLabel} • {quote.areaSqm} m²
                  </p>
                </div>

                <div className="w-full lg:w-auto">
                  <Button
                    disabled={!canGenerate}
                    onClick={() => {
                      const payload: QuotePreviewPayload = {
                        quoteNumber,
                        createdAt: quote.createdAt,
                        customer: { name, postcode, email, phone },
                        job: {
                          roofTypeLabel: quote.surfaceTypeLabel,
                          serviceLabel: quote.serviceLabel,
                          areaSqm: quote.areaSqm,
                        },
                        items: quote.items,
                        subtotalPence: quote.subtotal,
                        vatPence: quote.vat,
                        totalPence: quote.total,
                        notes,
                      };
                      window.sessionStorage.setItem(QUOTE_PREVIEW_STORAGE_KEY, JSON.stringify(payload));
                      router.push("/quote-preview");
                    }}
                    size="lg"
                    className="w-full lg:w-auto gap-2"
                  >
                    <FileDown className="w-4 h-4" />
                    Generate PDF quote
                  </Button>
                  {!canGenerate ? (
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Enter a postcode to generate the PDF.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="outline" as="a" href={`tel:${COMPANY.phoneRaw}`} className="w-full">
                  Call {COMPANY.phoneDisplay}
                </Button>
                <Button size="lg" variant="white" as="a" href={`mailto:${COMPANY.email}`} className="w-full">
                  Email {COMPANY.email}
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6">
              <UpsidesBox className="bg-slate-50">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      t: "More qualified leads",
                      d: "Customers self-select the service and give key details before you call them back.",
                    },
                    {
                      t: "Saves you time",
                      d: "Less back-and-forth — you start the conversation with the right context.",
                    },
                    {
                      t: "Faster decisions",
                      d: "A clean PDF summary builds trust and keeps the job moving to a survey/booking.",
                    },
                  ].map((c) => (
                    <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="text-sm font-extrabold text-slate-900">{c.t}</div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                      Time saved / week
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                      {demoStats.timeSavedPerWeek}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">
                      Fewer calls — customers use the tool instead
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                      Higher qualified leads
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                      {demoStats.qualifiedLeads}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">
                      More details captured up front
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                      Faster decisions
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                      {demoStats.fasterDecisions}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">
                      Clear PDF summary + quick follow-up
                    </div>
                  </div>
                </div>
              </UpsidesBox>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


