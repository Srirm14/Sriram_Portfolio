"use client";

import { useRef, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { useTerminalType, type TerminalLine } from "@/hooks/useTerminalType";

export interface SkillTerminalProps {
  onComplete?: () => void;
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: "blank", content: "", delay: 400 },
  { type: "command", content: "whoami", delay: 300 },
  {
    type: "output",
    content: "sriram@portfolio",
    delay: 120,
    color: "#06b6d4",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "ls skills/", delay: 500 },
  {
    type: "output",
    content:
      "frameworks/  state/  styling/  forms/  testing/  tooling/",
    delay: 150,
    color: "#7c3aed",
  },
  { type: "blank", content: "", delay: 300 },
  { type: "command", content: "cat skills/frameworks", delay: 600 },
  {
    type: "output",
    content:
      "TypeScript  JavaScript  Next.js  React  Angular  React Native",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "cat skills/state", delay: 500 },
  {
    type: "output",
    content: "Zustand  Redux  TanStack Query",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "cat skills/styling", delay: 500 },
  {
    type: "output",
    content: "Tailwind CSS  Material UI  Design Systems",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "cat skills/forms", delay: 500 },
  {
    type: "output",
    content: "Formily  React Hook Form  TipTap",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "cat skills/testing", delay: 500 },
  {
    type: "output",
    content: "Playwright (E2E)",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 200 },
  { type: "command", content: "cat skills/tooling", delay: 500 },
  {
    type: "output",
    content: "Git  Vercel  Figma",
    delay: 150,
    color: "#a78bfa",
  },
  { type: "blank", content: "", delay: 300 },
  {
    type: "command",
    content: 'echo "years of experience"',
    delay: 700,
  },
  { type: "output", content: "4+", delay: 120, color: "#06b6d4" },
  { type: "blank", content: "", delay: 200 },
  {
    type: "command",
    content: 'echo "ready for hire"',
    delay: 600,
  },
  { type: "output", content: "true ✓", delay: 120, color: "#39FF14" },
  { type: "blank", content: "", delay: 200 },
];

export function SkillTerminal({ onComplete }: SkillTerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { visibleLines, isComplete, restart } =
    useTerminalType(TERMINAL_LINES);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines]);

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <div className="glass-card rounded-xl overflow-hidden w-full max-w-2xl mx-auto">
      {/* Terminal title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-white/30">
          sriram@portfolio — skills
        </span>
        <button
          type="button"
          onClick={restart}
          className="font-mono text-xs text-white/20 hover:text-[#7c3aed] transition-colors duration-200 flex items-center gap-1"
        >
          <RotateCw className="w-3 h-3" />
          replay
        </button>
      </div>

      {/* Terminal body */}
      <div
        className="p-5 font-mono text-sm leading-relaxed min-h-[420px] max-h-[520px] overflow-y-auto"
        style={{ background: "rgba(10,10,15,0.95)" }}
      >
        {visibleLines.map((line, index) => (
          <div key={index} className="flex items-start gap-0">
            {line.type === "blank" && <div className="h-4" />}

            {line.type === "command" && (
              <div className="flex items-center gap-2 w-full">
                <span className="text-[#7c3aed] select-none flex-shrink-0">
                  <span className="text-[#06b6d4]">~/portfolio</span>
                  <span className="text-white/40"> $ </span>
                </span>
                <span className="text-white">{line.content}</span>
              </div>
            )}

            {line.type === "output" && (
              <div className="pl-0 w-full">
                <span
                  className="leading-relaxed"
                  style={{ color: line.color ?? "#a78bfa" }}
                >
                  {line.content}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Blinking cursor at end */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#06b6d4]">~/portfolio</span>
          <span className="text-white/40"> $ </span>
          <span className="w-2 h-4 bg-[#7c3aed] animate-blink inline-block" />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
