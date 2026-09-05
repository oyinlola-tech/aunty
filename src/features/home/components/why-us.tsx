import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const values = [
  {
    title: "Freshly Prepared",
    description: "Made fresh to give you the best flavour.",
    color: "bg-muted-green",
  },
  {
    title: "Comfort in Every Bite",
    description: "Soft, satisfying food made to feel like home.",
    color: "bg-pink-sticker",
  },
  {
    title: "Your Plate, Your Way",
    description: "Mix your beans, sides, and proteins the way you like them.",
    color: "bg-palace-orange",
  },
  {
    title: "Made With Care",
    description: "Good food deserves attention from preparation to delivery.",
    color: "bg-golden-yellow",
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
        {values.map((value) => (
          <div
            key={value.title}
            className="flex flex-col rounded-3xl bg-ivory p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className={`h-1.5 w-10 rounded-full ${value.color}`} />
            <h3 className="mt-5 font-heading text-base font-bold text-bean-black">
              {value.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-warm-grey">{value.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
