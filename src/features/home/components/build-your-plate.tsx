import Link from "next/link"
import { menuItems } from "@/data/menu"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, ArrowDown, Plus } from "lucide-react"

const stepConfig = [
  {
    number: "1",
    title: "Pick Your Beans",
    description: "Choose from our soft, satisfying beans dishes",
    category: "beans",
  },
  {
    number: "2",
    title: "Add a Side",
    description: "Pair it with plantain, yam, bread, or potatoes",
    category: "sides",
  },
  {
    number: "3",
    title: "Pick a Protein",
    description: "Choose from fish, beef, chicken, or more",
    category: "proteins",
  },
]

export function BuildYourPlate() {
  const beansItems = menuItems.filter((item) => item.categoryId === "beans")
  const sidesItems = menuItems.filter((item) => item.categoryId === "sides")
  const proteinsItems = menuItems.filter((item) => item.categoryId === "proteins")

  return (
    <section className="bg-cream-deep py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Build Your Perfect Plate"
            title="Mix. Match. Enjoy."
            description="Combine beans, sides, and proteins the way you like them."
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          {stepConfig.map((step, index) => {
            const items =
              step.category === "beans"
                ? beansItems
                : step.category === "sides"
                ? sidesItems
                : proteinsItems

            return (
              <Reveal key={step.category} delay={index * 0.08}>
                <div className="flex gap-6">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-palace-orange text-white">
                    <span className="font-heading text-xl font-bold">{step.number}</span>
                  </div>

                  <div className="flex min-w-0 flex-col gap-3">
                    <h3 className="font-heading text-xl font-bold text-bean-black">
                      {step.title}
                    </h3>
                    <p className="text-sm text-warm-grey">{step.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/menu?category=${step.category}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-cream px-3.5 py-1.5 text-sm text-warm-grey transition-colors hover:border-palace-orange hover:text-palace-orange"
                        >
                          <Plus className="size-3.5 text-palace-orange" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-center">
            <div className="rounded-full bg-cream border border-border/50 p-4 text-palace-orange">
              <ArrowDown className="size-6" />
            </div>
            <div className="rounded-full bg-palace-orange p-6 text-white shadow-lg">
              <ArrowDown className="size-8 rotate-90" />
            </div>
            <div className="rounded-full bg-cream border border-border/50 p-4 text-palace-orange">
              <ArrowDown className="size-6" />
            </div>
          </div>
          <p className="text-sm text-warm-grey">
            Any combination works — beans only, beans + side, or the full trio!
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/menu"
            className={cn(buttonVariants({ size: "lg" }), "no-underline")}
          >
            Start Building
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
