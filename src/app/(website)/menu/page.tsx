import type { Metadata } from "next"
import { MenuExperience } from "@/features/menu/components/menu-experience"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore delicious beans, sides and proteins from Soft Beans Palace. Ewa Agoyin, soft porridge beans, fried plantain and more — order on WhatsApp.",
  alternates: { canonical: "/menu" },
}

interface MenuPageProps {
  searchParams: Promise<{ category?: string; item?: string }>
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category, item } = await searchParams

  return (
    <>
      <SectionContainer className="flex flex-col gap-10 py-16">
        <Reveal className="flex flex-col gap-4">
          <Sticker variant="orange">Our Menu</Sticker>
          <h1 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl lg:text-5xl">
            Everything delicious,
            <br />
            all in one place.
          </h1>
          <p className="max-w-lg text-warm-grey">
            Browse our selection of soft beans, sides, and proteins.
          </p>
        </Reveal>

        {/* Keyed so a category/item deep link mounts a fresh experience
            instead of carrying over a previous filter or open dish. */}
        <MenuExperience
          key={`${category ?? "all"}:${item ?? ""}`}
          initialCategory={category}
          initialItemSlug={item}
        />
      </SectionContainer>
    </>
  )
}
