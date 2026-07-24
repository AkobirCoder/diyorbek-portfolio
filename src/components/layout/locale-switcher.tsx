"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * LocaleSwitcher — til almashtirgichi (uz · ru · en).
 * Joriy yo'lni saqlab, tilni almashtiradi (next-intl router.replace).
 * Segmentlangan boshqaruv — har til alohida tugma, faol holat urg'ulangan.
 */
export function LocaleSwitcher({
  className,
  size = "sm",
  onSelect,
}: {
  className?: string;
  size?: "sm" | "lg";
  onSelect?: () => void;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    onSelect?.();
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label="Til tanlash"
      aria-busy={isPending}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-1",
        size === "sm" ? "glass-1" : "border border-border",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            disabled={isPending}
            className={cn(
              "rounded-full font-mono uppercase tracking-[0.1em] transition-colors duration-[240ms]",
              size === "sm"
                ? "px-2.5 py-1 text-[0.6875rem]"
                : "px-4 py-2 text-label",
              active
                ? "bg-accent/15 text-accent"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
