import type { Metadata } from "next"
import { CheckoutExperience } from "@/features/checkout/components/checkout-experience"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your order and complete it via WhatsApp with Soft Beans Palace.",
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-bold text-bean-black">
          Checkout
        </h1>
        <p className="text-warm-grey">
          Review your order and complete it on WhatsApp.
        </p>
      </div>

      <CheckoutExperience />
    </div>
  )
}
