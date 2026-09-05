import Link from "next/link";
import { ArrowRight, Soup, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sticker } from "@/components/shared/sticker";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-palace-orange/5" />
        <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-golden-yellow/8" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <Sticker variant="green" className="mb-6 inline-block">
            Freshly Made in Port Harcourt
          </Sticker>

          <h1 className="font-heading text-5xl font-bold leading-[1.1] text-bean-black sm:text-6xl lg:text-7xl">
            Soft beans.
            <br />
            <span className="text-palace-orange">Big flavour.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-grey sm:text-xl">
            From rich Ewa Agoyin to creamy beans porridge, paired with
            golden plantain, crispy yam, and perfectly seasoned proteins.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/menu">
              <Button size="lg" className="gap-2 px-8">
                Explore Menu
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-warm-grey sm:justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Soup className="size-5 text-palace-orange" />
              <span>Fresh beans daily</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-palace-orange" />
              <span>Quick WhatsApp ordering</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-palace-orange" />
              <span>Port Harcourt delivery</span>
            </div>
          </div>
        </div>

        {/* Visual — styled food plate composition */}
        <div className="relative flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            {/* Main plate */}
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Plate background */}
              <div className="absolute inset-0 rounded-full bg-cream-deep shadow-[0_8px_40px_rgba(245,130,31,0.12)]" />

              {/* Inner plate ring */}
              <div className="absolute inset-6 rounded-full border-2 border-dashed border-palace-orange/20" />

              {/* Food visual — beans bowl */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Bowl */}
                  <div className="size-48 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 shadow-lg sm:size-56" />
                  {/* Stew on top */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-700 via-red-600 to-orange-500" />
                  {/* Beans texture dots */}
                  <div className="absolute inset-8 rounded-full opacity-30">
                    <div className="absolute left-1/4 top-1/4 size-2 rounded-full bg-amber-300" />
                    <div className="absolute right-1/3 top-1/3 size-1.5 rounded-full bg-amber-200" />
                    <div className="absolute bottom-1/4 left-1/3 size-2 rounded-full bg-amber-300" />
                    <div className="absolute bottom-1/3 right-1/4 size-1.5 rounded-full bg-amber-200" />
                    <div className="absolute left-1/2 top-1/2 size-1 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>

              {/* Floating side elements */}
              {/* Plantain */}
              <div className="absolute -right-4 top-12 animate-sbp-float sm:right-0 sm:top-8">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 px-4 py-3 shadow-md">
                  <Soup className="size-4 text-amber-900" />
                  <span className="font-heading text-xs font-bold text-amber-900">Fried Plantain</span>
                </div>
              </div>

              {/* Bread */}
              <div className="absolute -bottom-2 left-4 animate-sbp-float-delayed sm:bottom-0 sm:left-8">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-300 px-4 py-3 shadow-md">
                  <Soup className="size-4 text-amber-800" />
                  <span className="font-heading text-xs font-bold text-amber-800">Soft Bread</span>
                </div>
              </div>

              {/* Protein */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 animate-sbp-float sm:-left-4">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 px-4 py-3 shadow-md">
                  <Soup className="size-4 text-white" />
                  <span className="font-heading text-xs font-bold text-white">Peppered Fish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
