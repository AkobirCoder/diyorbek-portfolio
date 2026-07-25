/** QORALAMA loyiha — haqiqiy nom·mijoz·yil·Telegram havolasi keyin almashtiriladi. */
import type { LocalizedProject } from "@/types/project";

export const silkRoadFashion: LocalizedProject = {
  slug: "silk-road-fashion",
  client: "Silk Road Atelier",
  category: "fashion",
  format: "16:9",
  year: 2025,
  cover: "/work/woman-in-traditional-uzbek-attire/woman-in-traditional-uzbek-attire.jpeg",
  telegramUrl: "https://t.me/dicouz/105",
  featured: true,
  title: {
    uz: "Ipak yo'li",
    ru: "Шёлковый путь",
    en: "Silk road",
  },
  teaser: {
    uz: "Kolleksiya taqdimoti uchun kinematik moda filmi — mato, harakat va soya.",
    ru: "Кинематографичный fashion-фильм для показа коллекции — ткань, движение и тень.",
    en: "A cinematic fashion film for a collection launch — fabric, movement and shadow.",
  },
  caseStudy: {
    intro: {
      uz: "Silk Road Atelier yangi kolleksiyani an'ana va zamonaviylik chegarasida ko'rsatmoqchi edi.",
      ru: "Silk Road Atelier хотели показать новую коллекцию на грани традиции и современности.",
      en: "Silk Road Atelier wanted to present a new collection on the edge of tradition and modernity.",
    },
    approach: {
      uz: "Sekin kamera va tabiiy shamol matoni jonlantirdi; rangda sovuq soya va iliq teri toni qarama-qarshiligi.",
      ru: "Медленная камера и естественный ветер оживили ткань; в цвете — контраст холодной тени и тёплого тона кожи.",
      en: "Slow camera and natural wind brought the fabric alive; the grade contrasts cool shadow with warm skin.",
    },
  },
  gallery: [
    {
      src: "/work/silk-road-fashion/01.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Model harakatda", ru: "Модель в движении", en: "Model in motion" },
    },
    {
      src: "/work/silk-road-fashion/02.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Mato detali", ru: "Деталь ткани", en: "Fabric detail" },
    },
  ],
};
