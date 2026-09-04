import type { Metadata } from "next"
import { Hero } from "@/features/home/components/hero"
import { Categories } from "@/features/home/components/categories"
import { FeaturedDishes } from "@/features/home/components/featured-dishes"
import { BuildYourPlate } from "@/features/home/components/build-your-plate"
import { WhyUs } from "@/features/home/components/why-us"
import { Gallery } from "@/features/home/components/gallery"
import { HowItWorks } from "@/features/home/components/how-it-works"
import { Testimonials } from "@/features/home/components/testimonials"
import { FinalCTA } from "@/features/home/components/final-cta"
import { DottedDivider } from "@/components/shared/dotted-divider"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: `${siteConfig.name} | Soft beans. Big flavour.`,
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DottedDivider className="my-12 sm:my-16" />
      <Categories />
      <DottedDivider className="my-12 sm:my-16" />
      <FeaturedDishes />
      <DottedDivider className="my-12 sm:my-16" />
      <BuildYourPlate />
      <DottedDivider className="my-12 sm:my-16" />
      <WhyUs />
      <DottedDivider className="my-12 sm:my-16" />
      <Gallery />
      <DottedDivider className="my-12 sm:my-16" />
      <HowItWorks />
      <DottedDivider className="my-12 sm:my-16" />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
