import { Hero } from "@/features/home/components/hero";
import { Categories } from "@/features/home/components/categories";
import { FeaturedDishes } from "@/features/home/components/featured-dishes";
import { BuildYourPlate } from "@/features/home/components/build-your-plate";
import { WhyUs } from "@/features/home/components/why-us";
import { Gallery } from "@/features/home/components/gallery";
import { HowItWorks } from "@/features/home/components/how-it-works";
import { Testimonials } from "@/features/home/components/testimonials";
import { DottedDivider } from "@/components/shared/dotted-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedDishes />
      <BuildYourPlate />
      <DottedDivider />
      <WhyUs />
      <Gallery />
      <HowItWorks />
      <DottedDivider />
      <Testimonials />
    </>
  );
}
