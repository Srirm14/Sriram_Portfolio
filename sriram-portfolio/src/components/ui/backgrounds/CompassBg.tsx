"use client";

import { useId, useMemo } from "react";

interface CompassBgProps {
  accentColor?: string;
  opacity?: number;
}

const VB_W = 1200;
const VB_H = 900;
const ORIGIN_X = 1200;
const ORIGIN_Y = 450;
const SPOKE_LEN = 1100;

export function CompassBg({
  accentColor = "var(--theme-primary, #c9a84c)",
  opacity = 1,
}: CompassBgProps) {
  const uid = useId().replace(/:/g, "");
  const fadeId = `cmp-fade-v-${uid}`;
  const maskId = `cmp-mask-${uid}`;

  const spokes = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => {
      const deg = 150 + i * 7.5;
      const rad = (deg * Math.PI) / 180;
      const x2 = ORIGIN_X + SPOKE_LEN * Math.cos(rad);
      const y2 = ORIGIN_Y + SPOKE_LEN * Math.sin(rad);
      const op = 0.05 + (i === 4 ? 0.04 : 0);
      return { x2, y2, opacity: op, i };
    });
  }, []);

  return (
    <div
      data-bg="compass"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 h-full min-h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
      >
        <defs>
          <linearGradient
            id={fadeId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={VB_H}
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="10%" stopColor="#fff" stopOpacity="1" />
            <stop offset="90%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VB_W} height={VB_H}>
            <rect width={VB_W} height={VB_H} fill={`url(#${fadeId})`} />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {spokes.map(({ x2, y2, opacity: op, i }) => (
            <line
              key={`spoke-${i}`}
              x1={ORIGIN_X}
              y1={ORIGIN_Y}
              x2={x2}
              y2={y2}
              stroke={accentColor}
              strokeWidth={i === 4 ? 0.6 : 0.4}
              opacity={op}
            />
          ))}

          {[160, 300, 460, 640, 840, 1060].map((r, i) => (
            <circle
              key={`arc-${i}`}
              cx={ORIGIN_X}
              cy={ORIGIN_Y}
              r={r}
              fill="none"
              stroke={accentColor}
              strokeWidth={0.4}
              opacity={0.05 + (i === 0 ? 0.03 : 0)}
              strokeDasharray={i % 2 === 0 ? "4 12" : "2 16"}
            />
          ))}

          <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={3} fill={accentColor} opacity={0.2} />
          <circle
            cx={ORIGIN_X}
            cy={ORIGIN_Y}
            r={6}
            fill="none"
            stroke={accentColor}
            strokeWidth={0.5}
            opacity={0.12}
          />

          <circle
            cx={ORIGIN_X}
            cy={ORIGIN_Y}
            r={1060}
            fill="none"
            stroke={accentColor}
            strokeWidth={0.5}
            opacity={0.04}
            strokeDasharray="8 40"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 ${ORIGIN_X} ${ORIGIN_Y};360 ${ORIGIN_X} ${ORIGIN_Y}`}
              dur="60s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx={ORIGIN_X}
            cy={ORIGIN_Y}
            r={460}
            fill="none"
            stroke={accentColor}
            strokeWidth={0.4}
            opacity={0.06}
            strokeDasharray="3 20"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 ${ORIGIN_X} ${ORIGIN_Y};-360 ${ORIGIN_X} ${ORIGIN_Y}`}
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>

          <path d="M 48,180 L 48,720" stroke={accentColor} strokeWidth={0.4} opacity={0.1} />
          {[240, 360, 480, 600].map((y, i) => (
            <line
              key={`tick-${i}`}
              x1={40}
              y1={y}
              x2={56}
              y2={y}
              stroke={accentColor}
              strokeWidth={0.4}
              opacity={0.1}
            />
          ))}
          {[180, 360, 540, 720].map((y, i) => (
            <circle key={`pad-${i}`} cx={48} cy={y} r={2} fill={accentColor} opacity={0.15} />
          ))}

          <path
            d="M 20,24 L 20,56 M 20,24 L 52,24"
            stroke={accentColor}
            strokeWidth={0.5}
            opacity={0.15}
          />
          <path
            d="M 20,876 L 20,844 M 20,876 L 52,876"
            stroke={accentColor}
            strokeWidth={0.5}
            opacity={0.1}
          />
        </g>
      </svg>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16"
        style={{
          background:
            "linear-gradient(to bottom, var(--dev-section-fade, var(--theme-bg, #0a0a0f)), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16"
        style={{
          background:
            "linear-gradient(to top, var(--dev-section-fade, var(--theme-bg, #0a0a0f)), transparent)",
        }}
      />
    </div>
  );
}
