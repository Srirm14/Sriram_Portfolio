"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "./ExperienceData";

export interface ExperienceDevCardProps {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
  compact?: boolean;
}

function CardContent({
  item,
  expanded,
  onToggle,
}: {
  item: ExperienceItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { company, role, duration, location, type, devBullets, devStack } =
    item;

  return (
    <div
      className="glass-card p-6 rounded-xl w-full max-w-lg hover:border-[#c9a84c]/30 transition-all duration-300 cursor-pointer group"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-grotesk font-bold text-lg text-white">{company}</p>
          {role && (
            <p className="font-mono text-sm text-white/50 mt-0.5">{role}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="font-mono text-xs text-white/30">{duration}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-xs text-white/30">{location}</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 font-mono text-xs text-[#c9a84c]">
              {type}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/30 transition-transform duration-300 flex-shrink-0",
            expanded && "rotate-180"
          )}
        />
      </div>

      {devBullets.slice(0, 2).map((bullet, i) => (
        <div key={i} className="flex gap-2 mt-3">
          <span className="w-1 h-1 rounded-full bg-[#c9a84c]/60 mt-2 flex-shrink-0" />
          <p className="font-poppins text-sm text-white/50 line-clamp-2">
            {bullet}
          </p>
        </div>
      ))}

      <p className="font-mono text-xs text-[#c9a84c]/50 mt-3 group-hover:text-[#c9a84c] transition-colors">
        {expanded
          ? "— collapse"
          : `+ ${Math.max(0, devBullets.length - 2)} more`}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {devBullets.slice(2).map((bullet, i) => (
              <div key={i} className="flex gap-2 mt-3">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c]/60 mt-2 flex-shrink-0" />
                <p className="font-poppins text-sm text-white/50">{bullet}</p>
              </div>
            ))}
            {devStack.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {devStack.map((tech) => (
                  <span key={tech} className="skill-pill-dev">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceDevCard({
  item,
  index,
  isLeft,
  compact = false,
}: ExperienceDevCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 }}
        className="border-l-2 border-[#c9a84c]/30 pl-6"
      >
        <CardContent
          item={item}
          expanded={expanded}
          onToggle={() => setExpanded((e) => !e)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-8 items-start"
    >
      <div className={cn(isLeft ? "flex justify-end" : "")}>
        {isLeft && (
          <CardContent
            item={item}
            expanded={expanded}
            onToggle={() => setExpanded((e) => !e)}
          />
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[#c9a84c] shadow-glow-gold border-2 border-[#c9a84c]/50 z-10 mt-6" />
      </div>

      <div className={cn(!isLeft ? "flex justify-start" : "")}>
        {!isLeft && (
          <CardContent
            item={item}
            expanded={expanded}
            onToggle={() => setExpanded((e) => !e)}
          />
        )}
      </div>
    </motion.div>
  );
}
