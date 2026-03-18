import type { Metadata, Viewport } from "next";
import {
  Inter,
  Poppins,
  Space_Grotesk,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sriramvenkatachalam.in"),
  title: {
    default: "Sriram Venkatachalam — Senior Frontend Engineer",
    template: "%s | Sriram Venkatachalam",
  },
  description:
    "Senior Frontend Engineer with 4+ years building large-scale React and Next.js applications. Open to roles in Bengaluru and Remote. Expert in TypeScript, Next.js, React, TanStack Query, and Design Systems.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Engineer",
    "TypeScript",
    "Frontend Developer Bengaluru",
    "Remote Frontend Engineer India",
    "Design Systems",
    "TanStack Query",
    "Zustand",
    "Product Designer",
    "UI UX Engineer",
  ],
  authors: [{ name: "Sriram Venkatachalam", url: "https://sriramvenkatachalam.in" }],
  creator: "Sriram Venkatachalam",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sriramvenkatachalam.in",
    siteName: "Sriram Venkatachalam",
    title: "Sriram Venkatachalam — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer with 4+ years building scalable products with React & Next.js. Open to roles in Bengaluru / Remote.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sriram Venkatachalam — Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sriram Venkatachalam — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer · React · Next.js · TypeScript · Open to roles in Bengaluru / Remote.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://sriramvenkatachalam.in",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={[
          inter.variable,
          poppins.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          syne.variable,
          "bg-[#0a0a0a] font-sans antialiased",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
