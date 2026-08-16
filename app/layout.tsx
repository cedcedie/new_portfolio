import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cydric James Bulan — Software Developer",
  description:
    "Software developer building full-stack web apps, mobile products & 2D games — from first scope to deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
