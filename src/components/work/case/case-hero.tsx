import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types/project";

/**
 * CaseHero — case study sarlavha bloki (Blueprint §4).
 * Orqaga havola · toifa+yil · sarlavha (TextReveal) · teaser · mijoz.
 */
export function CaseHero({
  project,
  categoryLabel,
  backLabel,
}: {
  project: Project;
  categoryLabel: string;
  backLabel: string;
}) {
  return (
    <Container size="wide" className="pt-32 lg:pt-40">
      <Reveal>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
      </Reveal>

      <div className="mt-10 flex flex-col gap-6">
        <Reveal>
          <Eyebrow>
            {categoryLabel} · {project.year}
          </Eyebrow>
        </Reveal>
        <TextReveal
          as="h1"
          text={project.title}
          className="text-display-1 text-fg max-w-[18ch] text-balance"
        />
        <Reveal delay={0.1}>
          <p className="text-body-lg text-fg-muted max-w-[56ch] text-pretty">
            {project.teaser}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
            {project.client}
          </span>
        </Reveal>
      </div>
    </Container>
  );
}
