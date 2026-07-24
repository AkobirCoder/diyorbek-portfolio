import type { Milestone } from "@/types/journey";
import { TimelineProgress } from "./timeline-progress";
import { TimelineItem } from "./timeline-item";

/**
 * Timeline — vertikal vaqt chizig'i (Blueprint §4, §9).
 * Semantik `<ol>`. Markazda scroll bilan to'ladigan chiziq (desktop markaziy,
 * mobil chap), atrofida almashinuvchi bosqichlar.
 */
export function Timeline({ milestones }: { milestones: readonly Milestone[] }) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      <TimelineProgress className="absolute bottom-0 left-2 top-1.5 -translate-x-1/2 md:left-1/2" />
      {milestones.map((milestone, i) => (
        <TimelineItem key={milestone.year} milestone={milestone} index={i} />
      ))}
    </ol>
  );
}
