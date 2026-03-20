"use client";

import React, { useState } from "react";
import { RotateCw, ExternalLink } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "./ProjectsData";

export interface ProjectDesignCardProps {
  item: ProjectItem;
}

export function ProjectDesignCard({ item }: ProjectDesignCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { isLight } = useLightDark();

  return (
    <div
      className={cn(
        "relative cursor-pointer group",
        item.featured ? "h-80" : "h-64"
      )}
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 brutal-card rounded-sm overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-[55%]">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.via}, ${item.gradient.to})`,
              }}
            />
            <div className="absolute bottom-2 right-3 font-mono text-xs text-[#e85d00]/40 flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              flip
            </div>
          </div>
          <div className="p-4 h-[45%] flex flex-col justify-between min-h-0 overflow-y-auto">
            <div>
              <h3
                className={cn(
                  "font-bebas",
                  isLight ? "text-[#1a1410]" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-1 font-mono text-xs",
                  isLight ? "text-[rgba(42,36,30,0.5)]" : "text-white/40",
                )}
              >
                {item.shortDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.designTools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="skill-pill-design text-xs px-2 py-0.5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back face — subtle abstract background */}
        <div
          className={cn(
            "absolute inset-0 border-2 border-[#e85d00] rounded-sm p-5 flex flex-col overflow-hidden",
            isLight
              ? "bg-[rgba(255,252,247,0.98)] border-[#e85d00]/35"
              : "bg-[#0a0a0a]",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Subtle abstract lines — keep it minimal */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 280"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`proj-back-fade-${item.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e85d00" stopOpacity="0" />
                <stop offset="50%" stopColor="#e85d00" stopOpacity="0" />
                <stop offset="100%" stopColor="#e85d00" stopOpacity={isLight ? 0.15 : 0.2} />
              </linearGradient>
            </defs>
            <line x1="0" y1="0" x2="200" y2="280" stroke={`url(#proj-back-fade-${item.id})`} strokeWidth="0.8" />
            <line x1="200" y1="0" x2="0" y2="280" stroke={`url(#proj-back-fade-${item.id})`} strokeWidth="0.8" />
            <line x1="100" y1="0" x2="100" y2="280" stroke="#e85d00" strokeWidth="0.5" opacity={isLight ? 0.08 : 0.12} strokeDasharray="4 8" />
            <line x1="0" y1="140" x2="200" y2="140" stroke="#e85d00" strokeWidth="0.5" opacity={isLight ? 0.08 : 0.12} strokeDasharray="4 8" />
          </svg>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e85d00] z-10" />
          <div className="relative z-10 flex flex-col flex-1 min-h-0">
          <div className="flex items-start justify-between">
            <div>
              <h3
                className={cn(
                  "font-bebas",
                  isLight ? "text-[#1a1410]" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p className="font-mono text-xs text-[#e85d00]/50 mt-0.5">
                {item.duration}
              </p>
            </div>
            <RotateCw className="w-3 h-3 text-[#e85d00]/30 flex-shrink-0 mt-1" />
          </div>
          <div className="flex flex-col gap-2 flex-1 my-4 min-h-0 overflow-y-auto">
            {item.designBullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start flex-shrink-0">
                <span className="text-[#e85d00] font-mono text-xs flex-shrink-0 mt-0.5">
                  →
                </span>
                <p
                  className={cn(
                    "font-poppins text-xs leading-relaxed",
                    isLight ? "text-[rgba(42,36,30,0.68)]" : "text-white/60",
                  )}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#e85d00]/20">
            {item.designTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-[#e85d00]/40 font-mono text-xs text-[#e85d00]/70 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center justify-center gap-1.5 py-2 border-2 border-[#e85d00]/60 font-mono text-xs text-[#e85d00] hover:bg-[#e85d00] hover:text-black transition-all duration-150 uppercase"
            >
              <ExternalLink className="w-3 h-3" />
              {item.linkLabel ?? "View prototype"}
            </a>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
