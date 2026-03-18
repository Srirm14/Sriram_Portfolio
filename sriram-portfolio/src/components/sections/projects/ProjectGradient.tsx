"use client";

export interface ProjectGradientProps {
  from: string;
  via: string;
  to: string;
  featured?: boolean;
  mode: "developer" | "designer";
}

export function ProjectGradient({
  from,
  via,
  to,
  mode,
}: ProjectGradientProps) {
  if (mode === "developer") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`,
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl"
          style={{ background: from, opacity: 0.3 }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-xl"
          style={{ background: to, opacity: 0.2 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full blur-xl"
            style={{ background: via, opacity: 0.4 }}
          />
        </div>
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${from}22 0%, ${to}11 100%)`,
        }}
      />
      <div
        className="absolute -top-4 -right-4 w-48 h-48 opacity-10"
        style={{
          background: from,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#39FF14]/60" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#39FF14]/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-12 h-0.5 opacity-30"
          style={{ background: from }}
        />
      </div>
    </div>
  );
}
