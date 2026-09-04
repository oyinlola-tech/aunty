import Link from "next/link"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
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
    <section className="bg-cream-deep py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Sticker variant="orange">How It Works</Sticker>
          <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
            Simple ordering.
          </h2>
          <p className="max-w-md text-warm-grey">
            From craving to order in just a few taps.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
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
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
