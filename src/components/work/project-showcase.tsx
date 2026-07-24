"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";
import { ProjectFilter, type FilterKey } from "./project-filter";
import { ProjectCard } from "./project-card";
import { VideoModal, type VideoModalLabels } from "./video-modal";

export interface ShowcaseLabels {
  filters: Record<FilterKey, string>;
  category: Record<ProjectCategory, string>;
  watch: string;
  filterAria: string;
  modal: VideoModalLabels;
}

/**
 * ProjectShowcase — filtr + setka + VideoModal (Blueprint §6).
 * Bosh sahifadagi Work bo'limi ham, `/work` sahifasi ham shuni qayta ishlatadi.
 * Faqat mijoz holati (filtr, tanlangan video) shu yerda; ma'lumot serverdan keladi.
 */
export function ProjectShowcase({
  projects,
  labels,
  className,
}: {
  projects: readonly Project[];
  labels: ShowcaseLabels;
  className?: string;
}) {
  const [active, setActive] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filters = useMemo(
    () =>
      [
        { key: "all", label: labels.filters.all },
        { key: "brand", label: labels.filters.brand },
        { key: "fashion", label: labels.filters.fashion },
        { key: "reels", label: labels.filters.reels },
      ] as const satisfies readonly { key: FilterKey; label: string }[],
    [labels.filters],
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <div className={className}>
      <ProjectFilter
        filters={filters}
        active={active}
        onChange={setActive}
        label={labels.filterAria}
      />

      <div
        role="region"
        aria-live="polite"
        className={cn(
          "mt-8 grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4",
        )}
      >
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            categoryLabel={labels.category[project.category]}
            watchLabel={labels.watch}
            onOpen={setSelected}
          />
        ))}
      </div>

      <VideoModal
        project={selected}
        onClose={() => setSelected(null)}
        labels={labels.modal}
      />
    </div>
  );
}
