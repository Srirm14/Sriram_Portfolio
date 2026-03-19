"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import type { ProjectItem } from "./ProjectsData";
import { getCardGradient } from "./projectGradients";
import { useLightDark } from "@/context/LightDarkContext";
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
  const { isLight } = useLightDark();

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

  const grad = item === null ? null : getCardGradient(item, isDev);

  const drawerContent = (
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
              background: isLight
                ? isDev
                  ? "rgba(247,244,239,0.52)"
                  : "rgba(253,250,245,0.58)"
                : isDev
                  ? "rgba(10,10,11,0.55)"
                  : "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer-panel"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[99990]",
              "flex flex-col overflow-hidden",
              "w-4/5 max-w-[90vw] md:w-[min(55%,680px)] md:max-w-[680px]",
              isDev
                ? "border-l border-[rgba(201,168,76,0.18)]"
                : "border-l-2 border-[#e63946]"
            )}
            style={{
              background: isLight
                ? isDev
                  ? "rgba(255,252,247,0.99)"
                  : "rgba(255,252,247,0.99)"
                : isDev
                  ? "rgba(10,10,11,0.98)"
                  : "#0a0a0a",
              backdropFilter: "blur(20px)",
              boxShadow: isLight
                ? isDev
                  ? "-24px 0 48px rgba(62,48,28,0.08), -1px 0 0 rgba(201,168,76,0.18), inset 0 0 0 1px rgba(201,168,76,0.1)"
                  : "-16px 0 40px rgba(62,48,28,0.07), -2px 0 0 rgba(230,57,70,0.25)"
                : isDev
                  ? "-24px 0 64px rgba(0,0,0,0.55), -1px 0 0 rgba(201,168,76,0.12), inset 0 0 0 1px rgba(201,168,76,0.06)"
                  : "-4px 0 0 #e63946",
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
              className="relative flex-shrink-0 w-full overflow-hidden h-44 md:h-[260px]"
            >
              {/* Mesh gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg,
                    ${grad!.from}28 0%,
                    ${grad!.via}18 50%,
                    ${grad!.to}12 100%)`,
                }}
              />

              {/* Orbs */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: grad!.from, opacity: isDev ? 0.22 : 0.2 }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl pointer-events-none"
                style={{ background: grad!.to, opacity: isDev ? 0.14 : 0.12 }}
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
                      borderTop: "80px solid #e63946",
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
                  "absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 z-10",
                  "flex items-center justify-center",
                  "transition-all duration-200",
                  isDev
                    ? "rounded-full bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.25)] text-[#f0ece4]/70 hover:text-[#f0ece4] hover:bg-[rgba(201,168,76,0.14)]"
                    : "border-2 border-[#e63946]/50 text-[#e63946] hover:bg-[#e63946] hover:text-black"
                )}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tags */}
              <div className="absolute top-4 left-4 md:top-5 md:left-6 flex flex-wrap gap-1.5 md:gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1"
                    style={
                      isDev
                        ? {
                            background: `${grad!.from}22`,
                            border: `1px solid ${grad!.from}42`,
                            color: grad!.from,
                            borderRadius: "999px",
                          }
                        : {
                            border: "1px solid rgba(230,57,70,0.5)",
                            color: "#e63946",
                          }
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title block — bottom of banner */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                style={{
                  background: isLight
                    ? isDev
                      ? "linear-gradient(to top, rgba(255,252,247,0.98) 0%, rgba(255,252,247,0.75) 45%, transparent 100%)"
                      : "linear-gradient(to top, rgba(255,252,247,0.98) 0%, rgba(255,252,247,0.7) 50%, transparent 100%)"
                    : undefined,
                }}
              >
                {!isLight && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/90 to-transparent pointer-events-none" />
                )}
                <motion.h2
                  key={`${item.id}-title`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className={cn(
                    "relative z-10 text-xl md:text-3xl",
                    isDev
                      ? cn(
                          "font-grotesk font-bold",
                          isLight ? "text-[#1c1612]" : "text-[#f0ece4]",
                        )
                      : cn(
                          isLight ? "text-[#1a1410]" : "text-white",
                          !isDev && "font-bebas tracking-widest uppercase",
                        ),
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
                    "relative z-10 mt-1 text-sm",
                    isDev
                      ? cn(
                          "font-poppins",
                          isLight ? "text-[rgba(42,36,30,0.58)]" : "text-[#f0ece4]/55",
                        )
                      : cn(
                          "font-mono",
                          isLight ? "text-[rgba(200,60,70,0.65)]" : "text-[#e63946]/60",
                        ),
                  )}
                >
                  {item.shortDesc}
                </motion.p>
              </div>
            </div>

            {/* ── Scrollable content ─────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {/* Duration */}
              <motion.p
                key={`${item.id}-dur`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className={cn(
                  "font-mono text-xs",
                  isDev
                    ? isLight
                      ? "text-[rgba(42,36,30,0.4)]"
                      : "text-[#f0ece4]/35"
                    : isLight
                      ? "text-[rgba(200,60,70,0.45)]"
                      : "text-[#e63946]/40",
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
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(230,57,70,0.15)",
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
                        color: isDev ? grad!.from : "#e63946",
                      }}
                    >
                      {isDev ? "▹" : "→"}
                    </span>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isDev
                          ? cn(
                              "font-poppins",
                              isLight
                                ? "text-[rgba(42,36,30,0.78)]"
                                : "text-[#f0ece4]/72",
                            )
                          : cn(
                              "font-poppins",
                              isLight ? "text-[rgba(42,36,30,0.65)]" : "text-white/60",
                            ),
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
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(230,57,70,0.15)",
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
                    isDev ? "text-[#c9a84c]/80" : "text-[#e63946]/40"
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
                      : "border-2 border-[#e63946]/60 text-[#e63946] hover:bg-[#e63946] hover:text-black uppercase"
                  )}
                  style={
                    isDev
                      ? {
                          borderColor: `${grad!.from}45`,
                          color: grad!.from,
                          background: `${grad!.from}12`,
                        }
                      : undefined
                  }
                >
                  <ExternalLink className="w-3 h-3" />
                  {item.linkLabel ?? "View prototype"}
                </motion.a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(drawerContent, document.body);
}
