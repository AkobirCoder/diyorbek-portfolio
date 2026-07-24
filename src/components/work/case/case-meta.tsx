import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/types/project";

export interface CaseMetaLabels {
  title: string;
  client: string;
  category: string;
  year: string;
  format: string;
}

/**
 * CaseMeta — loyiha ma'lumotlari jadvali (Blueprint §4).
 */
export function CaseMeta({
  project,
  categoryLabel,
  labels,
}: {
  project: Project;
  categoryLabel: string;
  labels: CaseMetaLabels;
}) {
  const rows = [
    { key: labels.client, value: project.client },
    { key: labels.category, value: categoryLabel },
    { key: labels.year, value: String(project.year) },
    { key: labels.format, value: project.format },
  ];

  return (
    <Container className="mt-20 lg:mt-28">
      <Reveal>
        <Eyebrow>{labels.title}</Eyebrow>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-glass border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <div key={row.key} className="flex flex-col gap-2 bg-bg p-6">
              <dt className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                {row.key}
              </dt>
              <dd className="text-body-lg text-fg">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Container>
  );
}
