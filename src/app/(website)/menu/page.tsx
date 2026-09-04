import type { Metadata } from "next"
import { MenuExperience } from "@/features/menu/components/menu-experience"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore delicious beans, sides and proteins from Soft Beans Palace.",
}

export default function MenuPage() {
  return (
    <>
      <SectionContainer className="flex flex-col gap-10 py-16">
        <div className="flex flex-col gap-4">
          <Sticker variant="orange">Our Menu</Sticker>
          <h1 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl lg:text-5xl">
            Everything delicious,
            <br />
            all in one place.
          </h1>
          <p className="max-w-lg text-warm-grey">
            Browse our selection of soft beans, sides, and proteins.
          </p>
        </div>

        <MenuExperience />
      </SectionContainer>
    </>
  )
}
