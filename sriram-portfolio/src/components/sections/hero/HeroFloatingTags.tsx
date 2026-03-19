"use client";

import { Code2, Zap, Layers, Pen } from "lucide-react";
import { HeroPhoto } from "./HeroPhoto";
import type { Mode } from "@/types";

export interface HeroFloatingTagsProps {
  mode: Mode;
}

export function HeroFloatingTags({ mode }: HeroFloatingTagsProps) {
  if (mode === "developer") {
    return (
      <div className="relative inline-block">
        <HeroPhoto mode="developer" />

        <div className="glass-card absolute -top-3 -right-3 px-3 py-1.5 rounded-lg z-20 flex items-center gap-1.5">
          <Code2 className="w-3 h-3 text-[#c9a84c]" />
          <span className="font-mono text-xs text-[#f0ece4]/85">Next.js</span>
        </div>

        <div className="glass-card absolute -bottom-3 -left-3 px-3 py-1.5 rounded-lg z-20 flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-[#e8d5a3]" />
          <span className="font-mono text-xs text-[#f0ece4]/85">Performance</span>
        </div>

        <div className="glass-card absolute -bottom-8 right-2 px-3 py-1.5 rounded-lg z-20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping-slow inline-block" />
          <span className="font-mono text-xs text-[#f0ece4]/85">Open to work</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <HeroPhoto mode="designer" />

      <div className="brutal-card absolute -top-3 -right-3 px-3 py-1.5 z-20 flex items-center gap-1.5">
        <Pen className="w-3 h-3 text-[#e63946]" />
        <span className="font-mono text-xs text-[#e63946]">Figma</span>
      </div>

      <div className="brutal-card absolute -bottom-3 -left-3 px-3 py-1.5 z-20 flex items-center gap-1.5">
        <Layers className="w-3 h-3 text-[#e63946]" />
        <span className="font-mono text-xs text-[#e63946]">Design Systems</span>
      </div>

      <div className="brutal-card absolute -bottom-8 right-0 px-3 py-1.5 z-20 flex items-center gap-1.5">
        <span className="font-mono text-xs text-[#e63946] font-bold">
          ● OPEN TO WORK
        </span>
      </div>
    </div>
  );
}
