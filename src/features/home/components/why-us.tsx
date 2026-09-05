import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Leaf, Heart, Flame, ChefHat } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Freshly Prepared",
    description: "Made fresh to give you the best flavour.",
  },
  {
    icon: Heart,
    title: "Comfort in Every Bite",
    description: "Soft, satisfying food made to feel like home.",
  },
  {
    icon: Flame,
    title: "Your Plate, Your Way",
    description: "Mix your beans, sides, and proteins the way you like them.",
  },
  {
    icon: ChefHat,
    title: "Made With Care",
    description: "Good food deserves attention from preparation to delivery.",
  },
];

export function WhyUs() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="WHY US"
        title="Why Soft Beans Palace?"
        description="We put love into every plate."
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="flex flex-col items-center rounded-2xl bg-ivory p-6 text-center shadow-sm"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-palace-orange/10">
                <Icon className="size-6 text-palace-orange" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-bean-black">
                {value.title}
              </h3>
              <p className="mt-1 text-sm text-warm-grey">{value.description}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
