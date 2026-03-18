import { useState, useCallback, useEffect } from "react";

export interface TerminalLine {
  type: "command" | "output" | "blank" | "cursor";
  content: string;
  color?: string;
  delay: number;
}

export interface UseTerminalTypeReturn {
  visibleLines: TerminalLine[];
  isComplete: boolean;
  restart: () => void;
}

export function useTerminalType(
  lines: TerminalLine[],
  autoStart: boolean = true
): UseTerminalTypeReturn {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [runKey, setRunKey] = useState(autoStart ? 1 : 0);

  const restart = useCallback(() => {
    setVisibleLines([]);
    setIsComplete(false);
    setRunKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (runKey === 0) return;

    let totalDelay = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, index) => {
      totalDelay += line.delay;
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (index === lines.length - 1) setIsComplete(true);
      }, totalDelay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [runKey, lines]);

  return { visibleLines, isComplete, restart };
}
