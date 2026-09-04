import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Flame, Soup, Puzzle, ChefHat } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Soft Beans Palace serves soft beans, sides and proteins in Port Harcourt. Learn what we make, how we cook it, and how ordering on WhatsApp works.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionContainer className="flex flex-col gap-10 py-16">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Sticker variant="orange">Our Story</Sticker>
          <h1 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl lg:text-5xl">
            About Soft Beans Palace
          </h1>
          <p className="max-w-lg text-warm-grey">
            Soft beans, done right — made fresh in Port Harcourt.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-2xl font-bold text-bean-black mb-1">
              What We Do
            </h2>
            <p className="text-warm-grey leading-relaxed">
              Soft Beans Palace is a food business based in Port Harcourt built
              around beans — Ewa Agoyin, soft porridge beans and plain soft
              beans — cooked slow and served soft.
            </p>
            <p className="text-warm-grey leading-relaxed">
              Every plate is built to order. Pick your beans, add the sides
              and proteins you feel like, tell us how you want it, and your
              order goes straight to us on WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-bean-black mb-4">
              What We Serve
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-cream-deep p-4">
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Beans
                </h3>
                <p className="text-sm text-warm-grey mt-1">
                  Ewa Agoyin, Plain Soft Beans with Stew, Soft Porridge Beans
                </p>
              </div>
              <div className="rounded-xl bg-cream-deep p-4">
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Sides
                </h3>
                <p className="text-sm text-warm-grey mt-1">
                  Soft Bread, Fried Plantain, Fried Yam Sticks, Fried Potatoes
                </p>
              </div>
              <div className="rounded-xl bg-cream-deep p-4">
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Proteins
                </h3>
                <p className="text-sm text-warm-grey mt-1">
                  Fried Fish, Fried Beef, Fried Goat Meat, Peppered Chicken,
                  Peppered Beef, Peppered Goat Meat, Peppered Fish, Sauteed Ponmo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-cream p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange">
                <Flame className="size-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Freshly Prepared
                </h3>
                <p className="text-sm text-warm-grey">
                  Made fresh daily to give you the best flavour.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-cream p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange">
                <Soup className="size-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Comfort in Every Bite
                </h3>
                <p className="text-sm text-warm-grey">
                  Soft, satisfying food made to feel like home.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-cream p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange">
                <Puzzle className="size-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Your Plate, Your Way
                </h3>
                <p className="text-sm text-warm-grey">
                  Mix beans, sides, and proteins how you like them.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-cream p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange">
                <ChefHat className="size-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Made With Care
                </h3>
                <p className="text-sm text-warm-grey">
                  Good food deserves attention from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>    <div className="rounded-2xl overflow-hidden bg-cream-deep">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image
            src="/images/food/beans/ewa-agoyin.svg"
            alt="Bowl of Ewa Agoyin with rich agoyin stew"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/20 to-cream/40" />
        </div>
        <div className="flex items-center gap-4 px-6 py-4 sm:px-8 sm:py-6 bg-cream text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange text-white">
            <ArrowRight className="size-5" />
          </div>
          <p className="font-heading text-lg font-bold text-bean-black">
            Our food speaks for itself.
          </p>
        </div>
      </div>

      <SectionContainer className="py-16">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <Sticker variant="orange">Order Now</Sticker>
          <h2 className="font-heading text-2xl font-bold text-bean-black">
            Ready to eat?
          </h2>
          <p className="max-w-md text-warm-grey">
            Browse our menu, build your order, and send it via WhatsApp.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/menu"
              className={cn(buttonVariants({ size: "lg" }), "no-underline")}
            >
              Explore Menu
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "soft", size: "lg" }), "no-underline")}
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </SectionContainer>
    </div>
  )
}
