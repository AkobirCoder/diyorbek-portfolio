/**
 * resolve.ts — repozitoriy qatlamining ichki yordamchisi.
 * Uch tilli (`Localized`) qiymatdan so'ralgan tildagisini oladi.
 * Bu — content/ va komponent orasidagi yagona til-yechish nuqtasi.
 */

import type { Locale } from "@/content/site";
import type { Localized } from "@/types/content";

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
