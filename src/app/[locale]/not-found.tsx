import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/**
 * 404 — topilmagan sahifa. Layout (Header/Footer) ichida render bo'ladi.
 */
export default function NotFound() {
  const t = useTranslations();

  return (
    <Container className="flex min-h-[70vh] flex-col justify-center gap-6 py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-display-2 text-fg">Sahifa topilmadi.</h1>
      <p className="max-w-[46ch] text-body-lg text-fg-muted">
        Bu manzil mavjud emas yoki ko'chirilgan. Bosh sahifaga qaytishingiz mumkin.
      </p>
      <div className="mt-2">
        <Button asChild variant="primary" size="lg">
          <Link href="/">{t("a11y.home")}</Link>
        </Button>
      </div>
    </Container>
  );
}
