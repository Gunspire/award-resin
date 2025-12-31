import React from "react";

import { ArrowRight } from "lucide-react";

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[16/9] w-full border-b border-slate-100 bg-slate-100 overflow-hidden">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-slate-900/5 blur-2xl" />
          </>
        )}
      </div>

      <div className="p-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-slate-600 leading-relaxed mt-2 mb-4">{description}</p>
          <a
            href="#contact"
            className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform"
          >
            Learn more <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
