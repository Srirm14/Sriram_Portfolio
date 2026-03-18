import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  words: string[],
  interval: number = 2500,
): { displayed: string; fading: boolean } {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayed = words[index] ?? words[0] ?? "";

  useEffect(() => {
    if (words.length === 0) return;

    const advanceWord = () => {
      setIndex((i) => (i + 1) % words.length);
      setFading(false);
    };

    const scheduleNext = () => {
      setFading(true);
      timeoutRef.current = setTimeout(advanceWord, 300);
    };

    const timer = setInterval(scheduleNext, interval);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [words, interval]);

  return { displayed, fading };
}
