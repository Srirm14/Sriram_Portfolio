"use client";

import Image from "next/image";
import type { Mode } from "@/types";

export interface HeroPhotoProps {
  mode: Mode;
}

const IMG_SRC = "/images/profile.jpeg";

export function HeroPhoto({ mode }: HeroPhotoProps) {
  if (mode === "developer") {
    return (
      <div className="relative inline-flex items-center justify-center">
        {/* Ring 1 — outermost, slowest, gold gradient arc */}
        <div
          className="absolute rounded-full animate-spin"
          style={{
            width: "calc(100% + 72px)",
            height: "calc(100% + 72px)",
            animationDuration: "6s",
            border: "1.5px solid transparent",
            borderTopColor: "#c9a84c",
            borderRightColor: "rgba(201,168,76,0.2)",
            borderBottomColor: "transparent",
            borderLeftColor: "rgba(232,213,163,0.45)",
            filter: "drop-shadow(0 0 6px rgba(201,168,76,0.5))",
          }}
        />
        {/* Ring 2 — mid, reverse, champagne arc */}
        <div
          className="absolute rounded-full animate-spin"
          style={{
            width: "calc(100% + 44px)",
            height: "calc(100% + 44px)",
            animationDuration: "4s",
            animationDirection: "reverse",
            border: "1px solid transparent",
            borderTopColor: "rgba(232,213,163,0.85)",
            borderRightColor: "transparent",
            borderBottomColor: "rgba(232,213,163,0.35)",
            borderLeftColor: "transparent",
            filter: "drop-shadow(0 0 4px rgba(232,213,163,0.4))",
          }}
        />
        {/* Ring 3 — innermost, fastest, dashed gold */}
        <div
          className="absolute rounded-full animate-spin"
          style={{
            width: "calc(100% + 20px)",
            height: "calc(100% + 20px)",
            animationDuration: "2.5s",
            border: "1px dashed rgba(201,168,76,0.45)",
            filter: "drop-shadow(0 0 3px rgba(201,168,76,0.35))",
          }}
        />
        {/* Glow radial behind image */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "calc(100% + 80px)",
            height: "calc(100% + 80px)",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(232,213,163,0.08) 50%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />
        {/* Animated glow pulse ring */}
        <div
          className="absolute rounded-full animate-glow-pulse pointer-events-none"
          style={{
            width: "calc(100% + 32px)",
            height: "calc(100% + 32px)",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Gradient border ring around image */}
        <div
          className="absolute rounded-full z-10"
          style={{
            inset: "-2px",
            padding: "2px",
            background:
              "linear-gradient(135deg, #c9a84c 0%, #e8d5a3 50%, #c9a84c 100%)",
            borderRadius: "9999px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* Image */}
        <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)",
            }}
          />
          <Image
            src={IMG_SRC}
            alt="Sriram Venkatachalam"
            fill
            className="object-cover object-top rounded-full"
            priority
            sizes="(max-width: 768px) 288px, 384px"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glitch offset layer 1 — cyan */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          width: "calc(100% + 4px)",
          height: "calc(100% + 4px)",
          transform: "translate(4px, -4px)",
          border: "2px solid rgba(6,182,212,0.5)",
        }}
      >
        <Image
          src={IMG_SRC}
          alt=""
          fill
          className="object-cover object-top opacity-40"
          sizes="(max-width: 768px) 288px, 384px"
          style={{ filter: "hue-rotate(120deg) saturate(2)" }}
          aria-hidden
        />
      </div>
      {/* Glitch offset layer 2 — red */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          width: "calc(100% + 4px)",
          height: "calc(100% + 4px)",
          transform: "translate(-4px, 4px)",
          border: "2px solid rgba(255,45,45,0.4)",
        }}
      >
        <Image
          src={IMG_SRC}
          alt=""
          fill
          className="object-cover object-top opacity-30"
          sizes="(max-width: 768px) 288px, 384px"
          style={{ filter: "hue-rotate(240deg) saturate(2)" }}
          aria-hidden
        />
      </div>
      {/* Main image — hard brutalist border */}
      <div
        className="relative z-10 w-72 h-72 md:w-96 md:h-96
                   flex-shrink-0 overflow-hidden group"
        style={{
          border: "2px solid #e63946",
          boxShadow: "6px 6px 0px #e63946, -2px -2px 0px rgba(230,57,70,0.2)",
        }}
      >
        <Image
          src={IMG_SRC}
          alt="Sriram Venkatachalam"
          fill
          className="object-cover object-top
                     transition-all duration-300
                     group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 288px, 384px"
        />
        {/* Parrot green scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(230,57,70,0.03) 2px, rgba(230,57,70,0.03) 4px)",
          }}
        />
        {/* Bottom green gradient fade */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(230,57,70,0.15) 100%)",
          }}
        />
        {/* Corner accent — top left */}
        <div className="absolute top-0 left-0 z-20 pointer-events-none">
          <div className="w-6 h-0.5 bg-[#e63946]" />
          <div className="w-0.5 h-6 bg-[#e63946]" />
        </div>
        {/* Corner accent — bottom right */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-none">
          <div className="w-6 h-0.5 bg-[#e63946] ml-auto" />
          <div className="w-0.5 h-6 bg-[#e63946] ml-auto" />
        </div>
      </div>
      {/* Hard shadow label */}
      <div
        className="absolute -bottom-8 left-0 right-0
                   flex justify-center"
      >
        <span
          className="font-mono text-xs text-[#e63946]/50 uppercase
                     tracking-widest"
        >
          sriram.v
        </span>
      </div>
    </div>
  );
}
