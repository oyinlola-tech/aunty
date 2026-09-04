import Link from "next/link"
import { menuItems } from "@/data/menu"
import { SectionContainer } from "@/components/shared/section-container"
import { ArrowRight, ArrowDown } from "lucide-react"

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
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-palace-orange">
            Build Your Perfect Plate
          </span>
          <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
            Mix. Match. Enjoy.
          </h2>
          <p className="max-w-lg text-warm-grey">
            Combine beans, sides, and proteins the way you like them.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {stepConfig.map((step, index) => {
            const items =
              step.category === "beans"
                ? beansItems
                : step.category === "sides"
                ? sidesItems
                : proteinsItems

            return (
              <div key={step.category} className="flex gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-palace-orange text-white">
                  <span className="font-heading text-xl font-bold">{step.number}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-heading text-xl font-bold text-bean-black">
                    {step.title}
                  </h3>
                  <p className="text-sm text-warm-grey">{step.description}</p>

                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href="/menu"
                        className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-cream px-3 py-1.5 text-sm text-warm-grey transition-colors hover:border-palace-orange hover:text-palace-orange"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="flex size-5 items-center justify-center rounded-full bg-cream-deep">
                            {index + 1}
                          </span>
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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
            className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
          >
            Start Building
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
