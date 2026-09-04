import Link from "next/link"
import Image from "next/image"
import { Sticker } from "@/components/shared/sticker"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 to-espresso" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Sticker variant="gold">Hungry already?</Sticker>
              <span className="text-white/60">Order now</span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Your next plate of comfort food
              <br />
              <span className="text-palace-orange">is just a few taps away.</span>
            </h2>

            <p className="max-w-md text-lg text-white/70">
              From rich Ewa Agoyin to perfectly seasoned proteins — whatever
              you&apos;re craving, we&apos;ve got you covered.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
              >
                Explore Menu
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/checkout"
                className="group inline-flex items-center gap-2 rounded-full border border-palace-orange/30 px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-palace-orange hover:text-white"
              >
                Order Now
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 lg:h-full w-80 lg:w-96">
              <div className="absolute inset-0 rotate-6 rounded-3xl bg-cream-deep border border-border/50 shadow-xl lg:rotate-0 lg:inset-y-12 lg:inset-x-12">
                <Image
                  src="/images/food/beans/soft-porridge-beans.jpg"
                  alt="Soft Porridge Beans"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-12 -bottom-12 h-32 w-32 lg:-right-16 lg:-bottom-16 rotate-12 rounded-2xl bg-palace-orange shadow-xl">
                <Image
                  src="/images/food/sides/fried-plantain.jpg"
                  alt="Fried Plantain"
                  fill
                  sizes="(max-width: 1024px) 25vw, 16vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
