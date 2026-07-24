import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Wordmark — vaqtinchalik logotip (Blueprint §2 eslatmasi).
 * Unbounded Light, keng harf oralig'i. Ko'p premium brendlar aynan shunday
 * qiladi. Mobilda familiya yashiriladi. Belgi keyinroq qo'shilishi mumkin.
 */
export function Wordmark({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Diyorbek Zarifboyev — bosh sahifa"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150"
      />
      <span className="font-display text-[0.9375rem] font-light leading-none tracking-[0.02em] text-fg">
        Diyorbek
        <span className="hidden text-fg-muted sm:inline"> Zarifboyev</span>
      </span>
    </Link>
  );
}
