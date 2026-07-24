"use client";

import { useTranslations } from "next-intl";
import { navSections, sectionIds } from "@/content/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NavLink } from "./nav-link";

/**
 * Nav — desktop navigatsiya (lg va undan katta).
 * Scrollspy faol bo'limni belgilaydi.
 */
export function Nav() {
  const t = useTranslations("nav");
  const activeId = useScrollSpy(sectionIds);

  return (
    <nav aria-label="Asosiy" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {navSections.map((section) => (
          <li key={section.id}>
            <NavLink id={section.id} active={activeId === section.id}>
              {t(section.key)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
