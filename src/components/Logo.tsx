import { cn } from "../lib/cn";

type LogoProps = {
  className?: string;
  alt?: string;
  variant?: "default" | "inverse";
};

export function Logo({ className, alt = "Award Resin Ltd & Artificial Lawns", variant = "default" }: LogoProps) {
  return (
    <img
      src="/award-resin-logo.png"
      alt={alt}
      className={cn(
        "h-12 w-auto",
        variant === "inverse" ? "brightness-0 invert" : undefined,
        className
      )}
      loading="eager"
      decoding="async"
    />
  );
}


