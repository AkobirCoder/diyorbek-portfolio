import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectCategory } from "@/types/project";
import {
  LoopCarousel,
  type LoopCarouselLabels,
} from "@/components/work/loop-carousel/loop-carousel";

/**
 * Work — "Kim bilan ishlagan?" (Blueprint §1, §4).
 * Sarlavha + "Barcha ishlar" havolasi + 3D Loop Carousel (kinematik namoyish).
 *
 * MUHIM: LoopCarousel transform o'ramiga (Reveal) O'RALMAYDI — 3D perspektiva
 * transformlangan ota elementdan buziladi. Faqat sarlavha animatsiyalanadi.
 */
export interface WorkProps {
  id: string;
  labelledBy: string;
  eyebrow: string;
  title: string;
  description: string;
  allWorkLabel: string;
  projects: readonly Project[];
  categoryLabels: Record<ProjectCategory, string>;
  carouselLabels: LoopCarouselLabels;
}

export function Work({
  id,
  labelledBy,
  eyebrow,
  title,
  description,
  allWorkLabel,
  projects,
  categoryLabels,
  carouselLabels,
}: WorkProps) {
  return (
    <Section id={id} labelledBy={labelledBy} size="wide">
      <Reveal>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <SectionHeading
            titleId={labelledBy}
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="sm:max-w-2xl"
          />
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-surface/50 px-6 py-3 font-mono text-label uppercase tracking-[0.12em] text-fg-muted transition-colors duration-[240ms] hover:border-fg/20 hover:text-fg sm:self-auto"
          >
            {allWorkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>

      <LoopCarousel
        projects={projects}
        categoryLabels={categoryLabels}
        labels={carouselLabels}
        className="mt-14 lg:mt-16"
      />
    </Section>
  );
}
