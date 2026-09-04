import type { Metadata } from "next"
import { CartPage } from "@/features/cart/components/cart-page"

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your configured meals and continue to checkout with Soft Beans Palace.",
  robots: { index: false },
}

export default function CartRoute() {
  return <CartPage />
}
