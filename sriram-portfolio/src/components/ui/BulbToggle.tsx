"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLightDark } from "@/context/LightDarkContext";
import { useModeStore } from "@/store";
import { cn } from "@/lib/utils";

export function BulbToggle() {
  const { isLight, toggleLightDark } = useLightDark();
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";

  const wireColor = isDev
    ? isLight
      ? "rgba(166,139,82,0.55)"
      : "rgba(201,168,76,0.38)"
    : isLight
      ? "rgba(230,57,70,0.5)"
      : "rgba(230,57,70,0.35)";

  const bulbGlow = isDev
    ? isLight
      ? "rgba(232,213,163,0.95)"
      : "rgba(249,228,74,0.25)"
    : isLight
      ? "#f9e44a"
      : "rgba(249,228,74,0.2)";

  const bulbStroke = isDev
    ? isLight
      ? "#8b7355"
      : "rgba(201,168,76,0.45)"
    : isLight
      ? "#e63946"
      : "rgba(230,57,70,0.4)";

  return (
    <button
      type="button"
      onClick={toggleLightDark}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="group relative flex cursor-pointer select-none flex-col items-center"
      style={{ width: "28px", height: "52px", marginTop: "-8px" }}
    >
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "1.5px",
          height: "24px",
          background: wireColor,
          transformOrigin: "top center",
        }}
        animate={{
          rotate: isLight ? [0, 3, -3, 2, -1, 0] : [0, -3, 3, -2, 1, 0],
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute"
        style={{ top: "20px" }}
        animate={{
          rotate: isLight ? [0, 4, -4, 2, -1, 0] : [0, -4, 4, -2, 1, 0],
          y: isLight ? [0, 1, 0] : [0, -1, 0],
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isLight && (
            <motion.circle
              cx="10"
              cy="10"
              r="10"
              fill={bulbGlow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, r: 12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ filter: "blur(6px)" }}
            />
          )}

          <motion.path
            d="M6 16 C2 13 2 7 6 4 Q10 1 14 4 C18 7 18 13 14 16 L13.5 18 L6.5 18 Z"
            fill={isLight ? bulbGlow : "transparent"}
            stroke={bulbStroke}
            strokeWidth={isLight ? "1" : "1.2"}
            animate={{
              fill: isLight ? bulbGlow : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence>
            {isLight && (
              <motion.path
                d="M8.5 13 L9.5 11 L10.5 13 L11.5 11"
                stroke="#c8860a"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          <rect
            x="6.5"
            y="18"
            width="7"
            height="2"
            rx="0.5"
            fill={bulbStroke}
            opacity={isLight ? 0.7 : 0.4}
          />
          <rect
            x="7"
            y="20"
            width="6"
            height="2"
            rx="0.5"
            fill={bulbStroke}
            opacity={isLight ? 0.6 : 0.35}
          />
          <rect
            x="8.5"
            y="22"
            width="3"
            height="2"
            rx="0.5"
            fill={bulbStroke}
            opacity={isLight ? 0.5 : 0.3}
          />

          <AnimatePresence>
            {isLight && (
              <motion.line
                x1="8"
                y1="5"
                x2="7"
                y2="9"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

      <div
        className={cn(
          "absolute -bottom-6 left-1/2 -translate-x-1/2",
          "whitespace-nowrap font-mono text-[9px]",
          "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          isDev ? "text-[rgba(42,36,30,0.35)]" : "text-[#e63946]/40",
        )}
      >
        {isLight ? "dark" : "light"}
      </div>
    </button>
  );
}
