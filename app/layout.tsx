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
    default: "OVI FARMS — Luxury Managed Farmhouse Plots & Countryside Estates",
    template: "%s | OVI FARMS",
  },
  description:
    "Buy premium clear-title managed farmhouse plots at OVI FARMS. Features 24/7 managed organic farming, luxury clubhouse, horizon pool, and high appreciation. Just 60 mins from airport. Book free site visit with complimentary cab.",
  keywords: [
    "OVI FARMS",
    "farmhouse plots for sale",
    "managed farmland",
    "gated community farmland",
    "agriculture land near airport",
    "luxury countryside estates",
    "organic farming plots",
    "weekend villa land",
    "clear title agricultural land",
  ],
  authors: [{ name: "OVI FARMS Realty" }],
  creator: "OVI FARMS",
  publisher: "OVI FARMS Realty Pvt Ltd",
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
    title: "OVI FARMS — Luxury Managed Farmhouse Plots & Countryside Estates",
    description:
      "Clear-title managed farmhouse plots surrounded by flourishing organic orchards and resort amenities. Schedule your private site visit.",
    url: "https://ovifarms.com",
    siteName: "OVI FARMS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&fm=webp&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "OVI FARMS Estate Orchards and Countryside Sanctuary",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OVI FARMS — Luxury Managed Farmhouse Plots",
    description: "Clear-title managed farmhouse plots with 24/7 agro-care & resort club life.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&fm=webp&w=1200&q=80"],
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
    legalName: "OVI FARMS Realty & Countryside Estates",
    url: "https://ovifarms.com",
    logo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&fm=webp&w=200&q=80",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&fm=webp&w=1200&q=80",
    description: "Developer of premium clear-title managed farmland and luxury farmhouse plot communities.",
    telephone: "+91 98765 43210",
    email: "inquiries@ovifarms.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "OVI FARMS Estate, NH-44 Green Belt Corridor",
      addressLocality: "Bangalore Rural Corridor",
      addressRegion: "KA",
      postalCode: "562110",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.2000",
      longitude: "77.7000",
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
    areaServed: ["Bangalore", "Hyderabad", "Mumbai", "Delhi-NCR", "India"],
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
        name: "What is included in the 3-Year Complimentary Managed Agriculture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the first 3 full years, our team of dedicated agronomists, soil specialists, and gardeners maintains your 25+ fruit trees (pruning, organic compost, bio-pest control, drip irrigation) at zero extra cost.",
        },
      },
      {
        "@type": "Question",
        name: "What is the water supply and electrical infrastructure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OVI FARMS features multiple heavy-yield dedicated community borewells with certified sweet drinking groundwater (TDS < 250 ppm) connected via automated drip irrigation to every plot. Electricity connection and solar street lighting lines are fully operational.",
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
