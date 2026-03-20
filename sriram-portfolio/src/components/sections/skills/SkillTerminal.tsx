"use client";

import { useRef, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
import { cn } from "@/lib/utils";
import { useTerminalType, type TerminalLine } from "@/hooks/useTerminalType";
import { getYearsOfExperience } from "@/lib/experience";

export interface SkillTerminalProps {
  onComplete?: () => void;
}

/** Readability on cream terminal — deepen default golds in light mode */
function outputTextColor(hex: string | undefined, isLight: boolean): string {
  if (!hex) return isLight ? "#6b5420" : "#e8d5a3";
  if (!isLight) return hex;
  if (hex === "#e8d5a3") return "#6b5420";
  if (hex === "#c9a84c") return "#7a6020";
  return hex;
}

/* Fast typing: reduced delays so content displays in ~2–3s */
const TERMINAL_LINES: TerminalLine[] = [
  { type: "blank", content: "", delay: 80 },
  { type: "command", content: "whoami", delay: 100 },
  {
    type: "output",
    content: "sriram@portfolio",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "ls skills/", delay: 120 },
  {
    type: "output",
    content:
      "frameworks/  state/  styling/  forms/  testing/  tooling/",
    delay: 50,
    color: "#c9a84c",
  },
  { type: "blank", content: "", delay: 80 },
  { type: "command", content: "cat skills/frameworks", delay: 140 },
  {
    type: "output",
    content:
      "TypeScript  JavaScript  Next.js  React  Angular  React Native",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "cat skills/state", delay: 120 },
  {
    type: "output",
    content: "Zustand  Redux  TanStack Query",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "cat skills/styling", delay: 120 },
  {
    type: "output",
    content: "Tailwind CSS  Material UI  Design Systems",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "cat skills/forms", delay: 120 },
  {
    type: "output",
    content: "Formily  React Hook Form  TipTap",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "cat skills/testing", delay: 120 },
  {
    type: "output",
    content: "Playwright (E2E)",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  { type: "command", content: "cat skills/tooling", delay: 120 },
  {
    type: "output",
    content: "Git  Vercel  Figma",
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 80 },
  {
    type: "command",
    content: 'echo "years of experience"',
    delay: 160,
  },
  {
    type: "output",
    content: getYearsOfExperience(),
    delay: 50,
    color: "#e8d5a3",
  },
  { type: "blank", content: "", delay: 60 },
  {
    type: "command",
    content: 'echo "ready for hire"',
    delay: 140,
  },
  { type: "output", content: "true ✓", delay: 50, color: "#c9a84c" },
  { type: "blank", content: "", delay: 60 },
];

export function SkillTerminal({ onComplete }: SkillTerminalProps) {
  const { isLight } = useLightDark();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { visibleLines, isComplete, restart } =
    useTerminalType(TERMINAL_LINES);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [visibleLines]);

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <div
      className="glass-card rounded-xl overflow-hidden w-full max-w-2xl mx-auto flex flex-col h-full min-h-[300px]"
    >
      {/* Terminal title bar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 border-b",
          isLight
            ? "border-[rgba(62,48,28,0.12)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(245,240,230,0.95)_100%)]"
            : "border-white/5 bg-white/3",
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className={cn(
            "font-mono text-xs",
            isLight ? "text-[rgba(42,36,30,0.45)]" : "text-white/30",
          )}
        >
          sriram@portfolio — skills
        </span>
        <button
          type="button"
          onClick={restart}
          className={cn(
            "font-mono text-xs hover:text-[#c9a84c] transition-colors duration-200 flex items-center gap-1",
            isLight ? "text-[rgba(42,36,30,0.4)]" : "text-white/20",
          )}
        >
          <RotateCw className="w-3 h-3" />
          replay
        </button>
      </div>

      {/* Terminal body — fixed height to prevent flex overlap and scroll interference */}
      <div
        className="p-5 font-mono text-sm leading-relaxed overflow-y-auto overscroll-contain"
        style={{
          background: isLight
            ? "linear-gradient(165deg, #faf8f4 0%, #f3efe6 48%, #ebe4d8 100%)"
            : "rgba(10,10,11,0.96)",
          boxShadow: isLight
            ? "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 0 0 1px rgba(201,168,76,0.08)"
            : undefined,
          flex: "1 1 0",
          minHeight: 0,
          maxHeight: "100%",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {visibleLines.map((line, index) => (
          <div key={index} className="flex items-start gap-0">
            {line.type === "blank" && <div className="h-4" />}

            {line.type === "command" && (
              <div className="flex items-center gap-2 w-full">
                <span className="select-none flex-shrink-0">
                  <span
                    className={cn(
                      isLight ? "text-[#8a7038]" : "text-[#e8d5a3]",
                    )}
                  >
                    ~/portfolio
                  </span>
                  <span
                    className={cn(isLight ? "text-[rgba(42,36,30,0.38)]" : "text-white/40")}
                  >
                    {" "}
                    $ 
                  </span>
                </span>
                <span
                  className={cn(isLight ? "text-[#1e1814]" : "text-white")}
                >
                  {line.content}
                </span>
              </div>
            )}

            {line.type === "output" && (
              <div className="pl-0 w-full">
                <span
                  className="leading-relaxed"
                  style={{ color: outputTextColor(line.color, isLight) }}
                >
                  {line.content}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Blinking cursor at end */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className={cn(isLight ? "text-[#8a7038]" : "text-[#e8d5a3]")}
          >
            ~/portfolio
          </span>
          <span
            className={cn(isLight ? "text-[rgba(42,36,30,0.38)]" : "text-white/40")}
          >
            $ 
          </span>
          <span className="w-2 h-4 bg-[#c9a84c] animate-blink inline-block" />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
