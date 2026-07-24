import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { LOCALES, DEFAULT_LOCALE, site, type Locale } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

/** Toifa yorlig'i — latin (OG runtime kirillni kafolatlamaydi). */
const CATEGORY: Record<string, string> = {
  brand: "BRAND FILM",
  fashion: "FASHION",
  reels: "REELS",
};

/**
 * Dinamik OG rasm (Blueprint §11). 1200×630.
 * Latin-xavfsiz dizayn: mijoz nomi + toifa + brend (title tarjimasi kirill
 * bo'lishi mumkin, OG runtime standart shrifti buni kafolatlamaydi).
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const active: Locale = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
  const project = getProjectBySlug(slug, active);

  const client = project?.client ?? site.name;
  const category = project ? (CATEGORY[project.category] ?? "") : "";
  const year = project ? String(project.year) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#05070C",
          backgroundImage:
            "radial-gradient(60% 80% at 15% 0%, rgba(255,107,33,0.22), transparent 60%), radial-gradient(60% 80% at 100% 100%, rgba(29,92,255,0.18), transparent 55%)",
          color: "#F2F5F9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              backgroundColor: "#FF6B21",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "6px",
              color: "#9AA5B4",
            }}
          >
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "6px",
              color: "#FF6B21",
              display: "flex",
              gap: "16px",
            }}
          >
            {category}
            {year ? <span style={{ color: "#5B6779" }}>· {year}</span> : null}
          </div>
          <div style={{ fontSize: "104px", fontWeight: 700, lineHeight: 1 }}>
            {client}
          </div>
        </div>

        <div
          style={{
            fontSize: "26px",
            letterSpacing: "6px",
            color: "#9AA5B4",
            display: "flex",
          }}
        >
          {site.role.toUpperCase()} · {site.location.cityEn.toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
