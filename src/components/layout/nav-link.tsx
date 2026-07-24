"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DEFAULT_LOCALE } from "@/content/site";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/utils";

/** Header balandligiga mos langar ofseti — bo'lim sarlavhasi tepada qolishi uchun. */
const HEADER_OFFSET = -96;

interface NavLinkProps {
  id: string;
  active?: boolean;
  onNavigate?: () => void;
  variant?: "bar" | "overlay";
  index?: number;
  children: React.ReactNode;
}

/**
 * NavLink — bo'limga silliq skroll qiluvchi langar.
 * Bosh sahifada Lenis orqali silliq siljiydi; boshqa sahifadan — tabiiy
 * navigatsiya (til prefiksi bilan). Desktop va mobil menyu qayta ishlatadi.
 */
export function NavLink({
  id,
  active = false,
  onNavigate,
  variant = "bar",
  index,
  children,
}: NavLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const scroll = useSmoothScroll();

  const isHome = pathname === "/";
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const href = base ? `${base}#${id}` : `/#${id}`;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (isHome) {
      event.preventDefault();
      scroll?.scrollTo(`#${id}`, { offset: HEADER_OFFSET });
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  if (variant === "overlay") {
    return (
      <a
        href={href}
        onClick={handleClick}
        aria-current={active ? "location" : undefined}
        className={cn(
          "group flex items-baseline gap-4 outline-none",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        )}
      >
        {typeof index === "number" && (
          <span className="font-mono text-label tabular-nums text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          className={cn(
            "font-display text-h1 font-light transition-colors duration-[240ms]",
            active ? "text-accent" : "text-fg group-hover:text-fg-muted",
          )}
        >
          {children}
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={active ? "location" : undefined}
      className={cn(
        "group relative inline-flex items-center gap-2 py-1 font-mono text-label uppercase tracking-[0.12em] outline-none transition-colors duration-[240ms]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        active ? "text-fg" : "text-fg-subtle hover:text-fg",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1 w-1 rounded-full bg-accent transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      />
      {children}
    </a>
  );
}
