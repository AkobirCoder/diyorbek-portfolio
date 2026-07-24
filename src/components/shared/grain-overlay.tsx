/**
 * GrainOverlay — butun sayt ustidagi kino donadorligi qatlami (Blueprint §5).
 * Raqamli tekislikni yo'qotib, plyonka hissini beradi. ~1KB SVG shovqin,
 * `mix-blend-mode: overlay`, `pointer-events: none`. Shaffoflik rejimga qarab
 * moslashadi (--grain-opacity: qorong'i 3%, yorug' 1.5%).
 *
 * Server Component — interaktivlik yo'q, JS qo'shmaydi.
 */

const GRAIN_URI =
  "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22160%22%20height%3D%22160%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.82%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3CfeColorMatrix%20type%3D%22saturate%22%20values%3D%220%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-layer"
      style={{
        backgroundImage: `url("${GRAIN_URI}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
