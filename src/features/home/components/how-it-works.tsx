import Link from "next/link"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"
import { Doodle } from "@/components/shared/doodle"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Pick Your Favourites",
    description: "Browse the menu and choose what you're craving.",
  },
  {
    number: "02",
    title: "Build Your Order",
    description: "Add your food to the cart and tell us how you want it.",
  },
  {
    number: "03",
    title: "Checkout",
    description: "Enter your details and review your order.",
  },
  {
    number: "04",
    title: "Send on WhatsApp",
    description: "Send your order directly to us and we'll take it from there.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-cream-deep py-16 sm:py-20">
      <SectionContainer className="relative flex flex-col gap-10">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Sticker variant="orange">How It Works</Sticker>
          <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
            Simple ordering.
          </h2>
          <p className="max-w-md text-warm-grey">
            From craving to order in just a few taps.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.07}
              className="flex flex-col gap-4 relative"
            >
              <div className="flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-palace-orange text-white shadow-md">
                  <span className="font-heading text-2xl font-bold">{step.number}</span>
                </div>
              </div>
              <div className="relative">
                <h3 className="font-heading text-xl font-bold text-bean-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-warm-grey">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </SectionContainer>

      <Doodle className="pointer-events-none absolute -bottom-8 -left-8 w-40 -rotate-12 opacity-60 lg:w-52" />
    </section>
  )
}
