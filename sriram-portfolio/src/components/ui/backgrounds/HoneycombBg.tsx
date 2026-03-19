"use client";

import { useId, useMemo } from "react";

interface HoneycombBgProps {
  accentColor?: string;
  opacity?: number;
}

function hexPathFlat(cx: number, cy: number, r: number): string {
  const parts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (30 + i * 60);
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${parts.join(" ")} Z`;
}

export function HoneycombBg({
  accentColor = "var(--theme-primary, #c9a84c)",
  opacity = 1,
}: HoneycombBgProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const fadeId = `hex-fade-${uid}`;
  const maskId = `hex-mask-${uid}`;

  const R = 15;
  const pitchX = Math.sqrt(3) * R;
  const pitchY = 1.5 * R;
  const cols = 18;
  const rows = 14;

  const { hexes, width, height } = useMemo(() => {
    const list: { cx: number; cy: number; highlight: boolean; key: string }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row * cols + col) % 3 !== 0) continue;
        const cx = col * pitchX + (row % 2) * (pitchX / 2);
        const cy = row * pitchY;
        const highlight = (row * 7 + col * 3) % 19 === 0;
        list.push({ cx, cy, highlight, key: `h-${row}-${col}` });
      }
    }
    const width = cols * pitchX + pitchX;
    const height = rows * pitchY + pitchY;
    return { hexes: list, width, height };
  }, [cols, pitchX, pitchY, rows]);

  const firstPulse = hexes.find((h) => h.highlight);

  return (
    <div
      data-bg="honeycomb"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
      style={{ opacity }}
    >
      {/* Vignette under SVG so hex lines stay visible (was z-[1] on top and hid geometry in light) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 dev-abstract-vignette"
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full min-h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id={fadeId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={height}
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="15%" stopColor="#fff" stopOpacity="1" />
            <stop offset="85%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <rect width={width} height={height} fill={`url(#${fadeId})`} />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {hexes.map(({ cx, cy, highlight, key }) => (
            <path
              key={key}
              d={hexPathFlat(cx, cy, R - 1)}
              fill={highlight ? accentColor : "none"}
              fillOpacity={highlight ? 0.1 : undefined}
              stroke={accentColor}
              strokeWidth={highlight ? 0.55 : 0.28}
              opacity={highlight ? 0.18 : 0.07}
            />
          ))}

          {firstPulse ? (
            <path
              key="pulse"
              d={hexPathFlat(firstPulse.cx, firstPulse.cy, R - 1)}
              fill="none"
              stroke={accentColor}
              strokeWidth={0.8}
              opacity={0.3}
            >
              <animate
                attributeName="opacity"
                values="0.12;0.38;0.12"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="0.45;1;0.45"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          ) : null}
        </g>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 z-[1] dev-abstract-vignette"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24"
        style={{
          background:
            "linear-gradient(to bottom, var(--dev-section-fade, var(--theme-bg, #0a0a0f)), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24"
        style={{
          background:
            "linear-gradient(to top, var(--dev-section-fade, var(--theme-bg, #0a0a0f)), transparent)",
        }}
      />
    </div>
  );
}
