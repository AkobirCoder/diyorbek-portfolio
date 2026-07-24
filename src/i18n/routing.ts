import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE } from "@/content/site";

/**
 * Marshrutlash sozlamasi (Blueprint §2).
 * localePrefix "as-needed" → o'zbek (asosiy) prefikssiz `/`, ru/en → `/ru`, `/en`.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});
