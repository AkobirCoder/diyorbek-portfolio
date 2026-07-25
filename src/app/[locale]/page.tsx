import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/sections/hero/hero";
import { About } from "@/components/sections/about/about";
import { Skills } from "@/components/sections/skills/skills";
import { Work } from "@/components/sections/work/work";
import { Journey } from "@/components/sections/journey/journey";
import { Contact } from "@/components/sections/contact/contact";
import { site, LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/site";
import { getSkills, getAllProjects, getMilestones } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: activeLocale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

/**
 * Bosh sahifa — barcha bo'limlar (Blueprint §1, 1-qatlam):
 * Hero · About · Skills · Work · Journey · Contact.
 */
export default async function HomePage({
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

  const stats = site.stats.map((s) => ({
    value: s.value,
    label: t(`hero.${s.labelKey}`),
  }));

  const skills = getSkills(activeLocale);
  const projects = getAllProjects(activeLocale);
  const milestones = getMilestones(activeLocale);

  const categoryLabels = {
    brand: t("work.category.brand"),
    fashion: t("work.category.fashion"),
    reels: t("work.category.reels"),
  };
  const carouselLabels = {
    carousel: t("work.carouselLabel"),
    prev: t("work.carouselPrev"),
    next: t("work.carouselNext"),
  };

  return (
    <>
      <Hero
        eyebrow={`${t("hero.role")} · ${t("hero.location")}`}
        name={site.name}
        intro={t("hero.intro")}
        ctaLabel={t("hero.cta")}
        reelLabel={t("hero.reel")}
        portraitAlt={t("hero.portraitAlt")}
        backdropWord={t("hero.backdropWord")}
        stats={stats}
      />

      <About
        id="about"
        labelledBy="about-title"
        eyebrow={t("sections.about.eyebrow")}
        statement={t("sections.about.title")}
        body={t("sections.about.description")}
        portraitAlt={t("sections.about.portraitAlt")}
        signatureName={site.name}
        signatureRole={t("hero.role")}
        stats={stats}
      />

      <Skills
        id="skills"
        labelledBy="skills-title"
        eyebrow={t("sections.skills.eyebrow")}
        title={t("sections.skills.title")}
        description={t("sections.skills.description")}
        toolsLabel={t("sections.skills.tools")}
        skills={skills}
      />

      <Work
        id="work"
        labelledBy="work-title"
        eyebrow={t("sections.work.eyebrow")}
        title={t("sections.work.title")}
        description={t("sections.work.description")}
        allWorkLabel={t("work.allWork")}
        projects={projects}
        categoryLabels={categoryLabels}
        carouselLabels={carouselLabels}
      />

      <Journey
        id="journey"
        labelledBy="journey-title"
        eyebrow={t("sections.journey.eyebrow")}
        title={t("sections.journey.title")}
        description={t("sections.journey.description")}
        milestones={milestones}
      />

      <Contact
        id="contact"
        labelledBy="contact-title"
        eyebrow={t("sections.contact.eyebrow")}
        title={t("sections.contact.title")}
        description={t("sections.contact.description")}
        channelsTitle={t("brief.channelsTitle")}
      />
    </>
  );
}
