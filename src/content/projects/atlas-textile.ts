/** QORALAMA loyiha — haqiqiy nom·mijoz·yil·Telegram havolasi keyin almashtiriladi. */
import type { LocalizedProject } from "@/types/project";

export const atlasTextile: LocalizedProject = {
  slug: "atlas-textile",
  client: "Atlas Textile",
  category: "brand",
  format: "16:9",
  year: 2024,
  cover: "/work/atlas-textile/cover.jpg",
  telegramUrl: "https://t.me/dicouz/101",
  featured: true,
  title: {
    uz: "To'qimadagi harakat",
    ru: "Движение в ткани",
    en: "Motion in fabric",
  },
  teaser: {
    uz: "Milliy to'qimachilik brendi uchun ishlab chiqarishdan podiumgacha bo'lgan brend filmi.",
    ru: "Бренд-фильм о национальном текстиле — от производства до подиума.",
    en: "A brand film for a national textile house — from the loom to the runway.",
  },
  caseStudy: {
    intro: {
      uz: "Atlas Textile an'anaviy matoni zamonaviy auditoriyaga tanishtirmoqchi edi. Vazifa — hunarmandchilikni sovuq sanoat emas, iliq meros sifatida ko'rsatish.",
      ru: "Atlas Textile хотели показать традиционную ткань современной аудитории. Задача — представить ремесло как тёплое наследие, а не холодную индустрию.",
      en: "Atlas Textile wanted to introduce a traditional fabric to a modern audience. The task was to frame the craft as warm heritage, not cold industry.",
    },
    approach: {
      uz: "Makro kadrlar va sekin kamera harakati bilan mato tolasini his qildirdik; rangda iliq oltin tonlar tanlandi. Ovoz — jonli dastgoh sadolari.",
      ru: "Макрокадры и медленное движение камеры передают волокно ткани; в цвете выбраны тёплые золотые тона. Звук — живой стук станка.",
      en: "Macro shots and slow camera moves let you feel the thread; the grade leans into warm gold. Sound is the live rhythm of the loom.",
    },
  },
  gallery: [
    {
      src: "/work/atlas-textile/01.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Dastgohda mato to'qish", ru: "Ткачество на станке", en: "Weaving on the loom" },
    },
    {
      src: "/work/atlas-textile/02.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Mato makro detali", ru: "Макродеталь ткани", en: "Fabric macro detail" },
    },
  ],
};
