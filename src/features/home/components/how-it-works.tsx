import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    number: "01",
    title: "Browse the menu",
    description: "Explore our beans, sides, and proteins.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    number: "02",
    title: "Build your plate",
    description: "Add food to your cart and tell us how you want it.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    number: "03",
    title: "Checkout",
    description: "Enter your delivery details and review your order.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    number: "04",
    title: "Send on WhatsApp",
    description: "Your order goes straight to us — we handle the rest.",
    color: "bg-green-100 text-green-700",
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
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-[calc(50%+20px)] top-6 hidden h-px w-[calc(100%-40px)] bg-palace-orange/20 lg:block" />
            )}

            <div className="flex flex-col items-center rounded-3xl bg-ivory p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className={`flex size-12 items-center justify-center rounded-full ${step.color}`}>
                <span className="font-heading text-sm font-bold">{step.number}</span>
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-bean-black">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-warm-grey">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/menu">
          <Button variant="default" size="lg" className="gap-2">
            Start Ordering
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
