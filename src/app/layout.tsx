import type { Metadata, Viewport } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { siteConfig } from "@/config/site";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

const ogImage = `${siteConfig.url}/images/brand/og-card.webp`;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Soft beans. Big flavour.`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
    },
  },
  icons: {
    icon: "/images/brand/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Soft beans. Big flavour.`,
    description: siteConfig.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Soft Beans Palace — soft beans with sides and proteins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Soft beans. Big flavour.`,
    description: siteConfig.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF3E7",
};

/**
 * Organization-level structured data. Only properties with reliable values
 * are included — no invented address, hours, reviews or ratings.
 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${siteConfig.name}`,
  description: siteConfig.description,
  url: `${siteConfig.url}/about`,
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: ogImage,
  servesCuisine: "Nigerian",
  areaServed: "Port Harcourt",
  ...(siteConfig.contact.phone
    ? { telephone: siteConfig.contact.phone }
    : {}),
  ...(siteConfig.location && siteConfig.location !== "Port Harcourt, Nigeria"
    ? {
        address: {
          "@type": "PostalAddress",
          addressLocality: "Port Harcourt",
          addressCountry: "NG",
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
