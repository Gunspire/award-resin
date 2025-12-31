"use client";

import React from "react";
import { Check, Copy, MessageSquareText, TrendingUp } from "lucide-react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { UpsidesBox } from "../components/UpsidesBox";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function buildSms(opts: {
  businessName: string;
  callbackNumber: string;
  timeframe: string;
  includeQuoteLink: boolean;
}) {
  const parts: string[] = [];
  parts.push(`Hi — sorry we missed your call. This is ${opts.businessName}.`);
  parts.push(`Call us back on ${opts.callbackNumber} or reply to this text and we’ll help.`);
  parts.push(`We typically respond within ${opts.timeframe}.`);
  if (opts.includeQuoteLink) parts.push(`Get a quick quote: /quote`);
  return parts.join(" ");
}

export function MissedCallTextBackSection() {
  const [businessName, setBusinessName] = React.useState("Award Resin Ltd");
  const [callbackNumber, setCallbackNumber] = React.useState("0800 072 6609");
  const [timeframe, setTimeframe] = React.useState("30 minutes");
  const [includeQuoteLink, setIncludeQuoteLink] = React.useState(true);

  const [copied, setCopied] = React.useState(false);

  // Demo assumptions (editable) for conversion framing.
  const [missedCallsPerMonth, setMissedCallsPerMonth] = React.useState(25);
  const [smsReplyRatePct, setSmsReplyRatePct] = React.useState(35);
  const [bookRateFromRepliesPct, setBookRateFromRepliesPct] = React.useState(25);

  const sms = React.useMemo(
    () => buildSms({ businessName, callbackNumber, timeframe, includeQuoteLink }),
    [businessName, callbackNumber, timeframe, includeQuoteLink]
  );

  const roi = React.useMemo(() => {
    const missedCallsM = clamp(Number(missedCallsPerMonth) || 0, 0, 2000);
    const replyPct = clamp(Number(smsReplyRatePct) || 0, 0, 100) / 100;
    const bookPct = clamp(Number(bookRateFromRepliesPct) || 0, 0, 100) / 100;

    const repliesPerMonth = missedCallsM * replyPct;
    const bookedJobsPerMonth = repliesPerMonth * bookPct;

    return {
      missedCallsPerMonth: Math.round(missedCallsM),
      repliesPerMonth: Math.round(repliesPerMonth),
      bookedJobsPerMonth: Math.round(bookedJobsPerMonth),
    };
  }, [missedCallsPerMonth, smsReplyRatePct, bookRateFromRepliesPct]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sms);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Feature">Missed call text‑back</SectionHeading>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-slate-600 text-lg leading-relaxed">
              If a customer calls and you miss it, they automatically get a friendly SMS so you don’t
              lose the lead.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-extrabold tracking-wider text-slate-500 uppercase">
                Customize your message
              </p>

              <div className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Business name</label>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Callback number</label>
                  <input
                    value={callbackNumber}
                    onChange={(e) => setCallbackNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Response time</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  >
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Same day</option>
                  </select>
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeQuoteLink}
                    onChange={() => setIncludeQuoteLink((v) => !v)}
                    className="mt-1 accent-blue-600"
                  />
                  <span>
                    <span className="block text-sm font-bold text-slate-900">Include quote link</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">
                      Adds “Get a quick quote: /quote”
                    </span>
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={copy} className="gap-2">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy SMS"}
                  </Button>
                  <Button variant="outline" as="a" href="/quote">
                    Open Quote Builder
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center">
                  <MessageSquareText className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">SMS preview</p>
                  <p className="text-xs font-semibold text-slate-500">
                    What the customer receives after a missed call
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6">
                <div className="text-xs font-semibold text-slate-500">From: {businessName}</div>
                <div className="mt-3 text-slate-900 font-semibold leading-relaxed whitespace-pre-wrap">
                  {sms}
                </div>
              </div>

              <div className="mt-6">
                <UpsidesBox className="bg-slate-50">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">By the numbers</p>
                        <p className="text-xs font-semibold text-slate-500">
                          Estimate how missed calls convert into replies and booked jobs.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid sm:grid-cols-3 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                          Missed calls / month
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                          {roi.missedCallsPerMonth}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                          Replies / month
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                          {roi.repliesPerMonth}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                          Booked jobs / month
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                          {roi.bookedJobsPerMonth}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 block min-h-[40px]">
                          Missed calls per month
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={2000}
                          value={missedCallsPerMonth}
                          onChange={(e) => setMissedCallsPerMonth(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 block min-h-[40px]">
                          SMS reply rate (%)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={smsReplyRatePct}
                          onChange={(e) => setSmsReplyRatePct(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 block min-h-[40px]">
                          Booking rate from replies (%)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={bookRateFromRepliesPct}
                          onChange={(e) => setBookRateFromRepliesPct(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-3 gap-4">
                    {[
                      { t: "Instant follow-up", d: "Customers get a reply even when you're on a job." },
                      { t: "More booked jobs", d: "Less missed leads, more conversions." },
                      { t: "Faster response", d: "Sets expectations and prompts a reply." },
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


