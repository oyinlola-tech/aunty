import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"
import { Flame, Soup, Puzzle, ChefHat } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValuePoint {
  icon: LucideIcon
  title: string
  description: string
}

const valuePoints: ValuePoint[] = [
  {
    icon: Flame,
    title: "Freshly Prepared",
    description: "Made fresh to give you the best flavour in every bite.",
  },
  {
    icon: Soup,
    title: "Comfort in Every Bite",
    description: "Soft, satisfying food made to feel like home.",
  },
  {
    icon: Puzzle,
    title: "Your Plate, Your Way",
    description: "Mix your beans, sides, and proteins the way you like them.",
  },
  {
    icon: ChefHat,
    title: "Made With Care",
    description: "Good food deserves attention from preparation to delivery.",
  },
]

export function WhyUs() {
  return (
    <SectionContainer className="flex flex-col gap-10">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Sticker variant="purple">Why Us</Sticker>
        <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
          What makes us different
        </h2>
        <p className="max-w-lg text-warm-grey">
          We believe in good food, good service, and making you happy.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valuePoints.map((point, index) => {
          const Icon = point.icon
          return (
            <Reveal key={point.title} delay={index * 0.06} className="flex">
              <div
                className={cn(
                  "flex h-full w-full flex-col gap-4 rounded-2xl bg-cream p-6 transition-all hover:shadow-md",
                  index % 2 === 1 && "bg-cream-deep"
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-palace-orange text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  {point.title}
                </h3>
                <p className="text-sm text-warm-grey">{point.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </SectionContainer>
  )
}
