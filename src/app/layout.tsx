import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://www.universalconsultingservices.com";
const SITE_NAME = "UCSG — Universal Consulting Service Group";
const SITE_DESCRIPTION =
  "UCSG connects international students to affordable, accredited U.S. universities offering hybrid programs, Day 1 CPT, OPT, SEVIS reinstatement, and visa guidance. U.S. Army Veteran-owned business in Jackson Heights, New York.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UCSG — Universal Consulting Service Group | Day 1 CPT & U.S. University Admissions",
    template: "%s | UCSG",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "UCSG",
    "Universal Consulting Service Group",
    "Day 1 CPT",
    "Day 1 CPT universities",
    "University Transfers",
    "SEVIS Reinstatement",
    "Change of Status",
    "F-1 Visa",
    "International Students USA",
    "CPT",
    "OPT",
    "STEM OPT",
    "Study in USA",
    "H-1B Visa",
    "Immigration Consultation",
    "US University Admission",
    "Jackson Heights NY",
    "Joy Chowdhury",
    "U.S. Army Veteran-owned",
    "SEVP Certified",
    "Hybrid Programs USA",
    "Trine University CPT",
    "Monroe University CPT",
    "Westcliff University CPT",
    "Curry College CPT",
  ],
  authors: [{ name: "Joy Chowdhury", url: "https://www.linkedin.com/company/81566580/" }],
  creator: "UCSG — Universal Consulting Service Group",
  publisher: "UCSG — Universal Consulting Service Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "UCSG — Universal Consulting Service Group | Day 1 CPT & U.S. University Admissions",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/ucsg-logo.png",
        width: 512,
        height: 512,
        alt: "UCSG Logo — Universal Consulting Service Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UCSG — Universal Consulting Service Group",
    description: SITE_DESCRIPTION,
    images: ["/ucsg-logo.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/ucsg-logo.png",
    apple: "/ucsg-logo.png",
  },
  category: "Education",
};

// Cloudflare Web Analytics token
const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN || '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: "Universal Consulting Service Group",
        alternateName: "UCSG",
        url: SITE_URL,
        logo: `${SITE_URL}/ucsg-logo.png`,
        image: `${SITE_URL}/ucsg-logo.png`,
        description: SITE_DESCRIPTION,
        telephone: "+1-302-893-5594",
        email: "Info@universalconsultingservices.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3707 74th Street, Suite 8 (3rd FL)",
          addressLocality: "Jackson Heights",
          addressRegion: "NY",
          postalCode: "11372",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.7497,
          longitude: -73.8831,
        },
        foundingDate: "2020",
        founder: {
          "@type": "Person",
          name: "Joy Chowdhury",
          jobTitle: "Founder & CEO",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        priceRange: "$",
        sameAs: [
          "https://www.instagram.com/universalconsultingsvc/",
          "https://www.linkedin.com/company/81566580/",
          "https://twitter.com/UniversalCons16",
          "https://www.facebook.com/groups/universalconsultingservices/",
        ],
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        serviceType: [
          "Day 1 CPT Guidance",
          "University Admissions",
          "SEVIS Reinstatement",
          "Change of Status",
          "STEM OPT Support",
          "University Transfers",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "UCSG Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Day 1 CPT University Placement",
                description: "Connect international students to SEVP-certified universities offering Day 1 CPT programs.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SEVIS Reinstatement Support",
                description: "Help students reinstate their SEVIS record after termination.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "University Transfer Assistance",
                description: "Seamless transfer between U.S. universities while maintaining visa status.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Change of Status Guidance",
                description: "Assist with visa status changes for international students in the U.S.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Day 1 CPT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Day 1 CPT (Curricular Practical Training) allows F-1 international students to begin off-campus employment from the very first day of their academic program. UCSG partners with 11+ SEVP-certified universities that offer authorized Day 1 CPT programs.",
            },
          },
          {
            "@type": "Question",
            name: "How do I transfer universities with an active F-1 visa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UCSG handles the complete university transfer process including SEVIS record transfer, new I-20 issuance, and credit evaluation. We work with 11+ partner universities to find the best fit for your academic and career goals.",
            },
          },
          {
            "@type": "Question",
            name: "Can UCSG help with SEVIS termination?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. UCSG specializes in SEVIS reinstatement for students whose records have been terminated. Our experienced team guides you through the reinstatement application process and helps you get back on track with your U.S. education.",
            },
          },
          {
            "@type": "Question",
            name: "What services does UCSG offer for international students?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UCSG offers Day 1 CPT university placement, SEVIS reinstatement, university transfers, change of status guidance, STEM OPT support, and comprehensive visa consultation. We are a U.S. Army Veteran-owned business serving 5,000+ students from 20+ countries.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "UCSG — Universal Consulting Service Group",
        publisher: { "@id": `${SITE_URL}/#business` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-foreground`}
      >
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || ''}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        {children}
        {/* Cloudflare Web Analytics */}
        {CF_ANALYTICS_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
