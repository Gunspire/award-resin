"use client";

import React from "react";
import { Bell, PhoneIncoming } from "lucide-react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { UpsidesBox } from "../components/UpsidesBox";

type Lead = {
  name: string;
  phone: string;
  postcode: string;
  service: string;
  details: string;
  receivedAt: string;
};

function nowTime() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function initialLead(): Lead {
  return {
    name: "Jamie Taylor",
    phone: "07700 900000",
    postcode: "SW1A 1AA",
    service: "Resin Driveway",
    details: "Leak near chimney after heavy rain. Can you call after 5pm?",
    receivedAt: nowTime(),
  };
}

export function LeadsToAppSection() {
  const [lead, setLead] = React.useState<Lead>(initialLead());

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Feature">Forms go straight to your phone</SectionHeading>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">Agency app notification</p>
                <p className="text-xs font-semibold text-slate-500">
                  Website leads go straight to your phone (not your inbox)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-extrabold text-blue-700">
                    <Bell className="w-4 h-4" />
                    New notification
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Award Resin Agency App • {lead.receivedAt}</span>
                </div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">{lead.name}</div>
                <div className="mt-1 text-sm font-semibold text-slate-600">
                  {lead.service} • {lead.postcode}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-extrabold text-slate-700">
                <PhoneIncoming className="w-4 h-4" />
                Ready to call
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {lead.details}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button as="a" href={`tel:${lead.phone.replaceAll(" ", "")}`} className="w-full">
                Call
              </Button>
              <Button variant="outline" as="a" href="/quote" className="w-full">
                Quote
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <UpsidesBox className="bg-slate-50">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    t: "Faster response",
                    d: "Leads land on your phone instantly — call back while they’re still looking.",
                  },
                  {
                    t: "Higher close rate",
                    d: "Faster follow‑up usually wins. Being first often beats being cheapest.",
                  },
                  {
                    t: "No lost leads",
                    d: "No inbox hunting, no missed notifications — everything is in one place.",
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
    </section>
  );
}


