import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const SITE_URL = "https://www.universalconsultingservices.com";
const SITE_NAME = "UCSG — Universal Consulting Service Group";
const SITE_DESCRIPTION =
  "UCSG provides personalized educational guidance for F-1 students in the USA. Compare transfer-friendly universities, hybrid graduate programs, and get clear guidance on your educational journey.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "UCSG — F-1 Student Guidance | U.S. University Transfer & Graduate Programs",
    template: "%s | UCSG",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "UCSG",
    "Universal Consulting Service Group",
    "F-1 university transfer",
    "hybrid graduate programs international students",
    "Master programs F-1 students",
    "OPT STEM OPT planning",
    "CPT educational resources",
    "international student support New York",
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
    "Hybrid Programs USA",
    "Trine University CPT",
    "Monroe University CPT",
    "Westcliff University CPT",
    "Curry College CPT",
    "National Louis University CPT",
    "McDaniel College CPT",
    "Indiana Wesleyan University CPT",
    "Avila University Arizona CPT",
    "Day 1 CPT Chicago",
    "Day 1 CPT Maryland",
    "Day 1 CPT Indiana",
    "Day 1 CPT Arizona",
  ],
  authors: [
    { name: "Joy Chowdhury", url: "https://www.linkedin.com/company/81566580/" },
  ],
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
    title:
      "UCSG — F-1 Student Guidance | U.S. University Transfer & Graduate Programs",
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
        priceRange: "$",
        sameAs: [
          "https://www.instagram.com/universalconsultingsvc/",
          "https://www.linkedin.com/company/81566580/",
          "https://twitter.com/UniversalCons16",
          "https://www.facebook.com/groups/universalconsultingservices/",
          "https://www.facebook.com/universalconsultingservicesgroup",
        ],
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        serviceType: [
          "Educational Guidance",
          "Program Research",
          "Application Coordination",
          "Student Support",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "UCSG Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Educational Guidance",
                description:
                  "Personalized guidance helping F-1 students explore transfer-friendly universities and hybrid graduate programs that align with their academic and career goals.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Program Research",
                description:
                  "Research and comparison of accredited U.S. university programs, including curriculum details, delivery formats, and enrollment requirements.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Application Coordination",
                description:
                  "Assistance with organizing and submitting university applications, including document preparation and timeline management.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Student Support",
                description:
                  "Ongoing support for international students navigating the U.S. education system, including OPT, STEM OPT, and CPT informational resources.",
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
              text: "Day 1 CPT (Curricular Practical Training) allows F-1 international students to begin off-campus employment from the very first day of their academic program, provided the program's curriculum requires it as an integral part of their studies.",
            },
          },
          {
            "@type": "Question",
            name: "How do I transfer universities with an active F-1 visa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Transferring universities with an active F-1 visa involves coordinating your SEVIS record transfer between your current and new school's designated school officials (DSOs), obtaining a new I-20, and ensuring the new program aligns with your educational goals. UCSG can help you understand and navigate each step.",
            },
          },
          {
            "@type": "Question",
            name: "Can UCSG help with SEVIS termination?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. UCSG provides informational resources and guidance for students whose SEVIS records have been terminated, helping them understand the reinstatement application process and explore options to resume their U.S. education.",
            },
          },
          {
            "@type": "Question",
            name: "What services does UCSG offer for international students?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UCSG offers educational guidance, program research, application coordination, and ongoing student support for F-1 international students in the United States, including informational resources about OPT, STEM OPT, and CPT.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
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
        className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-white text-foreground`}
      >
        {/* GTM noscript fallback — must be immediately after <body> per Google guidelines */}
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K65M9LJW'}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="GTM"
          suppressHydrationWarning
        />
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
        {/* ── GHL Chat Widget ─────────────────────────────────────── */}
        <Script
          id="ghl-chat-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a94415c23454f63fef11477"
          strategy="lazyOnload"
        />
        <ConsentBanner />
      </body>
    </html>
  );
}
