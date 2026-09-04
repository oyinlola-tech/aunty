import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { cn } from "@/lib/utils"

const valuePoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
    title: "Freshly Prepared",
    description: "Made fresh to give you the best flavour in every bite.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-2 4-4 6-4 6s2-2 4-4c2 2 4 4 4 4s-2-2-4-4c-2 1-2-1-2-1z" />
        <path d="M12 22v-4" />
      </svg>
    ),
    title: "Comfort in Every Bite",
    description: "Soft, satisfying food made to feel like home.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    title: "Your Plate, Your Way",
    description: "Mix your beans, sides, and proteins the way you like them.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c-4 0-7-3-7-7 0-3 2-5 4-6 2 1 4 3 4 6 0 4-3 7-7 7z" />
        <path d="M9 9h6M12 6v6" />
      </svg>
    ),
    title: "Made With Care",
    description: "Good food deserves attention from preparation to delivery.",
  },
]

export function WhyUs() {
  return (
    <SectionContainer className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <Sticker variant="purple">Why Us</Sticker>
        <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
          What makes us different
        </h2>
        <p className="max-w-lg text-warm-grey">
          We believe in good food, good service, and making you happy.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valuePoints.map((point, index) => (
          <div
            key={point.title}
            className={cn(
              "flex flex-col gap-4 rounded-2xl bg-cream p-6 transition-all hover:shadow-md",
              index % 2 === 1 && "bg-cream-deep"
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-palace-orange text-white">
              {point.icon}
            </div>
            <h3 className="font-heading text-lg font-bold text-bean-black">
              {point.title}
            </h3>
            <p className="text-sm text-warm-grey">{point.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
