import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/data";

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

const title = "Cydric James Bulan — Software Developer";
const description =
  "Software developer in Bulacan, PH. Built a courtroom simulation game, freelance web and mobile systems, and AR learning tools — eleven shipped projects so far.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Cydric James Bulan",
    images: [{ url: "/profile-cutout.png", width: 1200, height: 1200 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/profile-cutout.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cydric James Bulan",
  url: SITE_URL,
  image: `${SITE_URL}/profile-cutout.png`,
  jobTitle: "Software Developer",
  email: `mailto:${EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Bulacan",
    addressCountry: "PH",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
