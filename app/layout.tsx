import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B2A22",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ovifarms.com"),
  title: {
    default: "OVI FARMS — Exclusive Land Plotting Near Bhor • 40 Minutes From Pune",
    template: "%s | OVI FARMS",
  },
  description:
    "Where Heritage Meets Living. Rare large-format plotted estates (11,000 sq.ft onwards) in Ghavar valley, near Bhor. Encircled by Rajgad, Torna, Sinhagad & Purandar forts, just 40 minutes from Pune. Clubhouse, infinity pool, and 7 fruit plants per plot.",
  keywords: [
    "OVI FARMS",
    "farmhouse plots near Bhor",
    "land plotting Pune",
    "plots near Rajgad fort",
    "Ghavar valley plots",
    "premium plots 40 minutes from Pune",
    "plots near Torna fort",
    "clear title agricultural land Bhor",
  ],
  authors: [{ name: "OVI FARMS" }],
  creator: "OVI FARMS",
  publisher: "OVI FARMS • Premier Farmstead Development",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://ovifarms.com",
  },
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
  verification: {
    google: "google-site-verification-ovifarms-official",
  },
  openGraph: {
    title: "OVI FARMS — Exclusive Land Plotting Near Bhor • 40 Minutes From Pune",
    description:
      "Where Heritage Meets Living. Rare large-format plotted estates (11,000 sq.ft onwards) in Ghavar valley, near Bhor. Encircled by Rajgad & Torna forts.",
    url: "https://ovifarms.com",
    siteName: "OVI FARMS",
    images: [
      {
        url: "/images/hero-sahyadri-valley.jpg",
        width: 1200,
        height: 630,
        alt: "OVI FARMS Sahyadri Valley Plotted Estate",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OVI FARMS — Exclusive Land Plotting Near Bhor",
    description: "Where Heritage Meets Living. Plots from 11,000 sq.ft onwards, 40 mins from Pune.",
    images: ["/images/hero-sahyadri-valley.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://ovifarms.com/#organization",
    name: "OVI FARMS",
    legalName: "OVI FARMS — Premier Farmstead Development",
    url: "https://ovifarms.com",
    logo: "https://ovifarms.com/images/ovi-farms-logo.png",
    image: "https://ovifarms.com/images/hero-sahyadri-valley.jpg",
    description: "Exclusive land plotting near Bhor, 40 minutes from Pune. Rare large-format plotted estates (11,000 sq.ft onwards) in Ghavar valley.",
    telephone: "+91 73505 00045",
    email: "surendra@ovifarms.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ghavar Region, Near Bhor",
      addressLocality: "Bhor, Pune",
      addressRegion: "MH",
      postalCode: "412206",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.1500",
      longitude: "73.8500",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "18:30",
      },
    ],
    priceRange: "₹₹₹₹",
    areaServed: ["Pune", "Mumbai", "Maharashtra", "India"],
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can non-agriculturists or salaried professionals buy farmhouse plots at OVI FARMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, absolutely! The legal land conversion, demarcation, and statutory agricultural guidelines have been completely cleared by our legal team. Anyone can legally purchase and register these plots in their individual name with clear title deed and direct mutation entry.",
        },
      },
      {
        "@type": "Question",
        name: "Can I build a private weekend home or farmhouse villa on my plot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Farmhouse construction of up to standard permissible floor area is officially sanctioned. You can build a private luxury wooden cottage, container villa, or brick farmhouse.",
        },
      },
      {
        "@type": "Question",
        name: "What agricultural plantations are provided with each plot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each plot includes 7 pre-planted fruit plants with dedicated drip irrigation, including Kesar Mango, Rajapuri Mango, Chiku, Jackfruit, and Malaysian Green Dwarf Coconut.",
        },
      },
      {
        "@type": "Question",
        name: "What water supply and electrical infrastructure is provided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OVI FARMS features a separate water supply system and electricity supply with a dedicated transformer installed for the estate.",
        },
      },
      {
        "@type": "Question",
        name: "How are the plots demarcated to prevent boundary disputes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every single plot features physical concrete boundary demarcation stones, legal survey numbers, and a live green bio-fence border. The entire estate is enclosed by a secure gated perimeter with 24/7 security personnel and CCTV surveillance.",
        },
      },
    ],
  };

  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ovifarms.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Interactive Masterplan",
        item: "https://ovifarms.com/#masterplan",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing & Investment",
        item: "https://ovifarms.com/#pricing",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Managed Farming",
        item: "https://ovifarms.com/#farming",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Club Amenities",
        item: "https://ovifarms.com/#amenities",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Performance Preconnects for Under 2.5s LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
