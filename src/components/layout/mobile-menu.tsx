"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { navSections } from "@/content/navigation";
import { site } from "@/content/site";
import { getFocusable } from "@/lib/focus";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import { NavLink } from "./nav-link";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";

const contactChannels = [
  { label: "Telegram", href: site.social.telegram.url },
  { label: "Instagram", href: site.social.instagram.url },
  { label: "Email", href: `mailto:${site.contact.email}` },
] as const;

const easeExpo = "cubic-bezier(0.16,1,0.3,1)";

/**
 * MobileMenu — to'liq ekranli premium menyu (Blueprint §4).
 * Elementlar stagger bilan kiradi, shisha fon, fokus qamovi, Esc bilan yopilish,
 * skroll bloki, reduced-motion'da oniy. Yopilganda `inert` — tab tartibidan chiqadi.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const scroll = useSmoothScroll();

  useLockScroll(open);

  // Ochilganda Lenis'ni to'xtatamiz
  useEffect(() => {
    if (open) scroll?.stop();
    else scroll?.start();
  }, [open, scroll]);

  // Fokus boshqaruvi: birinchi elementga fokus, Esc, Tab qamovi, qaytarish
  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusables = getFocusable(container);
    focusables[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !container) return;
      const items = getFocusable(container);
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const footerDelay = 120 + navSections.length * 60;

  return (
    <div
      ref={containerRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.menu")}
      inert={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col lg:hidden",
        "transition-[opacity,visibility] duration-[500ms]",
        open
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
      )}
      style={{ transitionTimingFunction: easeExpo }}
    >
      {/* Shisha fon — bosilganda yopiladi */}
      <button
        type="button"
        tabIndex={-1}
        aria-label={t("nav.closeMenu")}
        onClick={onClose}
        className="glass-3 absolute inset-0 bg-bg/70"
      />
      <div
        aria-hidden="true"
        className="radial-glow absolute inset-x-0 top-0 h-[50vh]"
        style={
          {
            "--glow-color": "var(--accent)",
            "--glow-opacity": "0.12",
            "--glow-y": "20%",
          } as React.CSSProperties
        }
      />

      {/* Kontent */}
      <div className="relative flex h-full flex-col justify-between px-6 pb-12 pt-24">
        <nav aria-label="Mobil navigatsiya">
          <ul className="flex flex-col gap-6">
            {navSections.map((section, i) => (
              <li
                key={section.id}
                className={cn(
                  "transition-all duration-[500ms]",
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{
                  transitionTimingFunction: easeExpo,
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                }}
              >
                <NavLink
                  id={section.id}
                  variant="overlay"
                  index={i}
                  onNavigate={onClose}
                >
                  {t(`nav.${section.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            "flex flex-col gap-8 transition-all duration-[500ms]",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{
            transitionTimingFunction: easeExpo,
            transitionDelay: open ? `${footerDelay}ms` : "0ms",
          }}
        >
          <LocaleSwitcher size="lg" onSelect={onClose} />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contactChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-label uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-accent"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
