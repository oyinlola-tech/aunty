export interface Testimonial {
  id: string
  quote: string
  customerName: string
  location: string
  rating: number
}

// DEVELOPMENT PLACEHOLDERS — replace with real customer feedback (with
// permission) before launch. Do not present these as genuine reviews.
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Soft beans exactly how I like it. The plantain was perfect too.",
    customerName: "Chioma O.",
    location: "Port Harcourt",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "Best Ewa Agoyin in Port Harcourt. Always fresh and always delicious.",
    customerName: "Tunde A.",
    location: "Rivers State",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "You go love am! That's the only way to describe their food.",
    customerName: "Blessing E.",
    location: "Port Harcourt",
    rating: 5,
  },
]
