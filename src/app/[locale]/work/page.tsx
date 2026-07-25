import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { buildShowcaseLabels } from "@/components/work/showcase-labels";
import { getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/site";

function narrow(locale: string): Locale {
  return (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return buildMetadata({
    locale: narrow(locale),
    path: "/work",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

/**
 * /work — barcha loyihalar sahifasi (Blueprint §2, 2-qatlam).
 * Bosh sahifadagi Work bo'limi bilan bir xil ProjectShowcase'ni ishlatadi.
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const activeLocale: Locale = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;

  const projects = getAllProjects(activeLocale);
  const labels = buildShowcaseLabels(t);

  return (
    <Container
      size="wide"
      className="pb-24 pt-32 lg:pb-32 lg:pt-40"
    >
      <div className="flex flex-col gap-5">
        <Eyebrow>{t("work.pageEyebrow")}</Eyebrow>
        <h1 className="text-display-2 text-fg max-w-[16ch] text-balance">
          {t("work.pageTitle")}
        </h1>
        <p className="text-body-lg text-fg-muted max-w-[54ch] text-pretty">
          {t("work.pageDescription")}
        </p>
      </div>

      <ProjectShowcase
        projects={projects}
        labels={labels}
        className="mt-12 lg:mt-16"
      />
    </Container>
  );
}
