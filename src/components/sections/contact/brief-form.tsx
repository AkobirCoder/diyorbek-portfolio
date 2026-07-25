"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PROJECT_TYPES } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FieldError = Partial<Record<"name" | "email" | "message", string>>;
type ToastState = { type: "success" | "error"; message: string } | null;

const inputBase =
  "w-full rounded-card border border-border bg-surface/50 px-4 py-3 text-body text-fg placeholder:text-fg-subtle transition-colors duration-[240ms] focus-visible:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * BriefForm — aloqa brif shakli (Blueprint §9).
 * Yengil mijoz validatsiyasi (server zod bilan qayta tekshiradi) · honeypot ·
 * yuborish holati · aria-live toast. Muvaffaqiyatda shakl tozalanadi.
 */
export function BriefForm() {
  const t = useTranslations("brief");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function flash(type: "success" | "error", message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), 6000);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      projectType: String(fd.get("projectType") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      company: String(fd.get("company") ?? ""), // honeypot
    };

    const nextErrors: FieldError = {};
    if (values.name.length < 2) nextErrors.name = t("errName");
    if (!EMAIL_RE.test(values.email)) nextErrors.email = t("errEmail");
    if (values.message.length < 10) nextErrors.message = t("errMessage");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        form.reset();
        setErrors({});
        flash("success", t("success"));
      } else {
        flash("error", t("error"));
      }
    } catch {
      flash("error", t("error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("name")} error={errors.name} htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputBase}
            />
          </Field>
          <Field label={t("email")} error={errors.email} htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputBase}
            />
          </Field>
        </div>

        <Field label={t("projectType")} htmlFor="projectType">
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              className={cn(inputBase, "cursor-pointer appearance-none pr-11")}
            >
              <option value="">{t("projectTypePlaceholder")}</option>
              {PROJECT_TYPES.map((key) => (
                <option key={key} value={key}>
                  {t(`projectTypeOptions.${key}`)}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>

        <Field label={t("message")} error={errors.message} htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputBase, "resize-y min-h-32")}
          />
        </Field>

        {/* Honeypot — ko'rinmas, odam to'ldirmaydi */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input name="company" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="mt-1">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? t("submitting") : t("submit")}
          </Button>
        </div>
      </form>

      {toast ? (
        <div
          role={toast.type === "error" ? "alert" : "status"}
          aria-live={toast.type === "error" ? "assertive" : "polite"}
          className="toast-rise glass-2 elev-3 fixed bottom-6 left-1/2 z-[110] flex max-w-[92vw] -translate-x-1/2 items-center gap-3 rounded-glass border border-border px-5 py-4 sm:max-w-md"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full"
            style={{
              background: toast.type === "success" ? "var(--accent)" : "#e5484d",
            }}
          />
          <p className="text-body text-fg">{toast.message}</p>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-label uppercase tracking-[0.14em] text-fg-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <span id={`${htmlFor}-error`} role="alert" className="text-label text-[#ff8080]">
          {error}
        </span>
      ) : null}
    </div>
  );
}
