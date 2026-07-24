import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  /** aria-labelledby uchun sarlavha id'si. */
  labelledBy?: string;
  /** Konteynerni o'chirish (to'liq kenglikdagi bo'limlar uchun). */
  bleed?: boolean;
  size?: "content" | "wide";
}

/**
 * Section — bo'lim langari uchun yagona namuna (Blueprint §10).
 * scroll-mt fixed header ofsetini hisobga oladi. Har bir bo'lim
 * `aria-labelledby` bilan sarlavhasiga bog'lanadi.
 */
export function Section({
  id,
  labelledBy,
  bleed = false,
  size = "content",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-gap scroll-mt-28", className)}
      {...props}
    >
      {bleed ? children : <Container size={size}>{children}</Container>}
    </section>
  );
}
