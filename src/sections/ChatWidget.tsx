"use client";

import React from "react";
import { CheckCircle2, Mail, MessageCircle, Phone, Send, X } from "lucide-react";

import { Button } from "../components/Button";

export function ChatWidget() {
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatStatus, setChatStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatStatus("submitting");
    window.setTimeout(() => {
      setChatStatus("success");
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        {chatOpen && (
          <div className="w-[340px] max-w-[calc(100vw-2.5rem)] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 px-5 py-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-blue-100">Award Resin Live Help</p>
                  <p className="text-lg font-bold leading-tight">How can we help?</p>
                  <p className="text-xs text-blue-100/90 mt-1">Typical reply within 1 hour (Mon–Fri)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="rounded-full bg-white/15 hover:bg-white/25 transition p-2"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5">
              {chatStatus === "success" ? (
                <div className="py-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="mt-4 text-lg font-bold text-slate-900">Message received</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Thanks — we’ll get back to you shortly. If it’s urgent, please call us now.
                  </p>
                  <div className="mt-5 flex gap-3 justify-center">
                    <Button variant="outline" as="a" href="tel:08000726609" className="text-sm">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                    <Button variant="outline" className="text-sm" onClick={() => setChatStatus("idle")}>
                      New message
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Driveway", "Patio", "Pathway", "Pool surround", "Free quote"].map(
                      (tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>

                  <form onSubmit={handleChatSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Name</label>
                        <input
                          required
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Postcode</label>
                        <input
                          required
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
                          placeholder="SW1A 1AA"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Phone (preferred)</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
                        placeholder="07700 900000"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Message</label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm resize-none"
                        placeholder="Tell us what’s going on (and how urgent it is)."
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <a
                          href="mailto:awardresinltd@gmail.com"
                          className="inline-flex items-center gap-1 hover:text-slate-700"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email
                        </a>
                        <a
                          href="tel:08000726609"
                          className="inline-flex items-center gap-1 hover:text-slate-700"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call
                        </a>
                      </div>

                      <Button type="submit" disabled={chatStatus === "submitting"} className="text-sm">
                        {chatStatus === "submitting" ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> Send
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      This chat sends an enquiry form — no live agent is required.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {!chatOpen && (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3 flex items-center gap-2"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">Chat</span>
          </button>
        )}
      </div>
    </div>
  );
}
