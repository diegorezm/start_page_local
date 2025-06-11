import type { ButtonHTMLAttributes } from "react";
import { Button as ButtonH } from "@headlessui/react";

import { cn } from "../../lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export function Button({
  size = "md",
  variant = "primary",
  className,
  isLoading = false,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <ButtonH
      className={cn(
        "inline-flex items-center w-full justify-center rounded-lg hover:cursor-pointer transition-colors duration-200 gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        variant === "primary" &&
        "bg-primary text-on-primary hover:bg-primary/90 focus-visible:ring-primary",

        variant === "secondary" &&
        "bg-secondary text-on-secondary hover:bg-secondary/90 focus-visible:ring-secondary",

        variant === "tertiary" &&
        "bg-tertiary text-on-tertiary hover:bg-tertiary/90 focus-visible:ring-tertiary",

        variant === "outline" &&
        "border border-primary text-foreground hover:bg-primary hover:text-on-primary focus-visible:ring-primary",

        variant === "ghost" &&
        "text-foreground hover:bg-foreground/10 focus-visible:ring-foreground",

        size === "sm" && "px-3 py-1 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",

        (disabled || isLoading) && "opacity-50 cursor-not-allowed",

        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-r-transparent rounded-full"></span>
      ) : (
        children
      )}
    </ButtonH>
  );
}
