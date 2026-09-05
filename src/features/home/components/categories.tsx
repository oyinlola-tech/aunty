import Link from "next/link";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";

const categoryEmoji: Record<string, string> = {
  beans: "🫘",
  sides: "🍞",
  proteins: "🍗",
};

export function Categories() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="CATEGORIES"
        title="What are you craving?"
        description="Pick a category and explore our menu."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/menu?category=${category.slug}`}
            className="group flex flex-col items-center rounded-2xl bg-ivory p-8 text-center shadow-sm transition-all hover:shadow-md"
          >
            <span className="text-5xl">{categoryEmoji[category.id] || "🍽"}</span>
            <h3 className="mt-4 font-heading text-xl font-bold text-bean-black">
              {category.name}
            </h3>
            <p className="mt-1 text-sm text-warm-grey">{category.description}</p>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
