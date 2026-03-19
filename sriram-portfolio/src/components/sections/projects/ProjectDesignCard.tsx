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
          className="absolute inset-0 brutal-card overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-[55%]">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.via}, ${item.gradient.to})`,
              }}
            />
            <div className="absolute bottom-2 right-3 font-mono text-xs text-[#e63946]/40 flex items-center gap-1">
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

        {/* Back face */}
        <div
          className={cn(
            "absolute inset-0 border-2 border-[#e63946] p-5 flex flex-col overflow-hidden",
            isLight
              ? "bg-[rgba(255,252,247,0.98)] border-[#e63946]/35"
              : "bg-[#0a0a0a]",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e63946]" />
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
              <p className="font-mono text-xs text-[#e63946]/50 mt-0.5">
                {item.duration}
              </p>
            </div>
            <RotateCw className="w-3 h-3 text-[#e63946]/30 flex-shrink-0 mt-1" />
          </div>
          <div className="flex flex-col gap-2 flex-1 my-4 min-h-0 overflow-y-auto">
            {item.designBullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start flex-shrink-0">
                <span className="text-[#e63946] font-mono text-xs flex-shrink-0 mt-0.5">
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
          <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#e63946]/20">
            {item.designTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-[#e63946]/40 font-mono text-xs text-[#e63946]/70 uppercase"
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
              className="mt-3 flex items-center justify-center gap-1.5 py-2 border-2 border-[#e63946]/60 font-mono text-xs text-[#e63946] hover:bg-[#e63946] hover:text-black transition-all duration-150 uppercase"
            >
              <ExternalLink className="w-3 h-3" />
              {item.linkLabel ?? "View prototype"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
