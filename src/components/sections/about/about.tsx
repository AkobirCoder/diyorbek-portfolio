import { Section } from "@/components/shared/section";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { StatItem } from "@/components/shared/stat-row";
import { AboutStats } from "./about-stats";

/**
 * About — "Nega aynan u?" (Blueprint §1, §4).
 *
 * Server component: qobiq va matn server tomonda, animatsiya faqat
 * client barglarda (Reveal, TextReveal, AboutStats). Kompozitsiya:
 * chapda portret detali, o'ngda bayonot + tavsif + imzo; pastda sanaladigan
 * statistika.
 */
export interface AboutProps {
  id: string;
  labelledBy: string;
  eyebrow: string;
  statement: string;
  body: string;
  portraitAlt: string;
  signatureName: string;
  signatureRole: string;
  stats: readonly StatItem[];
}

export function About({
  id,
  labelledBy,
  eyebrow,
  statement,
  body,
  portraitAlt,
  signatureName,
  signatureRole,
  stats,
}: AboutProps) {
  return (
    <Section id={id} labelledBy={labelledBy}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Matn — mobilda birinchi (bayonot boshlaydi), desktopda o'ngda */}
        <div className="flex flex-col gap-8 lg:order-2">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <TextReveal
            as="h2"
            id={labelledBy}
            text={statement}
            className="text-display-2 text-fg max-w-[18ch] text-balance"
          />

          <Reveal delay={0.1}>
            <p className="text-body-lg text-fg-muted max-w-[54ch] text-pretty">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-2 flex flex-col gap-1">
              <span className="font-display text-h2 font-light text-fg">
                {signatureName}
              </span>
              <span className="inline-flex items-center gap-3 font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                <span aria-hidden="true" className="h-px w-6 bg-accent/80" />
                {signatureRole}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Portret detali — desktopda chapda */}
        <Reveal y={32} className="lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-panel border border-border bg-gradient-to-b from-surface to-bg elev-2 lg:mx-0 lg:max-w-none">
            {/* Oldindan optimallashtirilgan portret — next/image qayta kodlamasligi uchun oddiy <img>. */}
            <img
              src="/portrait/portrait.webp"
              alt={portraitAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full select-none object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, transparent 45%, var(--bg) 100%)",
              }}
            />
          </div>
        </Reveal>
      </div>

      {/* Statistika — sanaladigan (Blueprint §8) */}
      <Reveal className="mt-16 border-t border-border pt-10 lg:mt-24">
        <AboutStats items={stats} />
      </Reveal>
    </Section>
  );
}
