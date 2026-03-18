"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectGradient } from "./ProjectGradient";
import type { ProjectItem } from "./ProjectsData";

export interface ProjectDevCardProps {
  item: ProjectItem;
  featured?: boolean;
}

export function ProjectDevCard({ item, featured = false }: ProjectDevCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { gradient } = item;

  return (
    <div
      className={cn(
        "relative cursor-pointer group",
        featured ? "h-80" : "h-64"
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
          className="absolute inset-0 glass-card rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-[60%]">
            <ProjectGradient
              from={gradient.from}
              via={gradient.via}
              to={gradient.to}
              featured={featured}
              mode="developer"
            />
            {featured && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30 font-mono text-xs text-[#7c3aed]">
                ★ Featured
              </div>
            )}
            <div className="absolute bottom-3 right-3 font-mono text-xs text-white/30 flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              flip
            </div>
          </div>
          <div className="p-4 h-[40%] flex flex-col justify-between min-h-0 overflow-y-auto">
            <div>
              <h3 className="font-grotesk font-bold text-white text-lg">
                {item.title}
              </h3>
              <p className="font-poppins text-sm text-white/40 mt-0.5">
                {item.shortDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.devTech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="skill-pill-dev text-xs px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
              {item.devTech.length > 3 && (
                <span className="skill-pill-dev text-xs px-2 py-0.5">
                  +{item.devTech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 glass-card rounded-xl p-5 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
            style={{
              background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
            }}
          />
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-grotesk font-bold text-white">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-white/30 mt-0.5">
                {item.duration}
              </p>
            </div>
            <RotateCw className="w-3 h-3 text-white/20 flex-shrink-0 mt-1" />
          </div>
          <div className="flex flex-col gap-2 flex-1 my-4 min-h-0 overflow-y-auto">
            {item.devBullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start flex-shrink-0">
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: gradient.from }}
                />
                <p className="font-poppins text-xs text-white/60 leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full font-mono text-xs border"
                style={{
                  borderColor: `${gradient.from}40`,
                  color: gradient.from,
                  background: `${gradient.from}10`,
                }}
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
