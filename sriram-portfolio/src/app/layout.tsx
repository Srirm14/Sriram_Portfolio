import type { Metadata } from "next";
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
  title: "Sriram Venkatachalam — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 4+ years building large-scale React and Next.js applications. Open to roles in Bengaluru and Remote.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Product Designer",
    "Bengaluru",
  ],
  authors: [{ name: "Sriram Venkatachalam" }],
  openGraph: {
    title: "Sriram Venkatachalam — Senior Frontend Engineer",
    description:
      "Building fast, scalable products with React & Next.js",
    url: "https://sriramvenkatachalam.in",
    siteName: "Sriram Venkatachalam",
    type: "website",
  },
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
