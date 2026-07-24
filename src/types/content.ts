/**
 * content.ts — kontent qatlamining umumiy tiplari (Blueprint §1, §3).
 *
 * Falsafa: `content/` fayllarida ma'lumot UCH TILDA saqlanadi (`Localized<T>`),
 * `lib/content/` repozitoriy qatlami esa so'ralgan til uchun oddiy qiymatga
 * yechadi. Komponentlar faqat yechilgan (til tanlangan) tiplar bilan ishlaydi.
 *
 * Shu sabab bu yerda har model uchun IKKI shakl bor:
 *   • `Localized…`  — xom, uch tilli (content faylida)
 *   • sof interfeys — yechilgan, bir tilli (komponentda)
 */

import type { Locale } from "@/content/site";

/** Uch tilda takrorlanadigan matnli maydon. */
export type Localized<T = string> = Record<Locale, T>;

/* ── Mahorat (Skill) — Blueprint §1 ─────────────────────────────────── */

export interface LocalizedSkill {
  key: string;
  /** Ikonka identifikatori (skill-icons.tsx ichida moslashtiriladi). */
  icon: string;
  label: Localized<string>;
  description: Localized<string>;
}

export interface Skill {
  key: string;
  icon: string;
  label: string;
  description: string;
}

/* ── Xizmat (Service) — Blueprint §0, §1 ────────────────────────────── */

export interface LocalizedService {
  key: string;
  label: Localized<string>;
  description: Localized<string>;
}

export interface Service {
  key: string;
  label: string;
  description: string;
}
