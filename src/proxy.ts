import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Til aniqlash proxy'si (Next 16 `middleware` → `proxy`).
 * Brauzer tilini o'qib mos yo'lga yo'naltiradi, lekin asosiy tilni (uz)
 * majburlamaydi — foydalanuvchi tanlovi ustun.
 */
export default createMiddleware(routing);

export const config = {
  // API, statik fayllar va ichki yo'llardan tashqari hammasini qamrab oladi.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
