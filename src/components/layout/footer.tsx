import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { navSections } from "@/content/navigation";
import { site } from "@/content/site";
import { NavLink } from "./nav-link";
import { BackToTop } from "./back-to-top";

const socialLinks = [
  { label: "Instagram", href: site.social.instagram.url },
  { label: "Telegram", href: site.social.telegram.url },
] as const;

/**
 * Footer — sayt oyog'i (Blueprint §4). Bo'lim havolalari, aloqa va ijtimoiy.
 * Server Component; faqat BackToTop va NavLink kichik client orollari.
 */
export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <Container className="flex flex-col gap-16 py-16 md:py-20">
        {/* Yuqori qism: shior + navigatsiya ustunlari */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4 md:max-w-xs">
            <span className="font-display text-h2 font-light text-fg">
              {site.name}
            </span>
            <p className="text-body text-fg-muted">{t("footer.tagline")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* Bo'limlar */}
            <nav aria-label={t("footer.navTitle")} className="flex flex-col gap-4">
              <h2 className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                {t("footer.navTitle")}
              </h2>
              <ul className="flex flex-col gap-3">
                {navSections.map((section) => (
                  <li key={section.id}>
                    <NavLink id={section.id}>{t(`nav.${section.key}`)}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bog'lanish */}
            <div className="flex flex-col gap-4">
              <h2 className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                {t("footer.contactTitle")}
              </h2>
              <ul className="flex flex-col gap-3 text-body text-fg-muted">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.contact.phone}
                  </a>
                </li>
              </ul>
            </div>

            {/* Ijtimoiy */}
            <div className="flex flex-col gap-4">
              <h2 className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                {t("footer.socialTitle")}
              </h2>
              <ul className="flex flex-col gap-3 text-body text-fg-muted">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pastki chiziq */}
        <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
            © {year} {site.name} · {t("footer.madeIn")}
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
