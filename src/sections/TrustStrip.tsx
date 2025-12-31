import React from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  HardHat,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";

export function TrustStrip() {
  const items: Array<
    | { text: string; icon: React.ComponentType<{ className?: string }> }
    | { text: string; imageSrc: string; imageAlt: string }
  > = [
    { icon: ShieldCheck, text: "Fully Insured" },
    { icon: BadgeCheck, text: "NFRC Member" },
    { imageSrc: "/google-g.png", imageAlt: "Google", text: "4.9 Google Reviews" },
    { imageSrc: "/trustpilot.png", imageAlt: "Trustpilot", text: "TrustPilot Rated" },
    { icon: CheckCircle2, text: "25 Year Guarantee" },
    { icon: Award, text: "City & Guilds Qualified" },
    { icon: HardHat, text: "SafeContractor Accredited" },
    { icon: Building2, text: "Local Authority Approved" },
    { icon: ThumbsUp, text: "Federation of Master Builders" },
  ];

  return (
    <div className="bg-white border-b border-slate-100 overflow-hidden py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-scroll gap-16 items-center whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  {"icon" in item ? (
                    <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
