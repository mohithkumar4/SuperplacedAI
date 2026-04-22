import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SuperPlaced AI — Career Acceleration Platform",
  description:
    "AI-powered career agents that analyze your resume, fill skill gaps, simulate interviews, and connect you to real hiring opportunities on Mercor, Scale AI, and Outlier.",
  keywords: [
    "AI career platform",
    "resume analyzer",
    "job matching AI",
    "Mercor",
    "Scale AI",
    "Outlier",
    "career acceleration",
  ],
  authors: [{ name: "Mohith", url: "https://superplaced.in" }],
  openGraph: {
    title: "SuperPlaced AI",
    description: "From raw potential to job-ready talent. Powered by AI agents.",
    url: "https://superplaced.in",
    siteName: "SuperPlaced AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SuperPlaced AI" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperPlaced AI — Career Acceleration",
    description: "AI agents that prepare you and connect you to real hiring pipelines.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
