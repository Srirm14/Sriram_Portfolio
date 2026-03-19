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
      className="vintage-dev-card group relative w-full max-w-lg cursor-pointer overflow-hidden rounded-xl"
      onClick={onToggle}
    >
      <div className="vintage-dev-card__shimmer" aria-hidden />
      <div className="vintage-dev-card__inner relative p-6 pl-7 sm:pl-8">
        {/* Signature rail — collectible feel */}
        <div
          className="absolute bottom-7 left-4 top-7 w-[3px] rounded-full bg-gradient-to-b from-[#c9a84c]/75 via-[#c9a84c]/35 to-[#c9a84c]/12"
          aria-hidden
        />

        <div className="relative pl-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="vintage-dev-card__title font-grotesk text-lg leading-tight">
                {company}
              </p>
              {role && (
                <p className="vintage-dev-card__meta mt-1 font-mono text-sm">
                  {role}
                </p>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 flex-shrink-0 text-white/40 transition-transform duration-300",
                "group-hover:text-[#c9a84c]/90",
                expanded && "rotate-180",
              )}
            />
          </div>

          <div className="vintage-dev-card__hairline my-3.5" aria-hidden />

          <div className="vintage-dev-card__meta flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs">
            <span>{duration}</span>
            <span className="opacity-40" aria-hidden>
              ·
            </span>
            <span>{location}</span>
            <span className="ml-auto rounded-full border border-[#c9a84c]/28 bg-[#c9a84c]/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-[#c9a84c]">
              {type}
            </span>
          </div>

          <ul className="mt-4 list-none space-y-2.5">
            {devBullets.slice(0, 2).map((bullet, i) => (
              <li
                key={i}
                className="vintage-dev-card__bullet font-poppins text-sm leading-relaxed"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-[11px] text-[#c9a84c]/70 transition-colors group-hover:text-[#c9a84c]">
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
                <ul className="mt-3 list-none space-y-2.5 border-t border-[rgba(201,168,76,0.14)] pt-3">
                  {devBullets.slice(2).map((bullet, i) => (
                    <li
                      key={i}
                      className="vintage-dev-card__bullet font-poppins text-sm leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                {devStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[rgba(201,168,76,0.14)] pt-4">
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
      </div>
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
        className="border-l-2 border-[#c9a84c]/35 pl-5 sm:pl-6"
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
      className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-8"
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
        <div className="z-10 mt-6 h-3 w-3 rounded-full border-2 border-[#c9a84c]/50 bg-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.35)]" />
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
