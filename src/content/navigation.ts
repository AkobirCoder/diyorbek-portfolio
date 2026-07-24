/**
 * navigation.ts — Sayt bo'limlari ro'yxati (yagona manba).
 * Header nav, mobil menyu va scrollspy shu ro'yxatdan quriladi.
 * `id` — sahifadagi bo'lim langari, `key` — tarjima kaliti (nav.*).
 */

export const navSections = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "work", key: "work" },
  { id: "journey", key: "journey" },
  { id: "contact", key: "contact" },
] as const;

export type NavSection = (typeof navSections)[number];
export type NavSectionId = NavSection["id"];

/** Barqaror id massivi — scrollspy va langar navigatsiyasi uchun. */
export const sectionIds: readonly NavSectionId[] = navSections.map((s) => s.id);
