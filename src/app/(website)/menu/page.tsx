import type { Metadata } from "next";
import MenuPageContent from "@/features/menu/components/menu-page-content";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore delicious beans, sides and proteins from Soft Beans Palace.",
};

export default function MenuPage() {
  return <MenuPageContent />;
}
