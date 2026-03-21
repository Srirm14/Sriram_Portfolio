"use client";

import { useRef, useLayoutEffect, memo } from "react";

/** Seeded random — deterministic but organic scatter */
function frac(n: number): number {
  return n - Math.floor(n);
}
function rand(seed: number): number {
  return frac(Math.sin(seed) * 43758.5453);
}

function getScatterDots() {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let i = 0; i < 680; i++) {
    dots.push({
      x: 2 + rand(i * 12.9898) * 96,
      y: 2 + rand(i * 78.233) * 96,
      r: Math.min(0.04 + rand(i * 91.1763) * 0.08, 0.12),
      o: Math.min(0.12 + rand(i * 45.271) * 0.26, 0.38),
    });
  }
  return dots;
}

const DOTS = getScatterDots();

const LIGHT_RGB = [154, 123, 76] as const;
const DARK_RGB = [201, 168, 76] as const;

interface HeroDevDotsProps {
  readonly isLight: boolean;
  readonly scrollDir: "down" | "up" | "idle";
}

function HeroDevDotsInner({ isLight, scrollDir }: HeroDevDotsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      const dpr = globalThis.window === undefined ? 1 : Math.min(globalThis.window.devicePixelRatio ?? 1, 2);
      const pw = Math.ceil(w * dpr);
      const ph = Math.ceil(h * dpr);
      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const scaleX = pw / 100;
      const scaleY = ph / 100;
      const scaleR = Math.min(scaleX, scaleY);
      const [r, g, b] = isLight ? LIGHT_RGB : DARK_RGB;

      for (const d of DOTS) {
        ctx.fillStyle = `rgba(${r},${g},${b},${d.o})`;
        ctx.beginPath();
        ctx.arc(d.x * scaleX, d.y * scaleY, d.r * scaleR, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [isLight]);

  const scale = scrollDir === "down" ? 1.1 : scrollDir === "up" ? 0.9 : 1;

  return (
    <div
      className="hero-dev-dots-sand pointer-events-none absolute inset-0 z-[2] will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
      style={{
        transform: `scale(${scale})`,
        contain: "layout paint",
      }}
      aria-hidden
    >
      <div ref={containerRef} className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ contain: "strict" }}
        />
      </div>
    </div>
  );
}

export const HeroDevDots = memo(HeroDevDotsInner);
