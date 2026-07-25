import { site, type Locale } from "@/content/site";
import type { Project } from "@/types/project";
import { localizedUrl } from "./metadata";

/**
 * JSON-LD strukturaviy ma'lumot (Blueprint §11).
 * Google'ga kim, qayerda, nima xizmat ko'rsatishini aniq aytadi; VideoObject
 * esa loyihalarni Google video natijalariga chiqarish imkonini beradi.
 */

const address = {
  "@type": "PostalAddress",
  addressLocality: site.location.cityEn,
  addressCountry: "UZ",
} as const;

const sameAs = [site.social.instagram.url, site.social.telegram.url];

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    image: `${site.url}/portrait/portrait.webp`,
    address,
    sameAs,
  };
}

export function professionalServiceJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${site.role}`,
    url: localizedUrl(locale),
    image: `${site.url}/portrait/portrait.webp`,
    telephone: site.contact.phone,
    email: site.contact.email,
    address,
    areaServed: [site.location.countryEn, "Worldwide"],
    serviceType: [
      "Brand films",
      "Commercials",
      "Fashion & beauty video",
      "Instagram Reels",
      "Color grading",
      "Video editing",
    ],
    sameAs,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: localizedUrl(locale),
    inLanguage: locale,
  };
}

export function videoObjectJsonLd(project: Project, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.teaser,
    thumbnailUrl: `${site.url}${project.cover}`,
    uploadDate: `${project.year}-01-01`,
    contentUrl: project.telegramUrl,
    creator: { "@type": "Person", name: site.name },
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
