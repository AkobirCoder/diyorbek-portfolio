import { cn } from "@/lib/utils";

export interface StatItem {
  value: string;
  label: string;
}

/**
 * StatRow — ishonch raqamlari qatori (100+ · 50+ · 4 yil).
 * Semantik `<dl>`. Hero va About qayta ishlatadi.
 * Sanoq animatsiyasi 3-bosqichda tashqi o'ram orqali qo'shiladi.
 */
export function StatRow({
  items,
  className,
}: {
  items: readonly StatItem[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-wrap gap-x-10 gap-y-6", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5">
          <dd className="font-display text-h1 font-light leading-none text-fg">
            {item.value}
          </dd>
          <dt className="font-mono text-label uppercase tracking-[0.14em] text-fg-muted">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
