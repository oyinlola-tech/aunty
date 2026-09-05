import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { Sticker } from "@/components/shared/sticker";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <SectionContainer className="flex flex-col items-center gap-8 py-16 text-center sm:py-20 lg:flex-row lg:text-left">
        <div className="flex-1">
          <Sticker variant="green" className="mb-4">
            Freshly Made in Port Harcourt
          </Sticker>
          <h1 className="font-heading text-4xl font-bold leading-tight text-bean-black sm:text-5xl lg:text-6xl">
            Soft beans.
            <br />
            Big flavour.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-warm-grey">
            From rich Ewa Agoyin to creamy beans porridge, paired with
            delicious sides and perfectly seasoned proteins.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu">
              <Button size="lg">
                Explore Menu
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-4 rounded-3xl bg-cream-deep" />
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🍛
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
