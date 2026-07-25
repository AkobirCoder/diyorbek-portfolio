import { site } from "@/content/site";

/**
 * ContactChannels — to'g'ridan-to'g'ri aloqa kanallari (Blueprint §4).
 * Shakl ishlamasa ham foydalanuvchi bevosita bog'lana oladi.
 */
const channels = [
  {
    label: "Telegram",
    value: site.social.telegram.handle,
    href: site.social.telegram.url,
  },
  {
    label: "Instagram",
    value: site.social.instagram.handle,
    href: site.social.instagram.url,
  },
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    label: "Telefon",
    value: site.contact.phone,
    href: `tel:${site.contact.phoneHref}`,
  },
];

export function ContactChannels({ title }: { title?: string }) {
  return (
    <div className="flex flex-col gap-5">
      {title ? (
        <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
          {title}
        </span>
      ) : null}
      <ul className="grid gap-px overflow-hidden rounded-glass border border-border bg-border">
        {channels.map((channel) => {
          const external = channel.href.startsWith("http");
          return (
            <li key={channel.label}>
              <a
                href={channel.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 bg-bg px-6 py-5 transition-colors duration-[240ms] hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                  {channel.label}
                </span>
                <span className="text-body text-fg transition-colors group-hover:text-accent">
                  {channel.value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
