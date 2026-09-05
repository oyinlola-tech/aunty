import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FoodImage } from "@/components/shared/food-image";
import { menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/currency";

const featured = menuItems.filter((item) => item.featured).slice(0, 4);

export function FeaturedDishes() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="POPULAR"
        title="The favourites. For good reason."
        description="Our most-loved dishes, freshly prepared every day."
      />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item, index) => (
          <Link
            key={item.id}
            href={`/menu/${item.slug}`}
            className={`group relative overflow-hidden rounded-3xl bg-ivory shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <FoodImage
              src={item.image}
              alt={item.name}
              category={item.categoryId}
              className={index === 0 ? "aspect-square" : "aspect-[4/3]"}
            >
              {/* Price badge */}
              <div className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="font-heading text-sm font-bold text-bean-black">
                  {formatCurrency(item.price)}
                </span>
              </div>

              {/* Featured badge */}
              {item.featured && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-palace-orange px-3 py-1 shadow-sm">
                  <span className="font-heading text-[10px] font-bold uppercase text-white">
                    Popular
                  </span>
                </div>
              )}
            </FoodImage>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-heading text-base font-bold text-bean-black">
                {item.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-warm-grey">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/menu">
          <Button variant="outline" size="lg" className="gap-2">
            View Full Menu
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
