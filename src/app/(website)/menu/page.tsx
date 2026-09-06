import type { Metadata } from "next";
import { Suspense } from "react";
import MenuPageContent from "@/features/menu/components/menu-page-content";
import { siteConfig } from "@/config/site";
import { menuItems } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore delicious beans, sides and proteins from Soft Beans Palace.",
  alternates: { canonical: "/menu" },
};

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${siteConfig.name} Menu`,
  description: siteConfig.description,
  url: `${siteConfig.url}/menu`,
  itemListElement: menuItems.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteConfig.url}/menu/${item.slug}`,
    name: item.name,
  })),
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <MenuPageContent />
      </Suspense>
    </>
  );
}
