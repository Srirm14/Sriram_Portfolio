"use client";

interface KtmBgProps {
  opacity?: number;
  isLight?: boolean;
}

export function KtmBg({ opacity = 1, isLight = true }: KtmBgProps) {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none [contain:paint]"
      data-bg={isLight ? "ktm" : "ktm-dark"}
      aria-hidden
      style={{
        opacity,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Dot texture — light mode */}
      {isLight && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(232,93,0,0.06) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {/* Dark mode — minimal noise or removed */}
      {!isLight && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            mixBlendMode: "soft-light",
            transition: "opacity 0.5s ease",
          }}
          aria-hidden
        />
      )}

      {/* Dark mode — subtle glitch strip on right edge */}
      {!isLight && (
        <div
          className="absolute inset-y-0 right-0 w-[10%] max-w-[140px] overflow-hidden pointer-events-none"
          aria-hidden
        >
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 100 900"
          >
            <defs>
              <linearGradient id="ktm-glitch-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#080808" stopOpacity="0" />
                <stop offset="50%" stopColor="#080808" stopOpacity="0" />
                <stop offset="100%" stopColor="#080808" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Skewed glitch lines — orange */}
            {[140, 320, 500, 680].map((y) => (
              <line
                key={`glo-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y + 6}
                stroke="#e85d00"
                strokeWidth="0.6"
                opacity="0.25"
              />
            ))}
            {/* Skewed glitch lines — silver */}
            {[220, 400, 580].map((y) => (
              <line
                key={`gls-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y - 4}
                stroke="#b0b8c1"
                strokeWidth="0.4"
                opacity="0.18"
              />
            ))}
            <rect
              width="100%"
              height="100%"
              fill="url(#ktm-glitch-fade)"
            />
          </svg>
        </div>
      )}

      {/* Ambient glow — dark only, reduced */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          right: "-100px",
          bottom: "-100px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle,rgba(232,93,0,0.06) 0%,transparent 65%)",
          filter: "blur(36px)",
          opacity: isLight ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
        aria-hidden
      />

      {/* Silver glow — dark only, top right, reduced */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          right: "0",
          top: "0",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(176,184,193,0.03) 0%,transparent 65%)",
          filter: "blur(32px)",
          opacity: isLight ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 900"
        style={{ transition: "all 0.5s ease" }}
      >
        <defs>
          {/* Shared fade mask — white = visible, black = hidden (luminance mode) */}
          <linearGradient id="ktm-fade-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="5%" stopColor="#fff" stopOpacity="1" />
            <stop offset="95%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="ktm-mask-v">
            <rect width="1200" height="900" fill="url(#ktm-fade-v)" />
          </mask>

        </defs>

        <g mask="url(#ktm-mask-v)">
          {/* ── LEFT SIDE — always present ── */}

          {/* Main orange bar */}
          <rect
            x="0"
            y="0"
            width="5"
            height="900"
            fill="#e85d00"
            opacity={isLight ? 0.7 : 0.35}
          />
          {/* Secondary bar */}
          <rect
            x="48"
            y="0"
            width="1"
            height="900"
            fill="#e85d00"
            opacity={isLight ? 0.22 : 0.1}
          />
          {/* Triangle corner */}
          <polygon
            points="0,0 72,0 0,72"
            fill="#e85d00"
            opacity={isLight ? 0.25 : 0.12}
          />

          {/* Horizontal branches — left */}
          {[
            { y: 140, w: 90 },
            { y: 300, w: 130 },
            { y: 480, w: 90 },
            { y: 660, w: 110 },
            { y: 820, w: 80 },
          ].map(({ y, w }, i) => (
            <rect
              key={`lb-${i}`}
              x="0"
              y={y}
              width={w}
              height="2"
              fill="#e85d00"
              opacity={isLight ? [0.55, 0.45, 0.5, 0.42, 0.48][i] : 0.18}
            />
          ))}

          {/* Tick marks — left */}
          {[70, 140, 210, 280, 350, 420, 490, 560, 630, 700, 770, 840].map(
            (y, i) => (
              <rect
                key={`lt-${i}`}
                x="0"
                y={y}
                width={i % 3 === 0 ? 22 : 11}
                height="1"
                fill="#e85d00"
                opacity={
                  i % 3 === 0
                    ? isLight
                      ? 0.5
                      : 0.18
                    : isLight
                      ? 0.25
                      : 0.08
                }
              />
            )
          )}

          {/* ── RIGHT SIDE ── */}
          <rect
            x="1195"
            y="0"
            width="5"
            height="900"
            fill={isLight ? "#e85d00" : "#b0b8c1"}
            opacity={isLight ? 0.45 : 0.22}
          />
          <rect
            x="1151"
            y="0"
            width="1"
            height="900"
            fill={isLight ? "#e85d00" : "#b0b8c1"}
            opacity={isLight ? 0.15 : 0.06}
          />
          <polygon
            points="1200,900 1128,900 1200,828"
            fill={isLight ? "#e85d00" : "#b0b8c1"}
            opacity={isLight ? 0.2 : 0.08}
          />

          {/* Right branches */}
          {[
            { y: 200, w: 90 },
            { y: 440, w: 130 },
            { y: 680, w: 80 },
          ].map(({ y, w }, i) => (
            <rect
              key={`rb-${i}`}
              x={1200 - w}
              y={y}
              width={w}
              height="2"
              fill={isLight ? "#e85d00" : "#b0b8c1"}
              opacity={isLight ? [0.32, 0.28, 0.3][i] : 0.1}
            />
          ))}

          {/* Corner marks — dark mode only, very subtle */}
          {!isLight &&
            [
              { x: 16, y: 16, dx: 40, dy: 40 },
              { x: 1184, y: 16, dx: -40, dy: 40 },
              { x: 16, y: 884, dx: 40, dy: -40 },
              { x: 1184, y: 884, dx: -40, dy: -40 },
            ].map(({ x, y, dx, dy }, i) => (
              <g
                key={`cm-${i}`}
                stroke="#b0b8c1"
                strokeWidth="0.8"
                opacity="0.15"
                fill="none"
              >
                <line x1={x} y1={y} x2={x + dx} y2={y} />
                <line x1={x} y1={y} x2={x} y2={y + dy} />
              </g>
            ))}

          {/* Center vertical — light mode only */}
          {isLight && (
            <line
              x1="600"
              y1="0"
              x2="600"
              y2="900"
              stroke="#e85d00"
              strokeWidth="0.3"
              opacity="0.03"
              strokeDasharray="6 20"
            />
          )}

        </g>
      </svg>

      {/* Edge fades — color transitions smoothly */}
      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,${
            isLight ? "#fff8f2" : "#080808"
          },transparent)`,
          transition: "background 0.5s ease",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to top,${
            isLight ? "#fff8f2" : "#080808"
          },transparent)`,
          transition: "background 0.5s ease",
        }}
      />
    </div>
  );
}
