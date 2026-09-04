import Image from "next/image"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { Doodle } from "@/components/shared/doodle"
import { cn } from "@/lib/utils"

const galleryImages = [
  {
    src: "/images/food/beans/ewa-agoyin.jpg",
    alt: "Ewa Agoyin served with rich agoyin stew",
    size: "large",
  },
  {
    src: "/images/food/proteins/fried-fish.jpg",
    alt: "Crispy fried fish",
    size: "small",
  },
  {
    src: "/images/food/beans/plain-soft-beans.jpg",
    alt: "Plain soft beans with stew",
    size: "small",
  },
] as const

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Fresh from Our Kitchen"
            title="A feast for your eyes."
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-cream-deep transition-transform duration-500 hover:scale-[1.02]",
                  image.size === "large"
                    ? "col-span-2 row-span-2 aspect-square lg:col-span-2"
                    : "aspect-square"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    image.size === "large"
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </SectionContainer>

      <Doodle className="pointer-events-none absolute -right-10 -bottom-10 w-40 rotate-12 opacity-70 lg:w-56" />
    </section>
  )
}
