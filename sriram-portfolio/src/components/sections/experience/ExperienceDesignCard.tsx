"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "./ExperienceData";

export interface ExperienceDesignCardProps {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
  compact?: boolean;
}

function CardContent({ item }: { item: ExperienceItem }) {
  const {
    company,
    roleDesign,
    duration,
    location,
    type,
    designBullets,
    designTools,
  } = item;

  return (
    <div className="brutal-card p-6 w-full max-w-lg hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150">
      <div className="flex items-start justify-between gap-4">
        <p className="font-bebas text-lg text-white">
          {company}
        </p>
        <span className="px-2 py-0.5 border border-[#39FF14]/50 font-mono text-xs text-[#39FF14] uppercase">
          {type}
        </span>
      </div>
      <p className="font-mono text-sm text-[#39FF14]/70 mt-1">{roleDesign}</p>
      <p className="font-mono text-xs text-white/30 mt-2">
        {duration}
        <span className="text-[#39FF14]/30"> · </span>
        {location}
      </p>

      <div className="w-full h-px bg-[#39FF14]/20 my-4" />

      {designBullets.map((bullet, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <span className="text-[#39FF14] font-mono text-xs mt-0.5 flex-shrink-0">
            →
          </span>
          <p className="font-poppins text-sm text-white/60 leading-relaxed">
            {bullet}
          </p>
        </div>
      ))}

      {designTools.length > 0 && (
        <div className="mt-4 pt-4 border-t-2 border-[#39FF14]/20 flex flex-wrap gap-2">
          {designTools.map((tool) => (
            <span key={tool} className="skill-pill-design">
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ExperienceDesignCard({
  item,
  index,
  isLeft,
  compact = false,
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
        className="border-l-2 border-[#39FF14]/30 pl-6"
      >
        <CardContent item={item} />
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
        {isLeft && <CardContent item={item} />}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-[#39FF14] shadow-glow-green border-2 border-[#39FF14]/50 z-10 mt-6 rounded-none" />
      </div>

      <div className={cn(!isLeft ? "flex justify-start" : "")}>
        {!isLeft && <CardContent item={item} />}
      </div>
    </motion.div>
  );
}
