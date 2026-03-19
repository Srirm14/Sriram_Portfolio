"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useModeStore } from "@/store";
import { cn } from "@/lib/utils";

export function ModeHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";

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
                ? "rgba(124,58,237,0.9)"
                : "#39FF14",
              boxShadow: isDev
                ? "0 0 8px rgba(124,58,237,0.6)"
                : "0 0 8px rgba(57,255,20,0.6)",
            }}
          />

          {/* Tooltip card */}
          <div
            className={cn(
              "relative flex flex-col gap-3 p-4 max-w-[220px]",
              isDev
                ? "rounded-xl backdrop-blur-[20px] bg-[rgba(10,10,15,0.95)] border border-[rgba(124,58,237,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(124,58,237,0.15)]"
                : "border-2 border-[#39FF14] bg-[#0a0a0a] shadow-[4px_4px_0px_#39FF14]",
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
                  ? "text-white/25 hover:text-white/60 rounded-full hover:bg-white/5"
                  : "text-[#39FF14]/40 hover:text-[#39FF14]",
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
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                      }
                    : {
                        border: "2px solid #39FF14",
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
                    style={{ color: isDev ? "#7c3aed" : "#39FF14" }}
                  />
                </motion.div>
              </div>

              <div>
                <p
                  className={cn(
                    "font-mono text-xs font-semibold leading-tight",
                    isDev ? "text-white" : "text-[#39FF14] uppercase tracking-wide",
                  )}
                >
                  {isDev ? "Try designer mode" : "TRY DESIGNER MODE"}
                </p>
                <p
                  className={cn(
                    "font-mono text-[10px] mt-0.5 leading-relaxed",
                    isDev ? "text-white/35" : "text-white/30",
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
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(57,255,20,0.15)",
              }}
            >
              <motion.div
                className="h-full"
                style={{
                  background: isDev
                    ? "linear-gradient(90deg, #7c3aed, #06b6d4)"
                    : "#39FF14",
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
