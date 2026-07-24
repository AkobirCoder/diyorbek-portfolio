import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Skill } from "@/types/content";
import { SkillCard } from "./skill-card";
import { ToolMarquee } from "./tool-marquee";

/**
 * Skills — "Nima qila oladi?" (Blueprint §1, §4).
 * Server component: sarlavha + 6 SkillCard setka (stagger reveal) + ToolMarquee.
 */
export interface SkillsProps {
  id: string;
  labelledBy: string;
  eyebrow: string;
  title: string;
  description: string;
  toolsLabel: string;
  skills: readonly Skill[];
}

export function Skills({
  id,
  labelledBy,
  eyebrow,
  title,
  description,
  toolsLabel,
  skills,
}: SkillsProps) {
  return (
    <Section id={id} labelledBy={labelledBy}>
      <Reveal>
        <SectionHeading
          titleId={labelledBy}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => (
          <Reveal key={skill.key} delay={i * 0.06} className="h-full">
            <SkillCard skill={skill} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 lg:mt-20">
        <ToolMarquee label={toolsLabel} />
      </Reveal>
    </Section>
  );
}
