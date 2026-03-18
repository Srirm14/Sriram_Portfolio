"use client";

import Image from "next/image";
import type { Mode } from "@/types";

export interface HeroPhotoProps {
  mode: Mode;
}

const IMG_SRC = "/images/profile.jpeg";

export function HeroPhoto({ mode }: HeroPhotoProps) {
  const containerClass =
    "relative w-72 h-72 md:w-96 md:h-96 mx-auto flex-shrink-0";

  if (mode === "developer") {
    return (
      <div className="relative inline-block">
        <div
          className="absolute inset-0 rounded-full border border-[#7c3aed]/20 animate-spin"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute inset-4 rounded-full border border-dashed border-[#06b6d4]/15 animate-spin"
          style={{ animationDuration: "18s", animationDirection: "reverse" }}
        />
        <div className={`relative z-10 ${containerClass}`}>
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
    <div className="relative inline-block border-2 border-[#39FF14] shadow-brutal-lg overflow-hidden group">
      <div className={`${containerClass} relative`}>
        <Image
          src={IMG_SRC}
          alt="Sriram Venkatachalam"
          fill
          className="object-cover object-top transition-all duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 288px, 384px"
        />
        {/* Green duotone overlay — parrot tint */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(57, 255, 20, 0.25) 100%)",
          }}
        />
        {/* Halftone/dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.9) 1px, transparent 1px)`,
            backgroundSize: "6px 6px",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 80px 20px rgba(0, 0, 0, 0.4)",
          }}
        />
      </div>
    </div>
  );
}
