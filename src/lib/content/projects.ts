/**
 * projects.ts — loyihalar repozitoriysi (Blueprint §3, "CMS'ga o'tish nuqtasi").
 *
 * Komponentlar loyihalarga faqat shu funksiyalar orqali murojaat qiladi.
 * CMS qo'shilsa — faqat shu fayl o'zgaradi, komponentlar teginmaydi.
 * Har funksiya `LocalizedProject` → `Project` (til yechilgan) shakliga o'tkazadi.
 */

import type { Locale } from "@/content/site";
import { projects as raw } from "@/content/projects";
import type {
  CaseStudy,
  GalleryImage,
  LocalizedCaseStudy,
  LocalizedGalleryImage,
  LocalizedProject,
  Project,
  ProjectCategory,
} from "@/types/project";
import { pick } from "./resolve";

function resolveGallery(
  items: readonly LocalizedGalleryImage[] | undefined,
  locale: Locale,
): GalleryImage[] {
  if (!items) return [];
  return items.map((g) => ({
    src: g.src,
    width: g.width,
    height: g.height,
    alt: pick(g.alt, locale),
  }));
}

function resolveCaseStudy(
  cs: LocalizedCaseStudy | undefined,
  locale: Locale,
): CaseStudy | null {
  if (!cs) return null;
  return { intro: pick(cs.intro, locale), approach: pick(cs.approach, locale) };
}

function resolveProject(p: LocalizedProject, locale: Locale): Project {
  return {
    slug: p.slug,
    title: pick(p.title, locale),
    client: p.client,
    category: p.category,
    format: p.format,
    year: p.year,
    cover: p.cover,
    teaser: pick(p.teaser, locale),
    telegramUrl: p.telegramUrl,
    featured: p.featured ?? false,
    gallery: resolveGallery(p.gallery, locale),
    caseStudy: resolveCaseStudy(p.caseStudy, locale),
  };
}

/** Barcha loyihalar — namoyish tartibida. */
export function getAllProjects(locale: Locale): Project[] {
  return raw.map((p) => resolveProject(p, locale));
}

/** Bosh sahifadagi "Tanlangan ishlar" uchun. */
export function getFeaturedProjects(locale: Locale): Project[] {
  return raw.filter((p) => p.featured).map((p) => resolveProject(p, locale));
}

/** Toifa bo'yicha filtr (brand | fashion | reels). */
export function getProjectsByCategory(
  category: ProjectCategory,
  locale: Locale,
): Project[] {
  return raw
    .filter((p) => p.category === category)
    .map((p) => resolveProject(p, locale));
}

/** Bitta loyiha — Case Study sahifasi uchun. Topilmasa `null`. */
export function getProjectBySlug(slug: string, locale: Locale): Project | null {
  const p = raw.find((x) => x.slug === slug);
  return p ? resolveProject(p, locale) : null;
}

/** Barcha slug'lar — `generateStaticParams` uchun (tildan mustaqil). */
export function getProjectSlugs(): string[] {
  return raw.map((p) => p.slug);
}
