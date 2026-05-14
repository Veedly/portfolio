import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Danil Deev - Product Designer",
  description: "Product designer portfolio with selected case studies and visual work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="dark" className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="page-shell">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
