import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";

const categoryVisuals: Record<string, { gradient: string; shape: string; icon?: string }> = {
  beans: {
    gradient: "from-amber-700 via-amber-800 to-amber-900",
    shape: "rounded-full",
    icon: "/images/icons/categories/beans.svg",
  },
  sides: {
    gradient: "from-yellow-400 via-amber-400 to-amber-500",
    shape: "rounded-2xl rotate-3",
  },
  proteins: {
    gradient: "from-red-500 via-red-600 to-red-700",
    shape: "rounded-full",
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
        {categories
          .filter((category) => category.id !== "all")
          .map((category) => {
            const visual = categoryVisuals[category.id] || categoryVisuals.beans;
            return (
              <Link
                key={category.id}
                href={`/menu?category=${category.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-ivory p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mx-auto mb-5 flex size-24 items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-10 ${visual.shape} transition-transform duration-300 group-hover:scale-110`}
                  />
                  {visual.icon ? (
                    <img
                      src={visual.icon}
                      alt=""
                      className="relative size-12 object-contain"
                    />
                  ) : (
                    <span
                      className={`relative text-3xl ${visual.shape} bg-gradient-to-br ${visual.gradient} bg-clip-text text-transparent font-heading font-bold`}
                    >
                      {category.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-heading text-xl font-bold text-bean-black">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-warm-grey">{category.description}</p>
                </div>

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
