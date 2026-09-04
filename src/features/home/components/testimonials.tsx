import { testimonials } from "@/data/testimonials"
import { SectionContainer } from "@/components/shared/section-container"
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
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-palace-orange">
            What People Say
          </span>
          <h2 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl">
            Happy customers
          </h2>
        </Reveal>

        <div className="flex gap-6 overflow-x-auto pb-4 sm:flex-wrap lg:justify-center">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 0.06}
              className="w-72 shrink-0"
            >
            <figure
              className={cn(
                "flex h-full flex-col gap-3 rounded-2xl bg-cream-deep p-6",
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
              <blockquote className="font-heading text-base font-medium text-bean-black leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 text-sm text-warm-grey">
                <span>— {testimonial.customerName}</span>
              </div>
              <p className="text-xs text-warm-grey">{testimonial.location}</p>
            </figure>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
