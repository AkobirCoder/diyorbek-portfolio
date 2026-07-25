import type { Metadata } from "next";
import { site, LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/site";

/**
 * SEO metadata yordamchilari (Blueprint §11).
 * Uch tilli sayt uchun eng nozik qism — har sahifada to'g'ri `canonical` va
 * `hreflang` muqobillari bo'lishi kerak, aks holda Google uch tilni "nusxa"
 * deb hisoblaydi.
 */

/** Til va yo'ldan absolut URL quradi. `as-needed` prefiks: uz → prefikssiz. */
export function localizedUrl(locale: Locale, path = ""): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const clean = path === "/" ? "" : path;
  return `${site.url}${prefix}${clean}`;
}

/** hreflang muqobillari — uz · ru · en (+ ixtiyoriy x-default). */
export function languageAlternates(
  path = "",
  includeXDefault = true,
): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of LOCALES) {
    langs[l] = localizedUrl(l, path);
  }
  if (includeXDefault) {
    langs["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  }
  return langs;
}

/**
 * To'liq, tilga bog'langan Metadata quradi: canonical + hreflang + OpenGraph +
 * Twitter. Har bir sahifa `generateMetadata` shu yordamchi orqali ishlaydi.
 * `title` absolut — layout shablonini takrorlamaydi.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  ogImage,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const url = localizedUrl(locale, path);
  const images = ogImage ? [{ url: ogImage }] : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
