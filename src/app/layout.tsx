import type { Metadata } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
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

const ogImage = `${siteConfig.url}/images/food/beans/ewa-agoyin.jpg`;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Soft beans. Big flavour.`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
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
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Ewa Agoyin from Soft Beans Palace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Soft beans. Big flavour.`,
    description: siteConfig.description,
    images: [ogImage],
  },
  themeColor: "#FBF3E7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fredoka.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
