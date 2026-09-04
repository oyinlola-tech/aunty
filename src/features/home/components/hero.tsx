import Link from "next/link"
import { ArrowRight, UtensilsCrossed } from "lucide-react"
import Image from "next/image"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-gradient-to-b from-cream/80 to-cream" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal immediate className="flex flex-col gap-6 lg:max-w-lg">
            <Sticker variant="orange">
              Freshly Made in Port Harcourt
            </Sticker>

            <h1 className="font-heading text-4xl font-bold text-bean-black leading-tight sm:text-5xl lg:text-6xl">
              Soft beans.
              <br />
              <span className="text-palace-orange">Big flavour.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-warm-grey">
              From rich Ewa Agoyin to creamy beans porridge, paired with
              delicious sides and perfectly seasoned proteins.
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
                className="group inline-flex items-center gap-2 rounded-full border border-palace-orange/30 bg-white px-6 py-4 text-sm font-bold text-bean-black transition-colors hover:border-palace-orange hover:bg-palace-orange hover:text-white"
              >
                <UtensilsCrossed className="size-4" />
                Order Now
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-warm-grey">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-palace-orange" />
                Fresh daily
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-espresso" />
                Made with care
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-muted-green" />
                Port Harcourt
              </span>
            </div>
          </Reveal>

          <Reveal
            immediate
            delay={0.08}
            className="relative flex aspect-square lg:order-1"
          >
            <div className="absolute -right-8 -top-8 h-1/2 w-1/2 rotate-12 rounded-2xl bg-cream-deep border border-border/50 shadow-xl lg:-right-16 lg:-top-16 lg:h-2/3 lg:w-2/3">
              <Image
                src="/images/food/beans/ewa-agoyin.jpg"
                alt="Ewa Agoyin"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute bottom-0 right-0 h-1/2 w-1/2 rotate-[15deg] rounded-2xl bg-palace-orange shadow-xl lg:bottom-8 lg:right-8 lg:h-1/3 lg:w-1/3 lg:rotate-[12deg]">
              <Image
                src="/images/food/sides/fried-plantain.jpg"
                alt="Fried Plantain"
                fill
                sizes="(max-width: 1024px) 25vw, 16vw"
                className="object-cover"
              />
            </div>

            <div className="absolute top-8 right-6 rotate-6 lg:top-16 lg:right-14">
              <div className="animate-sbp-float">
                <Sticker variant="gold">SO SOFT!</Sticker>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 -rotate-3 lg:bottom-24 lg:left-6">
              <div className="animate-sbp-float-delayed">
                <Sticker variant="pink">YOU GO LOVE AM</Sticker>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute -right-20 -top-20 h-40 w-40 text-doodle lg:-right-40 lg:-top-40">
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
    </section>
  )
}
