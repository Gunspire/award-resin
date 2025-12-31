import React from "react";

import { cn } from "../lib/cn";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as, ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
      secondary: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      white: "bg-white text-blue-900 hover:bg-blue-50 shadow-md",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    const baseClass = cn(
      "inline-flex items-center justify-center rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
      variants[variant],
      sizes[size],
      className
    );

    if (as === "a") {
      const { href, ...anchorProps } =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClass}
          {...anchorProps}
        />
      );
    }

    return (
      <button
        ref={ref}
        className={baseClass}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = "Button";
