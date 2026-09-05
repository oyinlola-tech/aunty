import type { Metadata } from "next";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order from Soft Beans Palace.",
};

export default function CheckoutPage() {
  return (
    <SectionContainer className="max-w-2xl">
      <SectionHeading
        eyebrow="CHECKOUT"
        title="Review your order"
        description="Fill in your details and continue on WhatsApp to place your order."
      />
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </SectionContainer>
  );
}
