import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-palace-orange/5" />
        <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-golden-yellow/8" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
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
            <div className="relative flex items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <div
                  className="absolute -left-4 top-4 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 border-4 border-white"
                  style={{ zIndex: 1 }}
                >
                  <Image
                    src="/images/hero/beans-porridge.jpg"
                    alt="Beans porridge"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                </div>

                <div
                  className="absolute right-0 top-8 w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 border-4 border-white"
                  style={{ zIndex: 2 }}
                >
                  <Image
                    src="/images/hero/fried-plantain.jpg"
                    alt="Fried plantain"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, 300px"
                  />
                </div>

                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                  style={{ zIndex: 3 }}
                >
                  <Image
                    src="/images/hero/beans-rice.jpg"
                    alt="Beans with rice"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 200px, 240px"
                  />
                </div>
              </div>

              <div className="absolute -top-2 -right-2 transform rotate-12" style={{ zIndex: 4 }}>
                <Image
                  src="/images/stickers/hot-fresh.svg"
                  alt="Hot and fresh sticker"
                  width={112}
                  height={32}
                  className="drop-shadow-md sm:w-28 sm:h-10"
                />
              </div>

              <div className="absolute -bottom-2 -left-2 transform -rotate-6" style={{ zIndex: 4 }}>
                <Image
                  src="/images/stickers/so-soft.svg"
                  alt="So soft sticker"
                  width={112}
                  height={32}
                  className="drop-shadow-md sm:w-28 sm:h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
