import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/journey/timeline";
import type { Milestone } from "@/types/journey";

/**
 * Journey — "Qanday o'sgan?" (Blueprint §1, §4, §8).
 * Markazlashgan sarlavha + vertikal vaqt chizig'i.
 */
export interface JourneyProps {
  id: string;
  labelledBy: string;
  eyebrow: string;
  title: string;
  description: string;
  milestones: readonly Milestone[];
}

export function Journey({
  id,
  labelledBy,
  eyebrow,
  title,
  description,
  milestones,
}: JourneyProps) {
  return (
    <Section id={id} labelledBy={labelledBy}>
      <Reveal>
        <SectionHeading
          titleId={labelledBy}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
      </Reveal>

      <div className="mt-16 lg:mt-24">
        <Timeline milestones={milestones} />
      </div>
    </Section>
  );
}
