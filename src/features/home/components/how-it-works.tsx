import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    number: "01",
    title: "Choose Your Food",
    description: "Browse our menu and pick what you're craving.",
  },
  {
    number: "02",
    title: "Build Your Order",
    description: "Add food to your cart and tell us how you want it.",
  },
  {
    number: "03",
    title: "Checkout",
    description: "Enter your delivery details and review your order.",
  },
  {
    number: "04",
    title: "Send on WhatsApp",
    description: "Your order goes straight to us — we'll take it from there.",
  },
];

export function HowItWorks() {
  return (
    <SectionContainer className="bg-cream-deep">
      <SectionHeading
        eyebrow="HOW IT WORKS"
        title="Ordering is easy"
        description="From browsing to your doorstep in four simple steps."
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <span className="font-heading text-3xl font-bold text-palace-orange">
              {step.number}
            </span>
            <h3 className="mt-2 font-heading text-lg font-bold text-bean-black">
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-warm-grey">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
