import Link from "next/link"
import { menuItems } from "@/data/menu"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const featuredItems = menuItems.filter((item) => item.featured)

export function FeaturedDishes() {
  return (
    <SectionContainer className="flex flex-col gap-10">
      <Reveal>
        <SectionHeading
          sticker="The favourites"
          title="The favourites. For good reason."
          description="These are the dishes our customers love the most."
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredItems.slice(0, 4).map((item, index) => (
          <Reveal key={item.id} delay={index * 0.06} className="flex">
            <Link
              href={`/menu/${item.slug}`}
              className={cn(
                "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-cream-deep border border-border/50 transition-all hover:shadow-lg"
              )}
            >
              <div className="relative aspect-square overflow-hidden bg-cream-deep">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-palace-orange">
                  #{index + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold text-bean-black line-clamp-1">
                  {item.name}
                </h3>
                <p className="flex-1 text-sm text-warm-grey line-clamp-2">
                  {item.description}
                </p>
              </div>

              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full border border-border bg-cream-deep px-3 py-1.5 text-xs font-semibold text-bean-black shadow-sm transition-all group-hover:bg-espresso group-hover:text-white">
                View
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex justify-center">
        <Link
          href="/menu"
          className={cn(buttonVariants({ size: "lg" }), "no-underline")}
        >
          View Full Menu
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </SectionContainer>
  )
}
