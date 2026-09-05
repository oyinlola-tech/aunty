import type { Metadata } from "next";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { DottedDivider } from "@/components/shared/dotted-divider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Soft Beans Palace, a food business in Port Harcourt specialising in beans-based meals.",
};

export default function AboutPage() {
  return (
    <>
      <SectionContainer>
        <SectionHeading
          eyebrow="ABOUT US"
          title="The story behind the beans."
          description="Soft Beans Palace started with a simple idea: everyone deserves a delicious, comforting plate of beans."
        />
        <div className="mx-auto mt-8 max-w-2xl space-y-6 text-center text-warm-grey">
          <p>
            We believe beans is one of Nigeria's most underrated comfort foods.
            When done right, it's soft, flavourful, and deeply satisfying.
          </p>
          <p>
            Our menu is built around beans — from classic Ewa Agoyin to creamy
            porridge beans — paired with fresh sides and perfectly seasoned
            proteins.
          </p>
        </div>
      </SectionContainer>

      <DottedDivider />

      <SectionContainer>
        <SectionHeading
          eyebrow="OUR VALUES"
          title="What we stand for"
        />
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-tan p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-bean-black">
              Fresh Ingredients
            </h3>
            <p className="mt-2 text-sm text-warm-grey">
              Quality food starts with quality ingredients.
            </p>
          </div>
          <div className="rounded-2xl bg-pink-card p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-bean-black">
              Made With Love
            </h3>
            <p className="mt-2 text-sm text-warm-grey">
              Every plate is prepared with care.
            </p>
          </div>
          <div className="rounded-2xl bg-lavender p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-bean-black">
              Fast Delivery
            </h3>
            <p className="mt-2 text-sm text-warm-grey">
              Hot food to your door, quickly.
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
