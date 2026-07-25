/**
 * projects/index.ts — 10 loyihaning yagona ro'yxati (namoyish tartibida).
 *
 * Har loyiha alohida faylda (CMS yozuvi analogi) — yangi loyiha qo'shish
 * uchun fayl yaratib, shu massivga import qo'shiladi. Repozitoriy qatlami
 * (`lib/content/projects.ts`) shu ro'yxatni o'qiydi va tilga yechadi.
 */

import type { LocalizedProject } from "@/types/project";
import { atlasTextile } from "./cinematic-edit-fashion";
import { silkRoadFashion } from "./woman-in-traditional-uzbek-attire";
import { zaminCoffee } from "./before-after";
import { osiyoBank } from "./girl-standing-still-facing-camera";
import { oydinBeauty } from "./fashion-and-edit";
import { qadamSneakers } from "./ozi-hech-bir";
import { nurRestaurant } from "./the-power-of-color-grading";
import { bahorCosmetics } from "./fashion-motion";
import { technoPark } from "./khiva";
import { tashkentFashionWeek } from "./frontend-ozi-nima";

export const projects: readonly LocalizedProject[] = [
  atlasTextile,
  silkRoadFashion,
  zaminCoffee,
  osiyoBank,
  oydinBeauty,
  qadamSneakers,
  nurRestaurant,
  bahorCosmetics,
  technoPark,
  tashkentFashionWeek,
];
