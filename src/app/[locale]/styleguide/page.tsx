import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Eyebrow } from "@/components/shared/eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Ichki dizayn tizimi sahifasi (dev reference). Global Header/Footer ichida.
 */

const typeScale = [
  { token: "text-display-1", label: "Display 1", sample: site.name },
  { token: "text-display-2", label: "Display 2", sample: "Tanlangan ishlar" },
  { token: "text-h1", label: "H1", sample: "Brend filmi" },
  { token: "text-h2", label: "H2", sample: "Moda kampaniyasi" },
  { token: "text-body-lg", label: "Body LG", sample: "Kamera ortidan montajgacha — bir qo'lda." },
  { token: "text-body", label: "Body", sample: "Har bir kadr qaror bilan tanlanadi." },
] as const;

const surfaces = [
  { name: "bg", cls: "bg-bg" },
  { name: "bg-elevated", cls: "bg-bg-elevated" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-raised", cls: "bg-surface-raised" },
] as const;

const accents = [
  { name: "accent", cls: "bg-accent" },
  { name: "accent-hover", cls: "bg-accent-hover" },
  { name: "azure", cls: "bg-azure" },
  { name: "azure-deep", cls: "bg-azure-deep" },
] as const;

function Swatch({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-20 rounded-card border border-border ${cls}`} aria-hidden="true" />
      <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-muted">
        {name}
      </span>
    </div>
  );
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8 border-t border-border pt-14">
      <SectionHeading eyebrow={`${index} — ${title}`} title={title} as="h2" />
      {children}
    </section>
  );
}

export default async function StyleGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container className="flex flex-col gap-20 pt-32 pb-24">
      <header className="flex flex-col gap-4">
        <Eyebrow>Dizayn tizimi · 1-bosqich</Eyebrow>
        <h1 className="text-display-2 text-fg">Stil sahifasi</h1>
      </header>

      <Block index="01" title="Ranglar">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {surfaces.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {accents.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      </Block>

      <Block index="02" title="Tipografika">
        <div className="flex flex-col divide-y divide-border">
          {typeScale.map((t) => (
            <div
              key={t.token}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            >
              <span className={`${t.token} text-fg`}>{t.sample}</span>
              <span className="shrink-0 font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                {t.token}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block index="03" title="Glassmorphism">
        <div className="relative">
          <div
            aria-hidden="true"
            className="radial-glow absolute inset-0"
            style={{ "--glow-color": "var(--accent)", "--glow-x": "70%", "--glow-opacity": "0.25" } as React.CSSProperties}
          />
          <div className="relative grid gap-6 sm:grid-cols-3">
            {([1, 2, 3] as const).map((level) => (
              <GlassPanel key={level} level={level} className="flex flex-col gap-3 p-7">
                <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-muted">
                  glass-{level}
                </span>
                <span className="text-h2 text-fg">Shisha {level}</span>
              </GlassPanel>
            ))}
          </div>
        </div>
      </Block>

      <Block index="04" title="Tugmalar">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Loyiha boshlash</Button>
          <Button variant="glass">Showreel</Button>
          <Button variant="outline">Barcha ishlar</Button>
          <Button variant="ghost">Batafsil</Button>
        </div>
      </Block>
    </Container>
  );
}
