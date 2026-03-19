"use client";

import { useState, useEffect } from "react";
import { useModeStore } from "@/store";

const DEV_PHRASES = ["React Engineer", "Next.js Architect", "Frontend Lead"];
const DESIGN_PHRASES = ["Product Designer", "UI/UX Engineer", "Design Systems"];

export function Typewriter() {
  const mode = useModeStore((s) => s.mode);
  const phrases = mode === "developer" ? DEV_PHRASES : DESIGN_PHRASES;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < phrase.length) {
            setCharIndex((c) => c + 1);
          } else {
            setIsDeleting(true);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setPhraseIndex((p) => (p + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [phraseIndex, charIndex, isDeleting, phrases]);

  const displayText = phrases[phraseIndex].slice(0, charIndex);
  const isDev = mode === "developer";

  return (
    <span className="inline-flex items-baseline">
      <span
        className={isDev ? "text-[#e8d5a3]" : "text-[#e63946]"}
        style={{ color: isDev ? "#e8d5a3" : "#e63946" }}
      >
        {displayText}
      </span>
      <span
        className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-current"
        style={{ color: isDev ? "#c9a84c" : "#e63946" }}
        aria-hidden
      />
    </span>
  );
}
