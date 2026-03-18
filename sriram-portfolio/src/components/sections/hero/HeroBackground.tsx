"use client";

import type { Mode } from "@/types";

export interface HeroBackgroundProps {
  mode: Mode;
}

export function HeroBackground({ mode }: HeroBackgroundProps) {
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
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 rounded-full pointer-events-none animate-float-delayed"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
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
      <div className="absolute top-32 right-0 w-48 h-0.5 bg-[#39FF14]/15" />
      <div className="absolute top-1/4 left-0 w-0.5 h-32 bg-[#39FF14]/10" />
      <div className="absolute bottom-32 left-24 w-6 h-6 border border-[#39FF14]/20" />
      <div className="absolute top-16 left-1/2 w-px h-16 bg-[#39FF14]/10" />
    </div>
  );
}
