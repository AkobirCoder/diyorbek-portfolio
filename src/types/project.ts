/**
 * project.ts — loyiha (portfolio) modeli tiplari (Blueprint §1).
 *
 * `LocalizedProject` — content/projects/*.ts fayllarida saqlanadigan xom shakl.
 * `Project` — repozitoriy qatlami til uchun yechgan, komponentga beriladigan shakl.
 */

import type { Localized } from "./content";

/** Filtrlanadigan toifalar (Blueprint §2: hammasi | brend | moda | reels). */
export type ProjectCategory = "brand" | "fashion" | "reels";

/** Kadr nisbati — gorizontal (brend/reklama) yoki vertikal (reels/moda). */
export type ProjectFormat = "16:9" | "9:16";

/* ── Galereya ───────────────────────────────────────────────────────── */

export interface LocalizedGalleryImage {
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* ── Case Study (ixtiyoriy — /work/[slug] uchun) ────────────────────── */

export interface LocalizedCaseStudy {
  /** Loyiha konteksti — nima va nima uchun. */
  intro: Localized<string>;
  /** Yondashuv — qanday suratga olindi va montaj qilindi. */
  approach: Localized<string>;
}

export interface CaseStudy {
  intro: string;
  approach: string;
}

/* ── Loyiha ─────────────────────────────────────────────────────────── */

/** Xom loyiha — barcha tillar bilan (content faylida shu saqlanadi). */
export interface LocalizedProject {
  slug: string;
  title: Localized<string>;
  /** Mijoz/brend nomi — atoqli ot, tarjima qilinmaydi. */
  client: string;
  category: ProjectCategory;
  format: ProjectFormat;
  year: number;
  /** Muqova yo'li (public/). Haqiqiy fayllar Phase 6'da qo'shiladi. */
  cover: string;
  /** Qisqa tavsif — kartochka va ro'yxat uchun. */
  teaser: Localized<string>;
  /** Telegram post havolasi — video "Play" bosilganda yuklanadi (Phase 6). */
  telegramUrl: string;
  /** Bosh sahifadagi "Tanlangan ishlar"da ko'rsatiladimi. */
  featured?: boolean;
  gallery?: LocalizedGalleryImage[];
  caseStudy?: LocalizedCaseStudy;
}

/** Til tanlangandan keyingi loyiha — komponentlar SHU bilan ishlaydi. */
export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  format: ProjectFormat;
  year: number;
  cover: string;
  teaser: string;
  telegramUrl: string;
  featured: boolean;
  gallery: GalleryImage[];
  caseStudy: CaseStudy | null;
}
