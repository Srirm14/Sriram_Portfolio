"use client";

import { motion } from "framer-motion";
import type { ProjectItem } from "./ProjectsData";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  item: ProjectItem;
  mode: "developer" | "designer";
  onClick: (item: ProjectItem) => void;
  index: number;
}

export function ProjectCard({
  item,
  mode,
  onClick,
  index,
}: ProjectCardProps) {
  const isDev = mode === "developer";

  return (
    <motion.div
      className={cn(
        "relative cursor-pointer overflow-hidden group w-full",
        isDev
          ? "rounded-xl border border-white/[0.07]"
          : "border-2 border-[#39FF14]/30"
      )}
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={
        isDev ? { y: -6, scale: 1.01 } : { x: -4, y: -4 }
      }
      style={
        isDev
          ? { background: "rgba(13,13,20,0.8)" }
          : {
              background: "#0a0a0a",
              boxShadow: "4px 4px 0px rgba(57,255,20,0.3)",
            }
      }
    >
      {/* ── Gradient mesh background ─────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: index % 3 === 0 ? "200px" : "160px" }}
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
          style={{
            background: `linear-gradient(135deg,
              ${item.gradient.from}25 0%,
              ${item.gradient.via}18 50%,
              ${item.gradient.to}12 100%)`,
          }}
        />

        {/* Mesh orbs */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all duration-700 group-hover:scale-125"
          style={{ background: item.gradient.from, opacity: 0.2 }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-xl pointer-events-none"
          style={{ background: item.gradient.to, opacity: 0.15 }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-xl pointer-events-none"
          style={{ background: item.gradient.via, opacity: 0.1 }}
        />

        {isDev && (
          <div className="absolute inset-0 dot-grid opacity-15" />
        )}
        {!isDev && (
          <div className="absolute inset-0 line-grid opacity-20" />
        )}

        {/* Hover shimmer sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(105deg,
              transparent 40%,
              ${item.gradient.from}15 50%,
              transparent 60%)`,
            backgroundSize: "200% 100%",
          }}
        />

        {/* Tags — top left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(isDev ? item.tags : item.designTags)
            .slice(0, 2)
            .map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5"
                style={
                  isDev
                    ? {
                        background: `${item.gradient.from}20`,
                        border: `1px solid ${item.gradient.from}35`,
                        color: item.gradient.from,
                        borderRadius: "999px",
                      }
                    : {
                        border: "1px solid rgba(57,255,20,0.4)",
                        color: "#39FF14",
                      }
                }
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Arrow hint — bottom right, appears on hover */}
        <div
          className="absolute bottom-3 right-3 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          style={
            isDev
              ? {
                  background: `${item.gradient.from}20`,
                  border: `1px solid ${item.gradient.from}40`,
                  borderRadius: "50%",
                  color: item.gradient.from,
                }
              : {
                  border: "2px solid #39FF14",
                  color: "#39FF14",
                }
          }
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────── */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title + duration */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              "text-base text-white leading-tight",
              isDev
                ? "font-grotesk font-bold"
                : "font-bebas tracking-wider uppercase"
            )}
          >
            {item.title}
          </h3>
          <span
            className={cn(
              "font-mono text-xs flex-shrink-0 mt-0.5",
              isDev ? "text-white/25" : "text-[#39FF14]/30"
            )}
          >
            {item.duration}
          </span>
        </div>

        {/* Short desc */}
        <p
          className={cn(
            "text-xs leading-relaxed line-clamp-2",
            isDev
              ? "font-poppins text-white/45"
              : "font-mono text-white/40"
          )}
        >
          {item.shortDesc}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(isDev ? item.devTech : item.designTools)
            .slice(0, 4)
            .map((tech) => (
              <span
                key={tech}
                className={cn(
                  "font-mono text-xs px-2 py-0.5 transition-all duration-200",
                  isDev ? "skill-pill-dev" : "skill-pill-design"
                )}
              >
                {tech}
              </span>
            ))}
        </div>

        {/* Bottom divider line */}
        {isDev && (
          <div
            className="w-full h-px mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg,
                ${item.gradient.from}60, transparent)`,
            }}
          />
        )}
        {!isDev && (
          <div
            className="w-full h-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#39FF14]/30"
          />
        )}
      </div>
    </motion.div>
  );
}
