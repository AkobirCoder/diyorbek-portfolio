"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DEFAULT_LOCALE } from "@/content/site";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Wordmark } from "./wordmark";
import { Nav } from "./nav";
import { LocaleSwitcher } from "./locale-switcher";
import { MenuButton } from "./menu-button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

const HEADER_OFFSET = -96;

/**
 * Header — barcha ekranlarda sobit yuqori panel (Blueprint §4).
 * Tepada shaffof, skroll qilinganda shishaga aylanadi va ixchamlashadi.
 * Mobil menyu holatini boshqaradi; sahifa o'zgarsa menyu yopiladi.
 */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const scroll = useSmoothScroll();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sahifa o'zgarsa menyuni yopamiz — render paytida solishtirish (effekt emas).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Skroll holati — tepada shaffof, pastda shisha
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const contactHref = base ? `${base}#contact` : "/#contact";

  function handleCta(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      event.preventDefault();
      scroll?.scrollTo("#contact", { offset: HEADER_OFFSET });
      window.history.replaceState(null, "", "#contact");
    }
  }

  return (
    <header
      /* Tepada header Hero'ning qorong'i sahnasi ustida turadi — shuning
         uchun o'sha holatda qorong'i tokenlarni majburlaymiz (yorug' rejimda
         qora matn qorong'i Hero ustida o'qilmas edi). */
      data-theme={scrolled ? undefined : "dark"}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "glass-2 border-b border-border"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-content flex items-center justify-between gap-4 transition-[padding] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <Wordmark onNavigate={() => setMenuOpen(false)} />

        <Nav />

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden lg:inline-flex"
          >
            <a href={contactHref} onClick={handleCta}>
              {t("cta")}
            </a>
          </Button>
          <MenuButton
            open={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            controls="mobile-menu"
          />
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
