import { useTranslations } from "next-intl";

/**
 * SkipLink — klaviatura foydalanuvchilari uchun "asosiy kontentga o'tish"
 * (Blueprint §10). Odatda yashirin, Tab bosilganda ekran tepasida paydo bo'ladi.
 */
export function SkipLink() {
  const t = useTranslations("a11y");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-mono focus:text-label focus:uppercase focus:tracking-[0.14em] focus:text-on-accent focus:outline-none"
    >
      {t("skipToContent")}
    </a>
  );
}
