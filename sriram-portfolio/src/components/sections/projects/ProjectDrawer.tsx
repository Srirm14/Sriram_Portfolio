"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import type { ProjectItem } from "./ProjectsData";
import { cn } from "@/lib/utils";

interface ProjectDrawerProps {
  item: ProjectItem | null;
  mode: "developer" | "designer";
  onClose: () => void;
}

export function ProjectDrawer({
  item,
  mode,
  onClose,
}: ProjectDrawerProps) {
  const isDev = mode === "developer";

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock body scroll only on mobile
  useEffect(() => {
    if (item && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  const bullets =
    item ? (isDev ? item.devBullets : item.designBullets) : [];
  const techList =
    item ? (isDev ? item.devTech : item.designTools) : [];
  const tags =
    item ? (isDev ? item.tags : item.designTags) : [];

  return (
    <AnimatePresence mode="wait">
      {item && (
        <>
          {/* Scrim — partial, only left side */}
          <motion.div
            key="drawer-scrim"
            className="fixed inset-0 z-[99980] pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              background: isDev
                ? "rgba(10,10,15,0.5)"
                : "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer-panel"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[99990]",
              "flex flex-col overflow-hidden",
              isDev ? "border-l border-white/[0.08]" : "border-l-2 border-[#39FF14]"
            )}
            style={{
              width: "min(55%, 680px)",
              background: isDev ? "rgba(10,10,18,0.97)" : "#0a0a0a",
              backdropFilter: "blur(20px)",
              boxShadow: isDev
                ? "-20px 0 60px rgba(0,0,0,0.5), -1px 0 0 rgba(255,255,255,0.04)"
                : "-4px 0 0 #39FF14",
              isolation: "isolate",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 34,
              mass: 0.9,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Gradient hero banner ───────────────── */}
            <div
              className="relative flex-shrink-0 w-full overflow-hidden"
              style={{ height: "260px" }}
            >
              {/* Mesh gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg,
                    ${item.gradient.from}30 0%,
                    ${item.gradient.via}20 50%,
                    ${item.gradient.to}15 100%)`,
                }}
              />

              {/* Orbs */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: item.gradient.from, opacity: 0.2 }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl pointer-events-none"
                style={{ background: item.gradient.to, opacity: 0.12 }}
              />

              {isDev && (
                <div className="absolute inset-0 dot-grid opacity-20" />
              )}
              {!isDev && (
                <>
                  <div className="absolute inset-0 line-grid opacity-25" />
                  <div
                    className="absolute top-0 right-0 w-0 h-0 opacity-15"
                    style={{
                      borderLeft: "80px solid transparent",
                      borderTop: "80px solid #39FF14",
                    }}
                  />
                </>
              )}

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className={cn(
                  "absolute top-5 right-5 w-9 h-9 z-10",
                  "flex items-center justify-center",
                  "transition-all duration-200",
                  isDev
                    ? "rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                    : "border-2 border-[#39FF14]/50 text-[#39FF14] hover:bg-[#39FF14] hover:text-black"
                )}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tags */}
              <div className="absolute top-5 left-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1"
                    style={
                      isDev
                        ? {
                            background: `${item.gradient.from}20`,
                            border: `1px solid ${item.gradient.from}40`,
                            color: item.gradient.from,
                            borderRadius: "999px",
                          }
                        : {
                            border: "1px solid rgba(57,255,20,0.5)",
                            color: "#39FF14",
                          }
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title block — bottom of banner */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a12] to-transparent">
                <motion.h2
                  key={`${item.id}-title`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className={cn(
                    "text-3xl text-white",
                    isDev
                      ? "font-grotesk font-bold"
                      : "font-bebas tracking-widest uppercase"
                  )}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  key={`${item.id}-desc`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className={cn(
                    "text-sm mt-1",
                    isDev
                      ? "font-poppins text-white/50"
                      : "font-mono text-[#39FF14]/60"
                  )}
                >
                  {item.shortDesc}
                </motion.p>
              </div>
            </div>

            {/* ── Scrollable content ─────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col gap-6 p-6">
              {/* Duration */}
              <motion.p
                key={`${item.id}-dur`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className={cn(
                  "font-mono text-xs",
                  isDev ? "text-white/30" : "text-[#39FF14]/40"
                )}
              >
                {isDev ? "⏱ " : "// "}
                {item.duration}
              </motion.p>

              {/* Divider */}
              <div
                className="w-full flex-shrink-0"
                style={{
                  height: isDev ? "1px" : "2px",
                  background: isDev
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(57,255,20,0.15)",
                }}
              />

              {/* Bullets */}
              <div className="flex flex-col gap-4">
                {bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.25 + i * 0.07,
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-1 font-mono text-sm"
                      style={{
                        color: isDev ? item.gradient.from : "#39FF14",
                      }}
                    >
                      {isDev ? "▹" : "→"}
                    </span>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isDev
                          ? "font-poppins text-white/70"
                          : "font-poppins text-white/60"
                      )}
                    >
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="w-full flex-shrink-0"
                style={{
                  height: isDev ? "1px" : "2px",
                  background: isDev
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(57,255,20,0.15)",
                }}
              />

              {/* Stack / tools */}
              <motion.div
                key={`${item.id}-stack`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest mb-3",
                    isDev ? "text-white/30" : "text-[#39FF14]/40"
                  )}
                >
                  {isDev ? "Stack" : "Tools"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.42 + i * 0.04 }}
                      className={cn(
                        "font-mono text-xs px-3 py-1.5",
                        isDev ? "skill-pill-dev" : "skill-pill-design"
                      )}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* View prototype link */}
              {item.link && (
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-2 font-mono text-xs transition-all duration-200",
                    isDev
                      ? "rounded-lg border"
                      : "border-2 border-[#39FF14]/60 text-[#39FF14] hover:bg-[#39FF14] hover:text-black uppercase"
                  )}
                  style={
                    isDev
                      ? {
                          borderColor: `${item.gradient.from}40`,
                          color: item.gradient.from,
                          background: `${item.gradient.from}10`,
                        }
                      : undefined
                  }
                >
                  <ExternalLink className="w-3 h-3" />
                  View prototype
                </motion.a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
