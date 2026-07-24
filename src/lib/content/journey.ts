/**
 * journey.ts — vaqt chizig'i repozitoriysi.
 * Bosqichlarni yil bo'yicha o'sish tartibida, tilga yechib qaytaradi.
 */

import type { Locale } from "@/content/site";
import { milestones as raw } from "@/content/journey";
import type { Milestone } from "@/types/journey";
import { pick } from "./resolve";

export function getMilestones(locale: Locale): Milestone[] {
  return raw
    .map((m) => ({
      year: m.year,
      title: pick(m.title, locale),
      description: pick(m.description, locale),
    }))
    .sort((a, b) => a.year - b.year);
}
