/**
 * services.ts — xizmatlar repozitoriysi. Tilga yechilgan xizmatlar ro'yxati.
 */

import type { Locale } from "@/content/site";
import { services as raw } from "@/content/services";
import type { Service } from "@/types/content";
import { pick } from "./resolve";

export function getServices(locale: Locale): Service[] {
  return raw.map((s) => ({
    key: s.key,
    label: pick(s.label, locale),
    description: pick(s.description, locale),
  }));
}
