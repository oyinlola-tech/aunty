import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";

export function FinalCTA() {
  return (
    <SectionContainer className="bg-espresso text-center">
      <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
        Hungry already?
      </h2>
      <p className="mt-3 text-lg text-white/70">
        Your next plate of comfort food is just a few taps away.
      </p>
      <Link href="/menu" className="mt-6 inline-block">
        <Button variant="default" size="lg" className="bg-palace-orange hover:bg-palace-orange-hover">
          Order Now
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    </SectionContainer>
  );
}
