import Link from "next/link";
import { ArrowRight, Soup, Sandwich, Drumstick } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";
import type { ElementType } from "react";

const categoryVisuals: Record<string, { gradient: string; shape: string; icon: ElementType }> = {
  beans: {
    gradient: "from-amber-700 via-amber-800 to-amber-900",
    shape: "rounded-full",
    icon: Soup,
  },
  sides: {
    gradient: "from-yellow-400 via-amber-400 to-amber-500",
    shape: "rounded-2xl rotate-3",
    icon: Sandwich,
  },
  proteins: {
    gradient: "from-red-500 via-red-600 to-red-700",
    shape: "rounded-full",
    icon: Drumstick,
  },
};

export function Categories() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="CATEGORIES"
        title="What are you craving?"
        description="Pick a category and explore our menu."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {categories.map((category) => {
          const visual = categoryVisuals[category.id] || categoryVisuals.beans;
          const Icon = visual.icon;
          return (
            <Link
              key={category.id}
              href={`/menu?category=${category.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-ivory p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Visual element */}
              <div className="relative mx-auto mb-5 flex size-24 items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-10 ${visual.shape} transition-transform duration-300 group-hover:scale-110`} />
                <Icon className="relative size-10 text-palace-orange" />
              </div>

              {/* Text content */}
              <div className="text-center">
                <h3 className="font-heading text-xl font-bold text-bean-black">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-sm text-warm-grey">{category.description}</p>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-5 right-5 flex size-8 items-center justify-center rounded-full bg-palace-orange/10 text-palace-orange opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="size-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}
