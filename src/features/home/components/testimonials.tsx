import { Star } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";

const colorMap = {
  tan: "bg-tan",
  pink: "bg-pink-card",
  peach: "bg-peach",
  lavender: "bg-lavender",
};

export function Testimonials() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="TESTIMONIALS"
        title="What our customers say"
        description="Real reviews from real people."
      />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`rounded-3xl p-6 transition-all duration-300 hover:shadow-md ${colorMap[testimonial.color]}`}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-golden-yellow text-golden-yellow"
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-bean-black">
              &ldquo;{testimonial.review}&rdquo;
            </p>
            <div className="mt-5 border-t border-bean-black/10 pt-4">
              <p className="font-heading text-sm font-bold text-bean-black">
                {testimonial.name}
              </p>
              <p className="mt-0.5 text-xs text-warm-grey">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
