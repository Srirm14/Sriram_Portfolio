"use client";

import type { Mode } from "@/types";

export interface HeroBackgroundProps {
  mode: Mode;
  /** Premium pearl–gold ambient when developer + light mode */
  appearance?: "dark" | "light";
}

export function HeroBackground({ mode, appearance = "dark" }: HeroBackgroundProps) {
  if (mode === "developer" && appearance === "light") {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        {/* Base wash — white → warm gold */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(165deg,
                rgba(255, 253, 250, 0) 0%,
                rgba(248, 238, 220, 0.45) 45%,
                rgba(255, 252, 247, 0) 100%),
              radial-gradient(ellipse 80% 55% at 15% 20%,
                rgba(255, 248, 235, 0.9) 0%,
                transparent 55%),
              radial-gradient(ellipse 70% 50% at 85% 75%,
                rgba(232, 213, 180, 0.35) 0%,
                transparent 50%)
            `,
          }}
        />
        {/* Soft gold blooms */}
        <div
          className="absolute -top-10 -right-10 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-90"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.16) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-2xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,163,0.14) 0%, transparent 72%)",
          }}
        />
        {/* Diagonal reflection */}
        <div
          className="absolute -left-[20%] top-0 h-[120%] w-[55%] rotate-[12deg] opacity-[0.07]"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.95) 48%, transparent 52%)",
          }}
        />
        <div
          className="absolute -right-[10%] bottom-0 h-[90%] w-[40%] -rotate-[8deg] opacity-[0.05]"
          style={{
            background:
              "linear-gradient(-75deg, transparent 40%, rgba(201,168,76,0.25) 50%, transparent 60%)",
          }}
        />
      </div>
    );
  }

  if (mode === "developer") {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full pointer-events-none animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 rounded-full pointer-events-none animate-float-delayed"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,163,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Full canvas SVG background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Red radial glow */}
          <radialGradient id="bg-glow-1" cx="75%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>

          {/* Navy radial glow */}
          <radialGradient id="bg-glow-2" cx="20%" cy="80%" r="35%">
            <stop offset="0%" stopColor="#1d3557" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1d3557" stopOpacity="0" />
          </radialGradient>

          {/* Web line gradient */}
          <linearGradient id="web-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0" />
            <stop offset="50%" stopColor="#e63946" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="web-line-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0" />
            <stop offset="50%" stopColor="#e63946" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Glow blobs */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bg-glow-1)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bg-glow-2)" />

        {/* Spider web — radial lines from top right */}
        {[0, 18, 36, 54, 72, 90, 108, 126, 144].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 92;
          const cy = 8;
          const len = 120;
          const x2 = cx + len * Math.cos(rad + Math.PI);
          const y2 = cy + len * Math.sin(rad + Math.PI);
          return (
            <line
              key={i}
              x1={`${cx}%`}
              y1={`${cy}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#e63946"
              strokeWidth="0.5"
              opacity={0.04 + i * 0.005}
            />
          );
        })}

        {/* Web concentric arcs — top right origin */}
        {[15, 28, 42, 58, 75, 95].map((r, i) => (
          <circle
            key={i}
            cx="92%"
            cy="8%"
            r={`${r}%`}
            fill="none"
            stroke="#e63946"
            strokeWidth="0.5"
            opacity={0.04 + i * 0.008}
            strokeDasharray="4 8"
          />
        ))}

        {/* Horizontal scan lines — very subtle */}
        {[15, 30, 45, 60, 75].map((y, i) => (
          <line
            key={i}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="url(#web-line)"
            strokeWidth="0.4"
            opacity="0.4"
          />
        ))}

        {/* Vertical lines — left side */}
        {[8, 16, 24].map((x, i) => (
          <line
            key={i}
            x1={`${x}%`}
            y1="0%"
            x2={`${x}%`}
            y2="100%"
            stroke="url(#web-line-v)"
            strokeWidth="0.3"
            opacity="0.3"
          />
        ))}

        {/* Corner bracket — top left */}
        <path
          d="M 32 32 L 32 72 M 32 32 L 72 32"
          stroke="#e63946"
          strokeWidth="1.5"
          opacity="0.2"
          strokeLinecap="round"
        />

        {/* Corner bracket — bottom right */}
        <path
          d="M 96 96 L 96 56 M 96 96 L 56 96"
          stroke="#1d3557"
          strokeWidth="1.5"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Floating dot cluster — mid left */}
        {[
          [6, 35],
          [8, 42],
          [5, 48],
          [9, 38],
          [7, 52],
          [11, 44],
          [4, 55],
          [10, 32],
          [6, 58],
          [8, 28],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r="1"
            fill="#e63946"
            opacity={0.08 + i * 0.015}
          />
        ))}

        {/* Bold diagonal slash accent */}
        <line
          x1="0%"
          y1="100%"
          x2="25%"
          y2="0%"
          stroke="#1d3557"
          strokeWidth="40"
          opacity="0.06"
        />
        <line
          x1="0%"
          y1="100%"
          x2="20%"
          y2="0%"
          stroke="#e63946"
          strokeWidth="1"
          opacity="0.08"
        />

        {/* Small cross marks */}
        {[
          [15, 20],
          [80, 60],
          [35, 75],
          [65, 15],
          [50, 85],
        ].map(([x, y], i) => (
          <g key={i} opacity={0.12 + i * 0.02}>
            <line
              x1={`${x - 0.8}%`}
              y1={`${y}%`}
              x2={`${x + 0.8}%`}
              y2={`${y}%`}
              stroke="#e63946"
              strokeWidth="1"
            />
            <line
              x1={`${x}%`}
              y1={`${y - 1.2}%`}
              x2={`${x}%`}
              y2={`${y + 1.2}%`}
              stroke="#e63946"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Animated scan pulse */}
        <line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#web-line)"
          strokeWidth="1"
          opacity="0.15"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,-50;0,50;0,-50"
            dur="8s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      {/* Subtle red vignette corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 100% 0%,
              rgba(230,57,70,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 100%,
              rgba(29,53,87,0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
