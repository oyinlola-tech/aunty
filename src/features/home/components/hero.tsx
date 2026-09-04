import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"
import { siteConfig } from "@/config/site"
import { createWhatsAppUrl } from "@/features/checkout/utils/whatsapp-url"

const whatsappNumber = siteConfig.contact.whatsapp
const whatsappHref = whatsappNumber
  ? createWhatsAppUrl(
      whatsappNumber,
      "Hello Soft Beans Palace! I'd like to place an order."
    )
  : null

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* soft radial warmth behind the collage */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-palace-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy */}
          <Reveal immediate className="flex flex-col gap-6">
            <Sticker variant="orange">
              Freshly Made in Port Harcourt
            </Sticker>

            <h1 className="font-heading text-4xl leading-[1.05] font-bold text-balance text-bean-black sm:text-5xl lg:text-6xl">
              Soft beans.
              <br />
              <span className="relative inline-block text-palace-orange">
                Big flavour.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 12"
                  className="absolute -bottom-2 left-0 w-full text-golden-yellow"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 9 Q 55 2 110 6 T 216 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-warm-grey">
              From rich Ewa Agoyin to creamy beans porridge — served with your
              choice of sides and proteins, built exactly the way you like it.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className={cn(buttonVariants({ size: "lg" }), "no-underline")}
              >
                Explore the Menu
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {whatsappHref && (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "soft", size: "lg" }),
                    "no-underline"
                  )}
                >
                  <MessageCircle className="size-4" />
                  Order on WhatsApp
                </Link>
              )}
            </div>

            <p className="flex items-center gap-2 text-sm text-warm-grey">
              <span className="inline-block size-1.5 rounded-full bg-palace-orange" />
              No apps or accounts — your order goes straight to our WhatsApp.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-doodle pt-5 text-sm text-warm-grey">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-palace-orange" />
                Beans made fresh
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-espresso" />
                Sides &amp; proteins your way
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-green" />
                Delivered around Port Harcourt
              </span>
            </div>
          </Reveal>

          {/* Food collage */}
          <Reveal
            immediate
            delay={0.1}
            className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
          >
            {/* signature dish — polaroid style */}
            <div className="absolute top-0 right-0 w-[64%] -rotate-3 rounded-[1.75rem] bg-white p-2 pb-8 shadow-[0_24px_50px_-20px_rgba(27,22,17,0.35)]">
              <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-cream-deep">
                <Image
                  src="/images/food/beans/ewa-agoyin.svg"
                  alt="Ewa Agoyin served with rich agoyin stew"
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 34vw"
                  className="object-cover"
                />
              </div>
              <p className="absolute right-0 bottom-2 left-0 text-center font-heading text-sm font-semibold text-warm-grey">
                Ewa Agoyin
              </p>
            </div>

            {/* plantain cutout */}
            <div className="absolute bottom-0 left-0 w-[46%] rotate-3 overflow-hidden rounded-3xl border-[6px] border-white shadow-[0_18px_40px_-18px_rgba(27,22,17,0.4)]">
              <div className="relative aspect-square bg-cream-deep">
                <Image
                  src="/images/food/sides/fried-plantain.svg"
                  alt="Golden fried plantain slices"
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* fish cutout */}
            <div className="absolute top-[12%] -left-1 w-[34%] -rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-[0_14px_30px_-14px_rgba(27,22,17,0.35)] lg:top-[6%]">
              <div className="relative aspect-square bg-cream-deep">
                <Image
                  src="/images/food/proteins/fried-fish.svg"
                  alt="Whole fried fish"
                  fill
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* floating stickers */}
            <div className="absolute -top-2 right-4 z-10 rotate-6 lg:top-0 lg:right-10">
              <div className="animate-sbp-float">
                <Sticker variant="gold">SO SOFT!</Sticker>
              </div>
            </div>

            <div className="absolute bottom-[38%] -left-2 z-10 -rotate-3 sm:left-4">
              <div className="animate-sbp-float-delayed">
                <Sticker variant="pink">YOU GO LOVE AM</Sticker>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* decorative doodle rings */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-72 text-doodle lg:-right-32 lg:-top-32 lg:size-96"
      >
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <circle
            cx="100"
            cy="100"
            r="52"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
    </section>
  )
}
