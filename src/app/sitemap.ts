import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE } from "@/content/site";
import { getProjectSlugs } from "@/lib/content";
import { localizedUrl, languageAlternates } from "@/lib/seo/metadata";

/**
 * sitemap.xml — barcha sahifalar × 3 til, hreflang muqobillari bilan
 * (Blueprint §2, §11). Jami (1 + 1 + 10) × 3 = 36 URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    ...getProjectSlugs().map((slug) => `/work/${slug}`),
  ];

  return paths.map((path) => ({
    url: localizedUrl(DEFAULT_LOCALE, path),
    // sitemap uchun x-default kiritilmaydi — faqat haqiqiy tillar
    alternates: { languages: languageAlternates(path, false) },
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
