/**
 * email.ts — brifni Resend orqali pochtaga yuboradi (Blueprint §3, §9).
 * Paket kerak emas — Resend REST API'ga to'g'ridan-to'g'ri `fetch`.
 * `RESEND_API_KEY` va `CONTACT_FROM` yo'q bo'lsa — jimgina `false`.
 */

import { site } from "@/content/site";
import type { BriefPayload } from "./telegram";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendBriefEmail(brief: BriefPayload): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  if (!key || !from) return false;

  const rows: Array<[string, string]> = [
    ["Ism", brief.name],
    ["Email", brief.email],
  ];
  if (brief.projectType) rows.push(["Tur", brief.projectType]);

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#0A0D14;max-width:560px">
      <h2 style="font-weight:600">Yangi brif — ${escapeHtml(brief.name)}</h2>
      <table style="border-collapse:collapse;margin:16px 0">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#5A6070">${k}</td><td style="padding:4px 0"><b>${escapeHtml(v)}</b></td></tr>`,
          )
          .join("")}
      </table>
      <p style="white-space:pre-line;line-height:1.6">${escapeHtml(brief.message)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: brief.email,
        subject: `Yangi brif — ${brief.name}`,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
