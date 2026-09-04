import Link from "next/link"
import Image from "next/image"
import { categories } from "@/data/categories"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { UtensilsCrossed, Fish, Croissant } from "lucide-react"

const categoryImages = {
  beans: "/images/food/beans/ewa-agoyin.jpg",
  sides: "/images/food/sides/fried-plantain.jpg",
  proteins: "/images/food/proteins/fried-fish.jpg",
}

const categoryIcons = {
  beans: UtensilsCrossed,
  sides: Croissant,
  proteins: Fish,
}

export function Categories() {
  return (
    <section className="bg-cream-deep py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Browse by Category"
            title="What are you craving?"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category, index) => {
              const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
              const image = categoryImages[category.id as keyof typeof categoryImages]

              return (
                <Reveal key={category.id} delay={index * 0.07} className="flex">
                  <Link
                    href={`/menu?category=${category.slug}`}
                    className="group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl bg-cream p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-palace-orange/20">
                      {image && (
                        <Image
                          src={image}
                          alt={category.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <Icon className="absolute inset-0 m-auto size-16 text-white/20" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-heading text-xl font-bold text-bean-black">
                        {category.name}
                      </span>
                      <p className="text-sm text-warm-grey">
                        {category.description}
                      </p>
                    </div>

                    <span className="self-start rounded-full border border-palace-orange/30 bg-white px-3 py-1 text-xs font-semibold text-palace-orange transition-colors group-hover:bg-palace-orange group-hover:text-white">
                      View
                    </span>
                  </Link>
                </Reveal>
              )
            })}
        </div>
      </SectionContainer>
    </section>
  )
}
