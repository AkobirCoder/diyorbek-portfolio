"use client";

import { useTranslations } from "next-intl";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";

/**
 * BackToTop — footer'dagi "yuqoriga qaytish". Lenis orqali silliq, aks holda
 * tabiiy skroll.
 */
export function BackToTop() {
  const t = useTranslations("a11y");
  const scroll = useSmoothScroll();

  return (
    <button
      type="button"
      onClick={() => scroll?.scrollTo(0)}
      className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.14em] text-fg-muted transition-colors duration-[240ms] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {t("backToTop")}
      <span
        aria-hidden="true"
        className="transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
      >
        ↑
      </span>
    </button>
  );
}
