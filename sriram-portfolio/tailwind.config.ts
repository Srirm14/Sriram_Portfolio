import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Developer mode palette
        dev: {
          bg: "#0a0a0f",
          surface: "#13131a",
          purple: "#7c3aed",
          violet: "#6d28d9",
          cyan: "#06b6d4",
          teal: "#0891b2",
          glow: "rgba(124,58,237,0.25)",
        },
        // Designer mode palette — KLX parrot green brutalism
        design: {
          bg: "#0a0a0a",
          surface: "#111111",
          green: "#39FF14",
          lime: "#84cc16",
          yellow: "#ffe600",
          glow: "rgba(57,255,20,0.25)",
        },
        // shadcn tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-2xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-xl": [
          "3.75rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.25", letterSpacing: "-0.01em" },
        ],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0px",
      },

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        glass: "16px",
        heavy: "32px",
      },

      boxShadow: {
        // Glass shadows
        "glass-sm":
          "0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)",
        glass:
          "0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        "glass-lg":
          "0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.10)",
        "glass-purple":
          "0 4px 24px rgba(124,58,237,0.3), inset 0 0 0 1px rgba(124,58,237,0.2)",
        "glass-cyan":
          "0 4px 24px rgba(6,182,212,0.3),  inset 0 0 0 1px rgba(6,182,212,0.2)",
        // Brutalist shadows
        "brutal-sm": "2px 2px 0px #39FF14",
        brutal: "4px 4px 0px #39FF14",
        "brutal-lg": "6px 6px 0px #39FF14",
        "brutal-xl": "8px 8px 0px #39FF14",
        "brutal-black": "4px 4px 0px #000000",
        // Glow shadows
        "glow-purple":
          "0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)",
        "glow-cyan":
          "0 0 20px rgba(6,182,212,0.5),  0 0 40px rgba(6,182,212,0.2)",
        "glow-green":
          "0 0 20px rgba(57,255,20,0.5),  0 0 40px rgba(57,255,20,0.2)",
      },

      backgroundImage: {
        // Gradients — developer
        "gradient-dev": "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
        "gradient-dev-soft":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)",
        "gradient-dark": "linear-gradient(180deg, #0a0a0f 0%, #13131a 100%)",
        // Gradients — designer
        "gradient-design": "linear-gradient(135deg, #39FF14 0%, #84cc16 100%)",
        "gradient-design-soft":
          "linear-gradient(135deg, rgba(57,255,20,0.15) 0%, rgba(132,204,22,0.15) 100%)",
        // Shimmer
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        "shimmer-green":
          "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.08) 50%, transparent 100%)",
      },

      keyframes: {
        // Glow pulse
        "glow-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          },
          "50%": { opacity: "0.7", boxShadow: "0 0 40px rgba(124,58,237,0.8)" },
        },
        "glow-pulse-green": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(57,255,20,0.4)",
          },
          "50%": { opacity: "0.7", boxShadow: "0 0 40px rgba(57,255,20,0.8)" },
        },
        // Float
        float: {
          "0%, 100%": { transform: "translateY(0px)   rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(2deg)" },
          "66%": { transform: "translateY(-6px)  rotate(-1deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px)   rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(-2deg)" },
          "66%": { transform: "translateY(-8px)  rotate(1deg)" },
        },
        // Shimmer
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Fade up
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Fade in
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Scale in
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // Slide in from left
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        // Typewriter cursor blink
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // Marquee
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // Dot ping for availability badge
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "75%, 100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "shimmer-border": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },

      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "glow-pulse-green": "glow-pulse-green 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-left": "slide-left 0.5s ease-out forwards",
        blink: "blink 1s step-end infinite",
        marquee: "marquee 20s linear infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite",
        "shimmer-border": "shimmer-border 3s ease-in-out infinite",
      },

      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        brutal: "cubic-bezier(0.4, 0, 1, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
