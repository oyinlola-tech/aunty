import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Sticker } from "@/components/shared/sticker";

const steps = [
  {
    number: "1",
    title: "Choose Your Beans",
    description: "Pick your favourite from our beans menu.",
    emoji: "🫘",
  },
  {
    number: "2",
    title: "Add a Side",
    description: "Plantain, yam, bread, or potatoes.",
    emoji: "🍳",
  },
  {
    number: "3",
    title: "Pick a Protein",
    description: "Fish, chicken, beef, goat meat, or ponmo.",
    emoji: "🍗",
  },
  {
    number: "4",
    title: "Enjoy",
    description: "Your perfectly built plate of comfort food.",
    emoji: "😋",
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
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center rounded-2xl bg-ivory p-6 text-center shadow-sm"
          >
            <span className="text-4xl">{step.emoji}</span>
            <span className="mt-3 font-heading text-xs font-bold uppercase tracking-widest text-palace-orange">
              Step {step.number}
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
