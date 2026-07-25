import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseHero } from "@/components/work/case/case-hero";
import { CaseVideo } from "@/components/work/case/case-video";
import { CaseTextBlock } from "@/components/work/case/case-text-block";
import { CaseGallery } from "@/components/work/case/case-gallery";
import { CaseMeta } from "@/components/work/case/case-meta";
import { NextProject } from "@/components/work/case/next-project";
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/site";
import { buildMetadata, localizedUrl } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { videoObjectJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

function narrow(locale: string): Locale {
  return (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, narrow(locale));
  if (!project) return {};
  return buildMetadata({
    locale: narrow(locale),
    path: `/work/${slug}`,
    title: `${project.title} — ${project.client}`,
    description: project.teaser,
  });
}

/**
 * /work/[slug] — Case Study sahifasi (Blueprint §2, §4, 2-qatlam).
 * caseStudy/gallery bo'lmagan loyihalar ham ishlaydi — o'sha bloklar tashlanadi.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const activeLocale = narrow(locale);

  const project = getProjectBySlug(slug, activeLocale);
  if (!project) notFound();

  const t = await getTranslations();
  const all = getAllProjects(activeLocale);
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length]!;

  const categoryLabel = t(`work.category.${project.category}`);
  const modalLabels = {
    close: t("work.modalClose"),
    openInTelegram: t("work.openInTelegram"),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: t("a11y.home"), url: localizedUrl(activeLocale) },
    { name: t("work.pageTitle"), url: localizedUrl(activeLocale, "/work") },
    {
      name: project.title,
      url: localizedUrl(activeLocale, `/work/${slug}`),
    },
  ]);

  return (
    <article className="pb-24 lg:pb-32">
      <JsonLd data={[videoObjectJsonLd(project, activeLocale), breadcrumb]} />
      <CaseHero
        project={project}
        categoryLabel={categoryLabel}
        backLabel={t("case.backToWork")}
      />

      <CaseVideo
        project={project}
        watchLabel={t("work.watch")}
        modalLabels={modalLabels}
      />

      {project.caseStudy ? (
        <>
          <CaseTextBlock
            label={t("case.about")}
            text={project.caseStudy.intro}
          />
          <CaseTextBlock
            label={t("case.approach")}
            text={project.caseStudy.approach}
          />
        </>
      ) : null}

      {project.gallery.length > 0 ? (
        <CaseGallery
          label={t("case.gallery")}
          images={project.gallery}
          labels={{
            close: t("case.lightboxClose"),
            prev: t("case.lightboxPrev"),
            next: t("case.lightboxNext"),
          }}
        />
      ) : null}

      <CaseMeta
        project={project}
        categoryLabel={categoryLabel}
        labels={{
          title: t("case.details"),
          client: t("case.metaClient"),
          category: t("case.metaCategory"),
          year: t("case.metaYear"),
          format: t("case.metaFormat"),
        }}
      />

      <NextProject project={next} label={t("case.next")} />
    </article>
  );
}
