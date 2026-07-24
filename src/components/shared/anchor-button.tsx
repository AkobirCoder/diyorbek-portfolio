"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DEFAULT_LOCALE } from "@/content/site";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { Button, type ButtonProps } from "@/components/ui/button";

const HEADER_OFFSET = -96;

interface AnchorButtonProps
  extends Pick<ButtonProps, "variant" | "size" | "className"> {
  /** Sahifadagi bo'lim id'si (masalan "contact"). */
  targetId: string;
  children: React.ReactNode;
}

/**
 * AnchorButton — bo'limga silliq skroll qiluvchi tugma.
 * Button uslublarini NavLink silliq-skroll mantiqi bilan birlashtiradi.
 * Hero, Contact va boshqa CTA'lar qayta ishlatadi.
 */
export function AnchorButton({
  targetId,
  children,
  variant,
  size,
  className,
}: AnchorButtonProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const scroll = useSmoothScroll();

  const isHome = pathname === "/";
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const href = base ? `${base}#${targetId}` : `/#${targetId}`;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      event.preventDefault();
      scroll?.scrollTo(`#${targetId}`, { offset: HEADER_OFFSET });
      window.history.replaceState(null, "", `#${targetId}`);
    }
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    </Button>
  );
}
