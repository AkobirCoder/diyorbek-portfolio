import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerElement = "div" | "section" | "header" | "footer" | "main";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  /** `wide` — 1600px maksimal (Hero, keng bo'limlar uchun). */
  size?: "content" | "wide" | "full";
}

/**
 * Container — markazlangan, moslashuvchan chekkali o'ram.
 * Chekka: clamp(20px → 64px). Barcha bo'limlar shu bilan tekislanadi.
 */
export function Container({
  as: Tag = "div",
  size = "content",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full mx-auto",
        size === "content" && "container-content",
        size === "wide" &&
          "max-w-[var(--container-wide)] px-[clamp(1.25rem,0.5rem+3.75vw,5rem)]",
        size === "full" && "px-[clamp(1.25rem,0.5rem+3.75vw,4rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
