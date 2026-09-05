import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    number: "01",
    title: "Choose Your Beans",
    description: "Pick your favourite from our beans menu.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    number: "02",
    title: "Add a Side",
    description: "Plantain, yam, bread, or potatoes.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    number: "03",
    title: "Pick a Protein",
    description: "Fish, chicken, beef, goat meat, or ponmo.",
    color: "bg-red-100 text-red-700",
  },
  {
    number: "04",
    title: "Enjoy",
    description: "Your perfectly built plate of comfort food.",
    color: "bg-green-100 text-green-700",
  },
];

export function BuildYourPlate() {
  return (
    <SectionContainer className="bg-cream-deep">
      <SectionHeading
        eyebrow="BUILD YOUR PLATE"
        title="Your meal, your way"
        description="Mix and match to create the perfect plate."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-[calc(50%+24px)] top-6 hidden h-px w-[calc(100%-48px)] bg-palace-orange/20 lg:block" />
            )}

            <div className="flex flex-col items-center rounded-3xl bg-ivory p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className={`flex size-12 items-center justify-center rounded-full ${step.color}`}>
                <span className="font-heading text-sm font-bold">{step.number}</span>
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-bean-black">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-warm-grey">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/menu">
          <Button variant="default" size="lg" className="gap-2">
            Build Your Order
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
