import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * robots.txt — to'liq indekslashga ruxsat, sitemap havolasi bilan (Blueprint §11).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
