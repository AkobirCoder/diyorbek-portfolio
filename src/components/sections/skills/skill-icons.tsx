import type { SVGProps } from "react";

/**
 * skill-icons.tsx — 6 mahorat uchun chiziqli ikonkalar (Blueprint §4).
 * Savdo belgisisiz, `currentColor` bilan — brend rangiga moslashadi.
 * `skills.ts` ichidagi `icon` kaliti shu yerdagi kalitga mos keladi.
 */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

/** Kinematografiya — video kamera. */
function CameraIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="7" width="13" height="10" rx="2" />
      <path d="M15.5 10.5 21 7.5v9l-5.5-3z" />
    </svg>
  );
}

/** Rejissura — klapperbord. */
function DirectorIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="9" width="18" height="10" rx="1.5" />
      <path d="M3 9 20.5 5.8" />
      <path d="M7 9 8.8 5.7M11 8.3 12.8 5M15 7.6 16.8 4.3" />
    </svg>
  );
}

/** Montaj — timeline va playhead. */
function EditingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="18" height="3.5" rx="1" />
      <rect x="3" y="13.5" width="12" height="3.5" rx="1" />
      <path d="M8 4.5v15" />
    </svg>
  );
}

/** Rang berish — bir-birini qoplovchi ranglar. */
function ColorIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="10" r="4.6" />
      <circle cx="15" cy="10" r="4.6" />
      <circle cx="12" cy="15" r="4.6" />
    </svg>
  );
}

/** Ovoz va musiqa — to'lqin shakli. */
function SoundIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 11v2M7.5 8v8M12 5v14M16.5 9v6M21 10.5v3" />
    </svg>
  );
}

/** Grafika va animatsiya — qatlamlar. */
function MotionIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="9" width="11" height="11" rx="2" />
      <path d="M10 5.5h8a1.5 1.5 0 0 1 1.5 1.5v8" />
    </svg>
  );
}

export const skillIcons: Record<
  string,
  (props: IconProps) => React.JSX.Element
> = {
  camera: CameraIcon,
  director: DirectorIcon,
  editing: EditingIcon,
  color: ColorIcon,
  sound: SoundIcon,
  motion: MotionIcon,
};
