/**
 * projects/index.ts — 10 loyihaning yagona ro'yxati (namoyish tartibida).
 *
 * Har loyiha alohida faylda (CMS yozuvi analogi) — yangi loyiha qo'shish
 * uchun fayl yaratib, shu massivga import qo'shiladi. Repozitoriy qatlami
 * (`lib/content/projects.ts`) shu ro'yxatni o'qiydi va tilga yechadi.
 */

import type { LocalizedProject } from "@/types/project";
import { atlasTextile } from "./atlas-textile";
import { silkRoadFashion } from "./silk-road-fashion";
import { zaminCoffee } from "./zamin-coffee";
import { osiyoBank } from "./osiyo-bank";
import { oydinBeauty } from "./oydin-beauty";
import { qadamSneakers } from "./qadam-sneakers";
import { nurRestaurant } from "./nur-restaurant";
import { bahorCosmetics } from "./bahor-cosmetics";
import { technoPark } from "./techno-park";
import { tashkentFashionWeek } from "./tashkent-fashion-week";

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
