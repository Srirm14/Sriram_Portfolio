"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "./ExperienceData";

export interface ExperienceDesignCardProps {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
  compact?: boolean;
  isLight?: boolean;
}

const PRIMARY = "#e85d00";

function CardContent({
  item,
  isLight,
}: {
  item: ExperienceItem;
  isLight?: boolean;
}) {
  const {
    company,
    roleDesign,
    duration,
    location,
    type,
    designBullets,
    designTools,
  } = item;
  const textMuted = isLight ? "rgba(15,15,15,0.6)" : "rgba(245,245,245,0.6)";
  const textBody = isLight ? "rgba(15,15,15,0.88)" : "rgba(245,245,245,0.9)";

  return (
    <div className="exp-design-card group relative overflow-visible">
      {/* Orange blur glow on hover */}
      <div
        className="absolute -inset-3 rounded-sm opacity-0 blur-2xl transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none"
        style={{
          zIndex: -1,
          background: `radial-gradient(ellipse 75% 55% at 50% 50%, rgba(232,93,0,0.4) 0%, rgba(232,93,0,0.15) 45%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="exp-card-inner brutal-card p-6 w-full max-w-lg hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 rounded-sm relative overflow-hidden">
      {/* Slow smooth shimmer — CSS-based so it never stops on mode switch */}
      <div className="exp-card-shimmer absolute inset-0 rounded-sm pointer-events-none" aria-hidden />
      <div className="relative z-[1]">
      <div className="flex items-start justify-between gap-4">
        <p
          className="font-syne font-semibold text-lg tracking-tight"
          style={{ color: isLight ? "#0a0a0a" : "#fafafa" }}
        >
          {company}
        </p>
        <span
          className="px-2.5 py-1 rounded-md font-mono text-[11px] uppercase tracking-wider"
          style={{
            border: `1px solid ${PRIMARY}`,
            color: PRIMARY,
            background: isLight ? "rgba(232,93,0,0.06)" : "rgba(232,93,0,0.08)",
          }}
        >
          {type}
        </span>
      </div>
      <p
        className="font-mono text-sm mt-1.5 font-medium"
        style={{ color: PRIMARY }}
      >
        {roleDesign}
      </p>
      <p
        className="font-mono text-xs mt-2"
        style={{ color: textMuted }}
      >
        {duration}
        <span style={{ color: `${PRIMARY}99` }}> · </span>
        {location}
      </p>

      <div
        className="w-full h-px my-4"
        style={{ background: `${PRIMARY}30` }}
      />

      {designBullets.map((bullet, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <span
            className="font-mono text-xs mt-0.5 flex-shrink-0"
            style={{ color: PRIMARY }}
          >
            →
          </span>
          <p
            className="font-poppins text-sm leading-relaxed"
            style={{ color: textBody }}
          >
            {bullet}
          </p>
        </div>
      ))}

      {designTools.length > 0 && (
        <div
          className="mt-4 pt-4 border-t flex flex-wrap gap-2"
          style={{ borderColor: `${PRIMARY}25` }}
        >
          {designTools.map((tool) => (
            <span key={tool} className="skill-pill-design">
              {tool}
            </span>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

export function ExperienceDesignCard({
  item,
  index,
  isLeft,
  compact = false,
  isLight = false,
}: ExperienceDesignCardProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.12,
        }}
        className="pl-6"
        style={{ borderLeft: `2px solid ${PRIMARY}50` }}
      >
        <CardContent item={item} isLight={isLight} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.12,
      }}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-8 items-start"
    >
      <div className={cn(isLeft ? "flex justify-end" : "")}>
        {isLeft && <CardContent item={item} isLight={isLight} />}
      </div>

      <div className="flex flex-col items-center">
        <div
          className="z-10 mt-6 rounded-full"
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: PRIMARY,
            boxShadow: `0 0 12px ${PRIMARY}80`,
          }}
        />
      </div>

      <div className={cn(!isLeft ? "flex justify-start" : "")}>
        {!isLeft && <CardContent item={item} isLight={isLight} />}
      </div>
    </motion.div>
  );
}
