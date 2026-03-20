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
  }, []);

  useEffect(() => {
    // Show immediately — always visible for testing
    setVisible(true);
  }, []);

  // Don't render if already dismissed
  if (dismissed) return null;

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
                : "var(--theme-primary,#e85d00)",
              boxShadow: isDev
                ? "0 0 8px rgba(201,168,76,0.5)"
                : "0 0 8px rgba(232,93,0,0.6)",
            }}
          />

          {/* Tooltip card */}
          <div
            className={cn(
              "relative flex flex-col gap-3 p-4 max-w-[260px]",
              isDev
                ? cn(
                    "mode-hint-surface rounded-xl border backdrop-blur-[20px]",
                    isLight
                      ? "border-[rgba(201,168,76,0.28)] bg-[rgba(255,252,247,0.97)] shadow-[0_10px_36px_rgba(62,48,28,0.08)]"
                      : "border-[rgba(201,168,76,0.28)] bg-[rgba(10,10,11,0.96)] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(201,168,76,0.12)]",
                  )
                : isLight
                  ? "mode-hint-surface rounded-xl border-2 border-[var(--theme-primary,#e85d00)]/35 bg-[rgba(255,252,247,0.98)] shadow-[0_8px_28px_rgba(62,48,28,0.08)]"
                  : "border-2 border-[var(--theme-primary,#e85d00)] bg-[#0a0a0a] shadow-[4px_4px_0px_var(--theme-primary,#e85d00)]",
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
                  : "text-[var(--theme-primary,#e85d00)]/40 hover:text-[var(--theme-primary,#e85d00)]",
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
                        border: "2px solid var(--theme-primary,#e85d00)",
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
                    style={{ color: isDev ? "#c9a84c" : "var(--theme-primary,#e85d00)" }}
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
                      : "text-[var(--theme-primary,#e85d00)] uppercase tracking-wide",
                  )}
                >
                  {isDev ? "Try designer mode" : "Try developer mode"}
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
                  Expert in both frontend & design — switch to see both
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
