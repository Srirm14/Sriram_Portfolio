"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
import { useModeStore } from "@/store";
import { cn } from "@/lib/utils";

export function ModeHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";
  const { isLight } = useLightDark();

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("modeHintSeen", "true");
  }, []);

  useEffect(() => {
    // Only show if not already seen this session
    const seen = sessionStorage.getItem("modeHintSeen");
    if (seen) return;

    // Show after 3.5s delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto dismiss after 8 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => handleDismiss(), 8000);
    return () => clearTimeout(timer);
  }, [visible, handleDismiss]);

  // Don't render if already dismissed or in designer mode
  if (dismissed || mode === "designer") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mode-hint"
          className="fixed z-[99995] pointer-events-auto"
          style={{ top: "76px", right: "24px" }}
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          {/* Arrow pointing up to toggle */}
          <div
            className="absolute -top-2 right-10 w-3 h-3 rotate-45"
            style={{
              background: isDev
                ? "rgba(201,168,76,0.95)"
                : "#e63946",
              boxShadow: isDev
                ? "0 0 8px rgba(201,168,76,0.5)"
                : "0 0 8px rgba(230,57,70,0.6)",
            }}
          />

          {/* Tooltip card */}
          <div
            className={cn(
              "relative flex flex-col gap-3 p-4 max-w-[220px]",
              isDev
                ? cn(
                    "mode-hint-surface rounded-xl border backdrop-blur-[20px]",
                    isLight
                      ? "border-[rgba(201,168,76,0.28)] bg-[rgba(255,252,247,0.97)] shadow-[0_10px_36px_rgba(62,48,28,0.08)]"
                      : "border-[rgba(201,168,76,0.28)] bg-[rgba(10,10,11,0.96)] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(201,168,76,0.12)]",
                  )
                : isLight
                  ? "mode-hint-surface rounded-xl border-2 border-[#e63946]/35 bg-[rgba(255,252,247,0.98)] shadow-[0_8px_28px_rgba(62,48,28,0.08)]"
                  : "border-2 border-[#e63946] bg-[#0a0a0a] shadow-[4px_4px_0px_#e63946]",
            )}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className={cn(
                "absolute top-2.5 right-2.5 w-5 h-5",
                "flex items-center justify-center",
                "transition-all duration-150",
                isDev
                  ? isLight
                    ? "rounded-full text-[rgba(42,36,30,0.35)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[rgba(28,22,18,0.75)]"
                    : "text-[#f0ece4]/30 hover:text-[#f0ece4]/70 rounded-full hover:bg-white/5"
                  : "text-[#e63946]/40 hover:text-[#e63946]",
              )}
            >
              <X className="w-3 h-3" />
            </button>

            {/* Icon + heading row */}
            <div className="flex items-center gap-2.5 pr-4">
              {/* Animated toggle icon */}
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center flex-shrink-0",
                  isDev ? "rounded-lg" : "",
                )}
                style={
                  isDev
                    ? {
                        background: "rgba(201,168,76,0.12)",
                        border: "1px solid rgba(201,168,76,0.35)",
                      }
                    : {
                        border: "2px solid #e63946",
                        background: "transparent",
                      }
                }
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles
                    className="w-4 h-4"
                    style={{ color: isDev ? "#c9a84c" : "#e63946" }}
                  />
                </motion.div>
              </div>

              <div>
                <p
                  className={cn(
                    "font-mono text-xs font-semibold leading-tight",
                    isDev
                      ? isLight
                        ? "text-[#1c1612]"
                        : "text-[#f0ece4]"
                      : "text-[#e63946] uppercase tracking-wide",
                  )}
                >
                  {isDev ? "Try designer mode" : "TRY DESIGNER MODE"}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-mono text-[10px] leading-relaxed",
                    isDev
                      ? isLight
                        ? "text-[rgba(42,36,30,0.5)]"
                        : "text-[#f0ece4]/40"
                      : "text-white/30",
                  )}
                >
                  {isDev
                    ? "Hit the toggle — different vibe"
                    : "SWITCH THE TOGGLE ↑"}
                </p>
              </div>
            </div>

            {/* Progress bar — auto dismiss timer */}
            <div
              className={cn(
                "w-full overflow-hidden",
                isDev ? "rounded-full h-px" : "h-0.5",
              )}
              style={{
                background: isDev
                  ? isLight
                    ? "rgba(201,168,76,0.15)"
                    : "rgba(255,255,255,0.06)"
                  : "rgba(230,57,70,0.15)",
              }}
            >
              <motion.div
                className="h-full"
                style={{
                  background: isDev
                    ? "linear-gradient(90deg, #c9a84c, #e8d5a3)"
                    : "#e63946",
                }}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
