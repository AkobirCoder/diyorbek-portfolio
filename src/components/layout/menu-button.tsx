"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * MenuButton — mobil hamburger. Ikki chiziq X'ga aylanadi (o'rta chiziq
 * yo'q — tozaroq morfing). Faqat lg'dan kichik ekranlarda.
 */
export function MenuButton({
  open,
  onClick,
  controls,
}: {
  open: boolean;
  onClick: () => void;
  controls: string;
}) {
  const t = useTranslations("nav");
  const line =
    "absolute left-1/2 h-px w-5 -translate-x-1/2 bg-fg transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? t("closeMenu") : t("openMenu")}
      className={cn(
        "glass-1 relative grid h-11 w-11 place-items-center rounded-full text-fg lg:hidden",
        "transition-colors duration-[240ms] hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      )}
    >
      <span aria-hidden="true" className="relative block h-4 w-5">
        <span
          className={cn(line, open ? "top-1/2 rotate-45" : "top-[5px] rotate-0")}
        />
        <span
          className={cn(
            line,
            open ? "top-1/2 -rotate-45" : "top-[11px] rotate-0",
          )}
        />
      </span>
    </button>
  );
}
