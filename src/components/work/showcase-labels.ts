import type { getTranslations } from "next-intl/server";
import type { ShowcaseLabels } from "./project-showcase";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

/**
 * Tarjimalardan ProjectShowcase yorliqlarini quradi.
 * Bosh sahifa Work bo'limi va `/work` sahifasi bir xil to'plamni ishlatadi.
 */
export function buildShowcaseLabels(t: Translator): ShowcaseLabels {
  return {
    filters: {
      all: t("work.filters.all"),
      brand: t("work.filters.brand"),
      fashion: t("work.filters.fashion"),
      reels: t("work.filters.reels"),
    },
    category: {
      brand: t("work.category.brand"),
      fashion: t("work.category.fashion"),
      reels: t("work.category.reels"),
    },
    watch: t("work.watch"),
    filterAria: t("work.filterAria"),
    modal: {
      close: t("work.modalClose"),
      openInTelegram: t("work.openInTelegram"),
    },
  };
}
