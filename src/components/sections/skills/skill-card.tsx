import type { Skill } from "@/types/content";
import { skillIcons } from "./skill-icons";

/**
 * SkillCard — bitta mahorat kartochkasi (Blueprint §4).
 * Server component — hover CSS bilan, JS kerak emas. Ikonka `skill.icon`
 * kaliti orqali skill-icons.tsx dan olinadi.
 */
export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skillIcons[skill.icon];

  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-glass border border-border bg-surface/50 p-7 transition-colors duration-[240ms] hover:bg-surface-raised">
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-card border border-border bg-bg text-accent transition-colors duration-[240ms] group-hover:border-accent/40">
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </span>
        <span className="font-mono text-label text-fg-subtle">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-h2 text-fg">{skill.label}</h3>
      <p className="text-body text-fg-muted text-pretty">{skill.description}</p>
    </article>
  );
}
