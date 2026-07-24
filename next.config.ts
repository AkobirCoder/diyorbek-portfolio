import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF birinchi, WebP zaxira — Performance Strategy (12-bo'lim)
    formats: ["image/avif", "image/webp"],
    // Telegram muqovalari va tashqi rasm manbalari keyingi bosqichlarda qo'shiladi.
    remotePatterns: [],
  },
  // Eslatma: `optimizePackageImports` motion o'rnatilgach (3-bosqich) qo'shiladi.
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
