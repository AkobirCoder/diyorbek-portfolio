/**
 * tool-icons.tsx — Hero ikonkalari uchun SVG belgilar.
 *
 * Har biri o'z SVG'imiz sifatida chizilgan (tashqi fayl yoki so'rov yo'q):
 * shisha plitka ichida turadigan "dastur nishoni". Adobe oilasi tanish
 * ikki-harfli nishon shaklida, Resolve — rang g'ildiragi, Camera — kino
 * kamerasi glifi.
 */

type IconProps = { className?: string };

/** Adobe uslubidagi ikki harfli nishon. */
function LetterBadge({
  letters,
  bg,
  fg,
  className,
}: {
  letters: string;
  bg: string;
  fg: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${letters}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bg} stopOpacity="1" />
          <stop offset="100%" stopColor={bg} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="11"
        fill={`url(#bg-${letters})`}
      />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="10.5"
        fill="none"
        stroke={fg}
        strokeOpacity="0.28"
      />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill={fg}
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="19"
        fontWeight="500"
        letterSpacing="-0.5"
      >
        {letters}
      </text>
    </svg>
  );
}

export function PremiereIcon({ className }: IconProps) {
  return <LetterBadge letters="Pr" bg="#2A0A3C" fg="#E97AFF" className={className} />;
}

export function AfterEffectsIcon({ className }: IconProps) {
  return <LetterBadge letters="Ae" bg="#130244" fg="#9C9CFF" className={className} />;
}

export function PhotoshopIcon({ className }: IconProps) {
  return <LetterBadge letters="Ps" bg="#001E36" fg="#31A8FF" className={className} />;
}

export function LightroomIcon({ className }: IconProps) {
  return <LetterBadge letters="Lr" bg="#001B2E" fg="#57C7FF" className={className} />;
}

/** DaVinci Resolve — rang g'ildiragi. */
export function ResolveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="11" fill="#141418" />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="10.5"
        fill="none"
        stroke="#FF7A45"
        strokeOpacity="0.25"
      />
      <g opacity="0.95">
        <circle cx="19.5" cy="20" r="8.5" fill="#FF5C33" fillOpacity="0.85" />
        <circle cx="28.5" cy="20" r="8.5" fill="#3B82F6" fillOpacity="0.75" />
        <circle cx="24" cy="28.5" r="8.5" fill="#F5A524" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/** Kino kamerasi — hunarning o'zi. */
export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="11" fill="#16110C" />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="10.5"
        fill="none"
        stroke="#FFB169"
        strokeOpacity="0.25"
      />
      <g
        fill="none"
        stroke="#FFC48F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 18.5h16.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
        <path d="m29.5 24.5 6.5-4v11l-6.5-4" />
        <circle cx="16" cy="14.5" r="2.6" />
        <circle cx="23" cy="14.5" r="2.6" />
      </g>
    </svg>
  );
}

export const toolIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  premiere: PremiereIcon,
  aftereffects: AfterEffectsIcon,
  photoshop: PhotoshopIcon,
  lightroom: LightroomIcon,
  resolve: ResolveIcon,
  camera: CameraIcon,
};
