import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UCSG - University Consulting Service Group",
  description:
    "Fast, reliable support for international students facing SEVIS termination, university transfers, change of status, and visa issues. Available 24/7.",
  keywords: [
    "UCSG",
    "Day 1 CPT",
    "University Transfers",
    "SEVIS Reinstatement",
    "Change of Status",
    "F-1 Visa",
    "International Students",
    "CPT",
  ],
  openGraph: {
    title: "UCSG - University Consulting Service Group",
    description:
      "Expert support for international students navigating SEVIS termination, university transfers, and visa status challenges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
