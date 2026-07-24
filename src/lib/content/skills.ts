/**
 * skills.ts — mahorat repozitoriysi. Tilga yechilgan 6 ta mahorat.
 */

import type { Locale } from "@/content/site";
import { skills as raw } from "@/content/skills";
import type { Skill } from "@/types/content";
import { pick } from "./resolve";

export function getSkills(locale: Locale): Skill[] {
  return raw.map((s) => ({
    key: s.key,
    icon: s.icon,
    label: pick(s.label, locale),
    description: pick(s.description, locale),
  }));
}
