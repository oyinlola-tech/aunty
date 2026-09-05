export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  color: "tan" | "pink" | "peach" | "lavender";
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Adaeze",
    location: "Port Harcourt",
    rating: 5,
    review:
      "Soft beans exactly how I like it. The plantain was perfect too. Definitely ordering again!",
    color: "tan",
  },
  {
    id: "2",
    name: "Chidi",
    location: "GRA, Port Harcourt",
    rating: 5,
    review:
      "Best ewa agoyin I've had in a long time. The stew was rich and flavourful.",
    color: "pink",
  },
  {
    id: "3",
    name: "Blessing",
    location: "Port Harcourt",
    rating: 5,
    review:
      "The peppered chicken was so good! My whole family loved it. Thank you, Soft Beans Palace!",
    color: "peach",
  },
  {
    id: "4",
    name: "Emeka",
    location: "Trans-Amadi, Port Harcourt",
    rating: 5,
    review:
      "Quick delivery and the food was still hot. The porridge beans are a must-try.",
    color: "lavender",
  },
];
