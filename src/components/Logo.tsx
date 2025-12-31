 "use client";

import React from "react";

import { cn } from "../lib/cn";

type LogoProps = {
  className?: string;
  alt?: string;
  variant?: "default" | "inverse";
};

export function Logo({ className, alt = "Award Resin Ltd", variant = "default" }: LogoProps) {
  const [src, setSrc] = React.useState("/award-resin-logo.svg");

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-12 w-auto",
        variant === "inverse" ? "brightness-0 invert" : undefined,
        className
      )}
      loading="eager"
      decoding="async"
      onError={() => setSrc("/award-resin-logo.svg")}
    />
  );
}


