"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectGradient } from "./ProjectGradient";
import type { ProjectItem } from "./ProjectsData";

export interface ProjectDesignCardProps {
  item: ProjectItem;
}

export function ProjectDesignCard({ item }: ProjectDesignCardProps) {
  const [flipped, setFlipped] = useState(false);

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
            <ProjectGradient
              from={item.gradient.from}
              via={item.gradient.via}
              to={item.gradient.to}
              mode="designer"
            />
            <div className="absolute bottom-2 right-3 font-mono text-xs text-[#39FF14]/40 flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              flip
            </div>
          </div>
          <div className="p-4 h-[45%] flex flex-col justify-between min-h-0 overflow-y-auto">
            <div>
              <h3 className="font-bebas text-white">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-white/40 mt-1">
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
          className="absolute inset-0 bg-[#0a0a0a] border-2 border-[#39FF14] p-5 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]" />
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bebas text-white">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-[#39FF14]/50 mt-0.5">
                {item.duration}
              </p>
            </div>
            <RotateCw className="w-3 h-3 text-[#39FF14]/30 flex-shrink-0 mt-1" />
          </div>
          <div className="flex flex-col gap-2 flex-1 my-4 min-h-0 overflow-y-auto">
            {item.designBullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start flex-shrink-0">
                <span className="text-[#39FF14] font-mono text-xs flex-shrink-0 mt-0.5">
                  →
                </span>
                <p className="font-poppins text-xs text-white/60 leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#39FF14]/20">
            {item.designTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-[#39FF14]/40 font-mono text-xs text-[#39FF14]/70 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
