import { testimonials } from "@/data/testimonials"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

const pastelBackgrounds = [
  "bg-tan",
  "bg-pink-card",
  "bg-peach",
  "bg-lavender",
]

export function Testimonials() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <SectionContainer className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="What People Say" title="Happy customers" />
        </Reveal>

        <div className="flex gap-6 overflow-x-auto pb-4 sm:flex-wrap lg:justify-center">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.06} className="w-72 shrink-0">
              <figure
                className={cn(
                  "flex h-full flex-col gap-3 rounded-2xl p-6",
                  pastelBackgrounds[index % pastelBackgrounds.length]
                )}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-palace-orange text-palace-orange"
                    />
                  ))}
                </div>
                <blockquote className="font-heading text-base leading-relaxed font-medium text-bean-black">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex flex-col gap-0.5 pt-1">
                  <span className="text-sm text-warm-grey">
                    {testimonial.customerName}
                  </span>
                  <span className="text-xs text-warm-grey">
                    {testimonial.location}
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
