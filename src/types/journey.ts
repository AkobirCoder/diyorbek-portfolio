/**
 * journey.ts — vaqt chizig'i (Journey) bosqichi modeli (Blueprint §1, §8).
 * Har bosqich — bir yil, sarlavha va qisqa tavsif bilan.
 */

import type { Localized } from "./content";

export interface LocalizedMilestone {
  year: number;
  title: Localized<string>;
  description: Localized<string>;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}
