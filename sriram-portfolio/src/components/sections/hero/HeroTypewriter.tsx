"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";
import type { Mode } from "@/types";

export interface HeroTypewriterProps {
  mode: Mode;
  words: string[];
}

export function HeroTypewriter({ mode, words }: HeroTypewriterProps) {
  const { displayed, fading } = useTypewriter(words, 2500);

  if (mode === "developer") {
    return (
      <div className="flex items-center gap-2 font-mono text-lg">
        <span className="text-white/30">—</span>
        <span
          className={cn(
            "text-gradient-dev transition-opacity duration-300",
            fading ? "opacity-0" : "opacity-100"
          )}
        >
          {displayed}
        </span>
        <span className="text-[#7c3aed] animate-blink">|</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono text-lg">
      <span className="text-[#39FF14]/40">{"// "}</span>
      <span className="text-[#39FF14] font-bold">{displayed}</span>
      <span className="text-[#39FF14] animate-blink">_</span>
    </div>
  );
}
