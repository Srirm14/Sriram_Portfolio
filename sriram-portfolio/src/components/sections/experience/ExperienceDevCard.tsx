"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "./ExperienceData";

/** True for active role (e.g. "Dec 2024 – Present") — timeline dot glows */
function isCurrentExperience(item: ExperienceItem): boolean {
  const d = item.duration.toLowerCase();
  return /\b(present|current)\b/.test(d) || /\bnow\b/.test(d);
}

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

  const hasExpandable = devBullets.length > 2;

  return (
    <div
      className={cn(
        "experience-dev-card vintage-dev-card group relative w-full max-w-lg overflow-hidden rounded-sm",
        hasExpandable && "cursor-pointer",
      )}
      onClick={hasExpandable ? onToggle : undefined}
    >
      <div className="vintage-dev-card__shimmer" aria-hidden />
      <div className="vintage-dev-card__inner relative p-6 sm:p-7">
        <div className="relative">
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
            {hasExpandable && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 flex-shrink-0 text-white/40 transition-transform duration-300",
                  "group-hover:text-[#c9a84c]/90",
                  expanded && "rotate-180",
                )}
              />
            )}
          </div>

          <div className="vintage-dev-card__meta mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs">
            <span>{duration}</span>
            <span className="opacity-40" aria-hidden>
              ·
            </span>
            <span>{location}</span>
            <span className="ml-auto rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-[#c9a84c]">
              {type}
            </span>
          </div>

          <ul className="mt-5 list-none space-y-3">
            {(hasExpandable ? devBullets.slice(0, 2) : devBullets).map(
              (bullet, i) => (
                <li
                  key={i}
                  className="experience-dev-card__bullet vintage-dev-card__bullet font-poppins text-sm leading-relaxed"
                >
                  {bullet}
                </li>
              ),
            )}
          </ul>

          {hasExpandable && (
            <p className="mt-4 font-mono text-[11px] text-[#c9a84c]/70 transition-colors group-hover:text-[#c9a84c]">
              {expanded ? "— collapse" : `+ ${devBullets.length - 2} more`}
            </p>
          )}

          {!hasExpandable && devStack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {devStack.map((tech) => (
                <span key={tech} className="skill-pill-dev">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <AnimatePresence>
            {hasExpandable && expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-[rgba(201,168,76,0.09)] pt-4">
                  <ul className="list-none space-y-3">
                    {devBullets.slice(2).map((bullet, i) => (
                      <li
                        key={i}
                        className="experience-dev-card__bullet vintage-dev-card__bullet font-poppins text-sm leading-relaxed"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {devStack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {devStack.map((tech) => (
                        <span key={tech} className="skill-pill-dev">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
  const current = isCurrentExperience(item);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 }}
        className={cn(
          "pl-4 sm:pl-5",
          current
            ? "border-l-2 border-[#c9a84c]/60 shadow-[inset_4px_0_12px_-4px_rgba(201,168,76,0.35)]"
            : "border-l border-[#c9a84c]/22",
        )}
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
        <div
          className={cn(
            "z-10 mt-6 rounded-full border-2",
            current
              ? "h-[14px] w-[14px] border-[#e8d5a3] bg-gradient-to-br from-[#f2e6c0] to-[#c9a84c] shadow-[0_0_0_4px_rgba(201,168,76,0.2),0_0_28px_rgba(201,168,76,0.5),0_0_48px_rgba(201,168,76,0.2)]"
              : "h-3 w-3 border-[#c9a84c]/40 bg-[#c9a84c]/50 shadow-[0_0_14px_rgba(201,168,76,0.18)]",
          )}
          aria-hidden
        />
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
