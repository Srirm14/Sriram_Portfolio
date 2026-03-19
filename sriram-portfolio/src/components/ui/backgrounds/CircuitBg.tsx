"use client";

import { useId } from "react";

interface CircuitBgProps {
  accentColor?: string;
  opacity?: number;
}

const VB_W = 1200;
const VB_H = 900;

export function CircuitBg({
  accentColor = "var(--theme-primary, #c9a84c)",
  opacity = 1,
}: CircuitBgProps) {
  const uid = useId().replace(/:/g, "");
  const fadeId = `ckt-fade-v-${uid}`;
  const maskId = `ckt-mask-${uid}`;

  return (
    <div
      data-bg="circuit"
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
          <g stroke={accentColor} fill="none">
            <path d="M 60,0 L 60,900" strokeWidth={0.5} opacity={0.12} />
            <path
              d="M 110,80 L 110,420 L 140,420 L 140,520 L 110,520 L 110,820"
              strokeWidth={0.4}
              opacity={0.1}
            />
            <path d="M 60,120 L 110,120" strokeWidth={0.4} opacity={0.12} />
            <path d="M 60,200 L 30,200 L 30,240 L 60,240" strokeWidth={0.4} opacity={0.1} />
            <path d="M 60,320 L 110,320" strokeWidth={0.4} opacity={0.1} />
            <path d="M 60,440 L 20,440" strokeWidth={0.4} opacity={0.08} />
            <path d="M 60,560 L 110,560" strokeWidth={0.4} opacity={0.1} />
            <path d="M 60,680 L 30,680 L 30,720 L 60,720" strokeWidth={0.4} opacity={0.09} />
            <path d="M 60,800 L 110,800" strokeWidth={0.4} opacity={0.09} />
            <path d="M 110,660 L 160,660 L 160,700 L 110,700" strokeWidth={0.35} opacity={0.08} />

            <path d="M 20,100 L 20,360 L 40,360" strokeWidth={0.3} opacity={0.07} />

            <path d="M 1140,0 L 1140,900" strokeWidth={0.5} opacity={0.12} />
            <path
              d="M 1090,60 L 1090,380 L 1060,380 L 1060,480 L 1090,480 L 1090,840"
              strokeWidth={0.4}
              opacity={0.1}
            />
            <path d="M 1140,140 L 1090,140" strokeWidth={0.4} opacity={0.12} />
            <path d="M 1140,260 L 1170,260 L 1170,300 L 1140,300" strokeWidth={0.4} opacity={0.1} />
            <path d="M 1140,380 L 1090,380" strokeWidth={0.4} opacity={0.1} />
            <path d="M 1140,500 L 1180,500" strokeWidth={0.4} opacity={0.08} />
            <path d="M 1140,620 L 1090,620" strokeWidth={0.4} opacity={0.1} />
            <path d="M 1140,740 L 1170,740 L 1170,780 L 1140,780" strokeWidth={0.4} opacity={0.09} />
            <path d="M 1090,260 L 1040,260 L 1040,300 L 1090,300" strokeWidth={0.35} opacity={0.08} />

            <path d="M 1180,200 L 1180,500 L 1160,500" strokeWidth={0.3} opacity={0.07} />
          </g>

          {[120, 200, 240, 320, 440, 560, 680, 720, 800].map((y, i) => (
            <circle
              key={`lp-${i}`}
              cx={60}
              cy={y}
              r={2.5}
              fill={accentColor}
              stroke="none"
              opacity={0.18}
            />
          ))}
          {[120, 320, 560, 800].map((y, i) => (
            <circle key={`lp2-${i}`} cx={110} cy={y} r={2} fill={accentColor} stroke="none" opacity={0.14} />
          ))}
          <circle cx={30} cy={220} r={2} fill={accentColor} stroke="none" opacity={0.12} />
          <circle cx={30} cy={700} r={2} fill={accentColor} stroke="none" opacity={0.1} />
          <circle cx={20} cy={100} r={1.5} fill={accentColor} stroke="none" opacity={0.1} />
          <circle cx={20} cy={360} r={1.5} fill={accentColor} stroke="none" opacity={0.1} />

          {[140, 260, 300, 380, 500, 620, 740, 780].map((y, i) => (
            <circle
              key={`rp-${i}`}
              cx={1140}
              cy={y}
              r={2.5}
              fill={accentColor}
              stroke="none"
              opacity={0.18}
            />
          ))}
          {[140, 380, 620].map((y, i) => (
            <circle key={`rp2-${i}`} cx={1090} cy={y} r={2} fill={accentColor} stroke="none" opacity={0.14} />
          ))}
          <circle cx={1170} cy={280} r={2} fill={accentColor} stroke="none" opacity={0.12} />
          <circle cx={1170} cy={760} r={2} fill={accentColor} stroke="none" opacity={0.1} />
          <circle cx={1180} cy={200} r={1.5} fill={accentColor} stroke="none" opacity={0.1} />
        </g>

        <circle r={3} fill={accentColor} opacity={0}>
          <animateMotion dur="10s" repeatCount="indefinite" path="M 60,0 L 60,900" />
          <animate
            attributeName="opacity"
            values="0;0.35;0.35;0"
            keyTimes="0;0.05;0.92;1"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r={2.5} fill={accentColor} opacity={0}>
          <animateMotion dur="14s" repeatCount="indefinite" begin="5s" path="M 1140,900 L 1140,0" />
          <animate
            attributeName="opacity"
            values="0;0.28;0.28;0"
            keyTimes="0;0.05;0.92;1"
            dur="14s"
            repeatCount="indefinite"
            begin="5s"
          />
        </circle>
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
