/**
 * tools.ts — Hero'da suzuvchi dastur ikonkalari (Blueprint §4).
 *
 * Ro'yxatni o'zgartirish uchun faqat shu massivni tahrirlang —
 * joylashuv, animatsiya va responsive mantiq avtomatik moslashadi.
 * `priority` — kichik ekranlarda ko'rsatish tartibi (1–4 mobilda ham ko'rinadi).
 *
 * Eslatma: intervyuda AI vositalari (Google Flow · Kling · Higgsfield) kelishilgan
 * edi; hozirgi ro'yxat mijozning keyingi ko'rsatmasi bo'yicha.
 */

export interface Tool {
  id: string;
  label: string;
  /** Brend rangi — ikonka ortidagi yumshoq nur uchun. */
  glow: string;
  /** Desktop joylashuvi (foizda). */
  pos: { x: number; y: number };
  /** Mobil joylashuvi — ekran tor bo'lgani uchun alohida xavfsiz zona. */
  posMobile: { x: number; y: number };
  /** Parallaks chuqurligi — kattaroq son = yaqinroq qatlam. */
  depth: number;
  /** Suzish davomiyligi (soniya) — har biri boshqacha, sinxronlik bo'lmasligi uchun. */
  float: number;
  /** Ko'rsatish ustuvorligi (1 = eng muhim). */
  priority: number;
}

/**
 * Joylashuvlar (foizda) — ataylab loyihalangan "xavfsiz zonalar":
 *   • Chap ikonkalar x ≤ 20%, o'ng ikonkalar x ≥ 80% — markaziy backdrop
 *     yozuvi ularni HECH QACHON qoplamaydi.
 *   • Vertikal jihatdan matn zonalaridan chetda (ism y≈15–34%, tavsif/raqamlar
 *     y≥70%) — mid-band (y 38–70%) da suzadi.
 */
export const tools: readonly Tool[] = [
  {
    id: "premiere",
    label: "Adobe Premiere Pro",
    glow: "#E97AFF",
    pos: { x: 15, y: 40 },
    posMobile: { x: 16, y: 34 },
    depth: 1,
    float: 7.5,
    priority: 1,
  },
  {
    id: "resolve",
    label: "DaVinci Resolve",
    glow: "#FF7A45",
    pos: { x: 85, y: 32 },
    posMobile: { x: 84, y: 30 },
    depth: 0.85,
    float: 8.5,
    priority: 2,
  },
  {
    id: "aftereffects",
    label: "Adobe After Effects",
    glow: "#9C9CFF",
    pos: { x: 11, y: 66 },
    posMobile: { x: 12, y: 46 },
    depth: 1.15,
    float: 6.5,
    priority: 3,
  },
  {
    id: "photoshop",
    label: "Adobe Photoshop",
    glow: "#31A8FF",
    pos: { x: 89, y: 50 },
    posMobile: { x: 88, y: 44 },
    depth: 1.05,
    float: 9,
    priority: 4,
  },
  {
    id: "lightroom",
    label: "Adobe Lightroom",
    glow: "#57C7FF",
    pos: { x: 84, y: 67 },
    posMobile: { x: 80, y: 58 },
    depth: 0.75,
    float: 7,
    priority: 5,
  },
  {
    id: "camera",
    label: "Cinema Camera",
    glow: "#FFB169",
    pos: { x: 17, y: 54 },
    posMobile: { x: 90, y: 70 },
    depth: 0.9,
    float: 8,
    priority: 6,
  },
];
