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
      <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-base md:text-lg">
        <span className="text-[#f0ece4]/35">—</span>
        <span
          className={cn(
            "text-gradient-dev transition-opacity duration-300",
            fading ? "opacity-0" : "opacity-100"
          )}
        >
          {displayed}
        </span>
        <span className="text-[#c9a84c] animate-blink">|</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-sm md:text-lg">
      <span className="text-[#e63946]/40">{"// "}</span>
      <span className="text-[#e63946] font-bold">{displayed}</span>
      <span className="text-[#e63946] animate-blink">_</span>
    </div>
  );
}
