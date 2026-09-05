import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Leaf, Heart, Flame, ChefHat } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Freshly Prepared",
    description: "Made fresh to give you the best flavour.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Heart,
    title: "Comfort in Every Bite",
    description: "Soft, satisfying food made to feel like home.",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Flame,
    title: "Your Plate, Your Way",
    description: "Mix your beans, sides, and proteins the way you like them.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: ChefHat,
    title: "Made With Care",
    description: "Good food deserves attention from preparation to delivery.",
    color: "bg-amber-100 text-amber-700",
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
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="flex flex-col items-center rounded-3xl bg-ivory p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className={`flex size-14 items-center justify-center rounded-full ${value.color}`}>
                <Icon className="size-7" />
              </div>
              <h3 className="mt-5 font-heading text-base font-bold text-bean-black">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-warm-grey">{value.description}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
