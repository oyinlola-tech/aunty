import Image from "next/image"
import { SectionContainer } from "@/components/shared/section-container"
import { cn } from "@/lib/utils"

const galleryImages = [
  { src: "/images/food/beans/ewa-agoyin.jpg", alt: "Ewa Agoyin", size: "large" },
  { src: "/images/food/sides/fried-plantain.jpg", alt: "Fried Plantain", size: "small" },
  { src: "/images/food/proteins/fried-fish.jpg", alt: "Fried Fish", size: "small" },
]

export function Gallery() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-palace-orange">
            A Feast for Your Eyes
          </span>
          <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
            A feast for your eyes.
          </h2>
        </div>

        <div className="flex gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-cream-deep",
                image.size === "large"
                  ? "flex size-64 lg:size-80"
                  : "flex size-32 lg:size-40"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.size === "large" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
