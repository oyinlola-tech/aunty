import type { Metadata } from "next";
import { Suspense } from "react";
import MenuPageContent from "@/features/menu/components/menu-page-content";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore delicious beans, sides and proteins from Soft Beans Palace.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <MenuPageContent />
    </Suspense>
  );
}
