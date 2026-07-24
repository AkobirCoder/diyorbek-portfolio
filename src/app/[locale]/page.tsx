import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Hero } from "@/components/sections/hero/hero";
import { About } from "@/components/sections/about/about";
import { Skills } from "@/components/sections/skills/skills";
import { Work } from "@/components/sections/work/work";
import { Journey } from "@/components/sections/journey/journey";
import { navSections } from "@/content/navigation";
import { site, LOCALES, DEFAULT_LOCALE, type Locale } from "@/content/site";
import { getSkills, getAllProjects, getMilestones } from "@/lib/content";

/**
 * Bosh sahifa.
 * Hero (3), About + Skills (5) to'liq. Work/Journey/Contact langarlari
 * keyingi bosqichlarda shu joyga quriladi.
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

  /** Hali ichki UI qurilmagan langarlar (keyingi bosqichlar). */
  const pendingSections = navSections.filter((s) => s.id === "contact");

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

      {/* ---- Qolgan langarlar (haqiqiy sarlavhalar; ichki UI keyingi bosqichlarda) ---- */}
      {pendingSections.map((section) => {
        const titleId = `${section.id}-title`;
        return (
          <Section key={section.id} id={section.id} labelledBy={titleId}>
            <SectionHeading
              titleId={titleId}
              eyebrow={t(`sections.${section.key}.eyebrow`)}
              title={t(`sections.${section.key}.title`)}
              description={t(`sections.${section.key}.description`)}
            />

            {/* Contact bo'limi — haqiqiy aloqa kanallari (deyarli yakuniy) */}
            {section.id === "contact" && (
              <ul className="mt-12 grid gap-px overflow-hidden rounded-glass border border-border bg-border sm:grid-cols-2">
                {[
                  { label: "Telegram", value: site.social.telegram.handle, href: site.social.telegram.url },
                  { label: "Instagram", value: site.social.instagram.handle, href: site.social.instagram.url },
                  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
                  { label: "Telefon", value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
                ].map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 bg-bg px-6 py-6 transition-colors duration-[240ms] hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                        {channel.label}
                      </span>
                      <span className="text-body text-fg transition-colors group-hover:text-accent">
                        {channel.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        );
      })}
    </>
  );
}
