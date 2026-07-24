/**
 * telegram.ts — brifni Telegram botiga yuboradi (Blueprint §3, §9).
 * Paket kerak emas — to'g'ridan-to'g'ri Bot API'ga `fetch`.
 * `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` yo'q bo'lsa — jimgina `false`.
 */

/** HTML parse_mode uchun xavfsiz belgilarni ekranlash. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export interface BriefPayload {
  name: string;
  email: string;
  projectType?: string;
  message: string;
}

export async function sendTelegramBrief(brief: BriefPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    "<b>🎬 Yangi brif</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(brief.name)}`,
    `<b>Email:</b> ${escapeHtml(brief.email)}`,
    brief.projectType ? `<b>Tur:</b> ${escapeHtml(brief.projectType)}` : null,
    "",
    escapeHtml(brief.message),
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}
