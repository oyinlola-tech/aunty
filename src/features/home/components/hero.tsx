import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-palace-orange/5" />
        <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-golden-yellow/8" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-6 font-heading text-sm font-semibold tracking-widest text-palace-orange uppercase">
            Fresh from our kitchen to yours
          </p>

          <h1 className="font-heading text-5xl font-bold leading-[1.1] text-bean-black sm:text-6xl lg:text-7xl">
            Port Harcourt&apos;s softest beans,
            <br />
            <span className="text-palace-orange">served with pride.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-grey sm:text-xl">
            Rich Ewa Agoyin, creamy porridge beans, golden plantain, crispy yam,
            and all the proteins you love. Made fresh daily, delivered hot.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/menu">
              <Button size="lg" className="px-8">
                Explore Menu
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-warm-grey sm:justify-start">
            <span>Fresh beans daily</span>
            <span className="hidden sm:inline text-palace-orange/30">|</span>
            <span>WhatsApp ordering</span>
            <span className="hidden sm:inline text-palace-orange/30">|</span>
            <span>Port Harcourt delivery</span>
          </div>
        </div>

        <div className="relative flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-cream-deep shadow-[0_8px_40px_rgba(245,130,31,0.12)]" />
              <div className="absolute inset-6 rounded-full border-2 border-dashed border-palace-orange/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="size-48 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 shadow-lg sm:size-56" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-700 via-red-600 to-orange-500" />
                  <div className="absolute inset-8 rounded-full opacity-30">
                    <div className="absolute left-1/4 top-1/4 size-2 rounded-full bg-amber-300" />
                    <div className="absolute right-1/3 top-1/3 size-1.5 rounded-full bg-amber-200" />
                    <div className="absolute bottom-1/4 left-1/3 size-2 rounded-full bg-amber-300" />
                    <div className="absolute bottom-1/3 right-1/4 size-1.5 rounded-full bg-amber-200" />
                    <div className="absolute left-1/2 top-1/2 size-1 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-12 animate-sbp-float sm:right-0 sm:top-8">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 px-4 py-3 shadow-md">
                  <span className="font-heading text-xs font-bold text-amber-900">Fried Plantain</span>
                </div>
              </div>

              <div className="absolute -bottom-2 left-4 animate-sbp-float-delayed sm:bottom-0 sm:left-8">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-300 px-4 py-3 shadow-md">
                  <span className="font-heading text-xs font-bold text-amber-800">Soft Bread</span>
                </div>
              </div>

              <div className="absolute -left-6 top-1/2 -translate-y-1/2 animate-sbp-float sm:-left-4">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 px-4 py-3 shadow-md">
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
