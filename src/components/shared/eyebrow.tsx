import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Chap tomonda nozik chiziq (Frame.io aniqligi). */
  marker?: boolean;
}

/**
 * Eyebrow — bo'lim tepasidagi kichik mono yorliq.
 * Masalan: "01 — ISHLAR". Rang urg'u emas, muted (matn sifatida orange taqiqlangan).
 */
export function Eyebrow({
  marker = true,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-label uppercase tracking-[0.14em] text-fg-muted",
        className,
      )}
      {...props}
    >
      {marker && (
        <span
          aria-hidden="true"
          className="h-px w-8 bg-accent/80"
        />
      )}
      {children}
    </span>
  );
}
