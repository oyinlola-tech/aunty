import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Sticker } from "@/components/shared/sticker";
import { menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/currency";

const featured = menuItems.filter((item) => item.featured);

export function FeaturedDishes() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="POPULAR"
        title="The favourites. For good reason."
        description="Our most-loved dishes, freshly prepared every day."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl bg-ivory shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden bg-cream-deep">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-base font-semibold text-bean-black">
                {item.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-warm-grey">
                {item.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-bean-black">
                  {formatCurrency(item.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/menu">
          <Button variant="outline">
            View Full Menu
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
