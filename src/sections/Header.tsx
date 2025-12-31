"use client";

import React from "react";
import { ChevronDown, Menu, Phone, Star, X } from "lucide-react";

import { Button } from "../components/Button";
import { Logo } from "../components/Logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = React.useState(false);
  const featuresRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!featuresRef.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!featuresRef.current.contains(target)) setIsFeaturesOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFeaturesOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const openFeatures = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsFeaturesOpen(true);
  };

  const closeFeaturesSoon = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setIsFeaturesOpen(false), 180);
  };

  const mainNavItems = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
  ];

  const featureItems = [
    { label: "Quote Builder", href: "/quote", desc: "Generate a quote summary PDF" },
    { label: "Leave a Review", href: "/review", desc: "Star-gated review flow" },
    { label: "Missed Call Text‑Back", href: "/missed-call-text-back", desc: "Auto SMS follow-up demo" },
    { label: "Leads to App", href: "/leads-to-app", desc: "Form submissions go to your phone" },
    { label: "SEO + Content", href: "/seo-content", desc: "Rank higher with better on-page SEO" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center">
              <Logo className="h-[72px] sm:h-[84px]" />
              <span className="sr-only">Award Resin Ltd</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div
              ref={featuresRef}
              className="relative"
              onMouseEnter={openFeatures}
              onMouseLeave={closeFeaturesSoon}
            >
              <button
                type="button"
                onClick={() => (isFeaturesOpen ? setIsFeaturesOpen(false) : openFeatures())}
                aria-haspopup="menu"
                aria-expanded={isFeaturesOpen}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Features
                <ChevronDown className="w-4 h-4" />
              </button>

              {isFeaturesOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-[340px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
                  onMouseEnter={openFeatures}
                  onMouseLeave={closeFeaturesSoon}
                >
                  <div className="p-2">
                    {featureItems.map((it) => (
                      <a
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className="block rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        <div className="text-sm font-extrabold text-slate-900">{it.label}</div>
                        <div className="text-xs font-semibold text-slate-500 mt-1">{it.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="hidden lg:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 tabular-nums">4.9</span>
              <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
              <img src="/google-g.png" alt="Google" className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium">24/7 Emergency Line</span>
              <a
                href="tel:08000726609"
                className="flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                0800 072 6609
              </a>
            </div>
            <Button as="a" href="#contact">
              Get a Free Quote
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-lg">
          <div className="flex flex-col space-y-4">
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-slate-900 py-2 border-b border-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-2">
              <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase mb-2">
                Features
              </div>
              <div className="flex flex-col">
                {featureItems.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    className="text-lg font-medium text-slate-900 py-2 border-b border-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {it.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="tel:08000726609"
              className="flex items-center gap-2 text-blue-600 font-bold py-2"
            >
              <Phone className="w-5 h-5" /> 0800 072 6609
            </a>
            <Button as="a" href="#contact" className="w-full">
              Get a Free Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
