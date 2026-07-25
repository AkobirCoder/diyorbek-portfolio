import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site, type Locale } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { JsonLd } from "@/components/shared/json-ld";
import { SkipLink } from "@/components/layout/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo/json-ld";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("homeTitle"),
      template: `%s | ${site.name}`,
    },
    description: t("homeDescription"),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070c" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ed" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const activeLocale = locale as Locale;

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Flash'siz tema — React'dan oldin data-theme o'rnatiladi */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body>
        {/* Sayt bo'ylab strukturaviy ma'lumot (Blueprint §11) */}
        <JsonLd
          data={[
            personJsonLd(),
            professionalServiceJsonLd(activeLocale),
            websiteJsonLd(activeLocale),
          ]}
        />
        <NextIntlClientProvider>
          <ThemeProvider>
            <MotionProvider>
              <SmoothScroll>
                <SkipLink />
                <Header />
                <main id="main">{children}</main>
                <Footer />
                <GrainOverlay />
              </SmoothScroll>
            </MotionProvider>
          </ThemeProvider>
          {/* Vercel Analytics — cookie'siz, ~1KB (Blueprint §12) */}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
