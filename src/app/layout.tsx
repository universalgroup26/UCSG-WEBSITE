import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UCSG — Universal Consulting Service Group",
  description:
    "UCSG specializes in connecting students to affordable, well-ranked colleges and universities that offer hybrid programs, CPT/OPT opportunities, and real-world experience. Founded by Joy Chowdhury in New York City.",
  keywords: [
    "UCSG",
    "Universal Consulting Service Group",
    "Day 1 CPT",
    "University Transfers",
    "SEVIS Reinstatement",
    "Change of Status",
    "F-1 Visa",
    "International Students",
    "CPT",
    "OPT",
    "STEM OPT",
    "Study in USA",
    "H-1B Visa",
    "Immigration Consultation",
  ],
  openGraph: {
    title: "UCSG — Universal Consulting Service Group",
    description:
      "UCSG specializes in connecting students to affordable, well-ranked colleges and universities that offer hybrid programs, CPT/OPT opportunities. Driven by students' happiness.",
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
