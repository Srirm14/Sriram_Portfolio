import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const revalidate = false;
export const alt = "Sriram Venkatachalam — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple/cyan gradient top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          }}
        />

        {/* Availability badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "999px",
            padding: "6px 16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#39FF14",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
            Open to roles · Bengaluru / Remote
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Sriram Venkatachalam
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "40px",
          }}
        >
          Senior Frontend Engineer
        </div>

        {/* Stack pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["React", "Next.js", "TypeScript", "4+ Years"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "6px 16px",
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "rgba(255,255,255,0.2)",
            fontSize: "14px",
          }}
        >
          sriramvenkatachalam.in
        </div>
      </div>
    ),
    { ...size }
  );
}
