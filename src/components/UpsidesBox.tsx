import React from "react";

import { cn } from "../lib/cn";

type UpsidesBoxProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
};

export function UpsidesBox({
  children,
  className,
  label = "Upsides (demo-only — not visible on the live website)",
}: UpsidesBoxProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border-2 border-blue-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="absolute -top-3 left-5 px-3 py-1 rounded-full border border-blue-200 bg-slate-50 text-[11px] font-extrabold text-blue-800">
        {label}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}


