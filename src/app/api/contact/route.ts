import { NextResponse } from "next/server";
import { briefSchema } from "@/lib/validation";
import { sendTelegramBrief } from "@/lib/telegram";
import { sendBriefEmail } from "@/lib/email";

/**
 * POST /api/contact — brifni qabul qiladi, tekshiradi va yetkazadi
 * (Telegram bot + Resend pochta) (Blueprint §3, §9).
 * Ikkalasidan biri muvaffaqiyatli bo'lsa — OK. Hech biri sozlanmagan/muvaffaqiyatsiz
 * bo'lsa — 502 (mijoz to'g'ridan-to'g'ri aloqa kanallarini ko'rsatadi).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const { name, email, projectType, message, company } = parsed.data;

  // Honeypot to'ldirilgan — bot. Muvaffaqiyat qaytaramiz, lekin yubormaymiz.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const payload = { name, email, projectType: projectType || undefined, message };

  const [telegram, mail] = await Promise.allSettled([
    sendTelegramBrief(payload),
    sendBriefEmail(payload),
  ]);

  const delivered =
    (telegram.status === "fulfilled" && telegram.value) ||
    (mail.status === "fulfilled" && mail.value);

  if (!delivered) {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
