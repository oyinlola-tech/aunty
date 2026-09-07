import type { Metadata } from "next";
import { OrdersContent } from "@/features/checkout/components/orders-content";

export const metadata: Metadata = {
  title: "Orders",
  description:
    "View your order history from Soft Beans Palace. Track your past orders, delivery details, and items purchased.",
  alternates: { canonical: "/orders" },
};

export default function OrdersPage() {
  return <OrdersContent />;
}
