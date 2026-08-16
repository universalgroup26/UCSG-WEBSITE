import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPT MENTOR - University Transfers & SEVIS Support",
  description:
    "Enroll in an accredited graduate program with Integral CPT. University transfers, Day 1 CPT, Change of Status, SEVIS Reinstatement, and STEM OPT Denials support.",
  keywords: [
    "CPT",
    "Day 1 CPT",
    "University Transfers",
    "SEVIS",
    "F1 Visa",
    "STEM OPT",
    "CPT Mentor",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CPT MENTOR - University Transfers & SEVIS Support",
    description:
      "Enroll in an accredited graduate program with Integral CPT.",
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
      <body className={`${inter.variable} antialiased bg-white text-[#111827]`}>
        {children}
      </body>
    </html>
  );
}
