import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types/project";

/**
 * NextProject — keyingi loyihaga o'tish bloki (Blueprint §4).
 * To'liq kenglikdagi muqova + sarlavha; oqimni davom ettiradi.
 */
export function NextProject({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  return (
    <Container size="wide" className="mt-24 lg:mt-32">
      <Link
        href={`/work/${project.slug}`}
        className="group relative flex min-h-[280px] items-end overflow-hidden rounded-panel border border-border p-8 elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:min-h-[380px] lg:p-12"
      >
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover opacity-35 transition-all duration-[600ms] ease-out group-hover:scale-105 group-hover:opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/10"
        />
        <div className="relative flex flex-col gap-2">
          <span className="font-mono text-label uppercase tracking-[0.14em] text-accent">
            {label}
          </span>
          <span className="font-display text-display-2 font-light text-fg">
            {project.title}
          </span>
          <span className="text-body text-fg-muted">{project.client}</span>
        </div>
      </Link>
    </Container>
  );
}
