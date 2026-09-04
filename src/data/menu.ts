import type { MenuItem } from "@/types/menu"

/**
 * Development placeholder shown until real Soft Beans Palace food
 * photography is available for a dish. Prices are also pending.
 */
export const PHOTO_PLACEHOLDER = "/images/food/photo-coming-soon.svg"

export const menuItems: MenuItem[] = [
  // Beans
  {
    id: "ewa-agoyin",
    name: "Ewa Agoyin",
    slug: "ewa-agoyin",
    description:
      "Soft, tender beans served with rich and flavourful agoyin stew. A classic Nigerian comfort food.",
    price: 0,
    categoryId: "beans",
    image: "/images/food/beans/ewa-agoyin.jpg",
    featured: true,
    available: true,
  },
  {
    id: "plain-soft-beans",
    name: "Plain Soft Beans with Stew",
    slug: "plain-soft-beans-with-stew",
    description:
      "Simply prepared soft beans served with a savoury tomato stew. No extras, just delicious beans.",
    price: 0,
    categoryId: "beans",
    image: "/images/food/beans/plain-soft-beans.jpg",
    featured: false,
    available: true,
  },
  {
    id: "soft-porridge-beans",
    name: "Soft Porridge Beans",
    slug: "soft-porridge-beans",
    description:
      "Creamy soft beans cooked to perfection with spices. Comfort food at its best.",
    price: 0,
    categoryId: "beans",
    image: "/images/food/beans/soft-porridge-beans.jpg",
    featured: true,
    available: true,
  },

  // Sides
  {
    id: "soft-bread",
    name: "Soft Bread",
    slug: "soft-bread",
    description:
      "Fresh, soft bread that pairs perfectly with any of our beans or sides.",
    price: 0,
    categoryId: "sides",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "fried-plantain",
    name: "Fried Plantain",
    slug: "fried-plantain",
    description:
      "Golden fried plantain with a perfect sweet and savory balance. A popular side choice.",
    price: 0,
    categoryId: "sides",
    image: "/images/food/sides/fried-plantain.jpg",
    featured: true,
    available: true,
  },
  {
    id: "fried-yam-sticks",
    name: "Fried Yam Sticks",
    slug: "fried-yam-sticks",
    description:
      "Crispy fried yam sticks — a crunchy, satisfying side with great texture.",
    price: 0,
    categoryId: "sides",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "fried-potatoes",
    name: "Fried Potatoes",
    slug: "fried-potatoes",
    description:
      "Golden fried potatoes seasoned to perfection. Simple, satisfying, and delicious.",
    price: 0,
    categoryId: "sides",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },

  // Proteins
  {
    id: "fried-fish",
    name: "Fried Fish",
    slug: "fried-fish",
    description:
      "Perfectly fried fish with a crispy golden coating. Pairs beautifully with beans.",
    price: 0,
    categoryId: "proteins",
    image: "/images/food/proteins/fried-fish.jpg",
    featured: true,
    available: true,
  },
  {
    id: "fried-beef",
    name: "Fried Beef",
    slug: "fried-beef",
    description:
      "Tender fried beef seasoned with rich Nigerian spices. Hearty and satisfying.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "fried-goat-meat",
    name: "Fried Goat Meat",
    slug: "fried-goat-meat",
    description:
      "Succulent fried goat meat with bold Nigerian seasoning. A popular protein choice.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "peppered-chicken",
    name: "Peppered Chicken",
    slug: "peppered-chicken",
    description:
      "Flavorful peppered chicken cooked with aromatic spices. Rich and delicious.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: true,
    available: true,
  },
  {
    id: "peppered-beef",
    name: "Peppered Beef",
    slug: "peppered-beef",
    description:
      "Beef cooked in a rich peppered sauce. Tender, flavorful, and packed with taste.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "peppered-goat-meat",
    name: "Peppered Goat Meat",
    slug: "peppered-goat-meat",
    description:
      "Goat meat in a delicious peppered sauce. A beloved Nigerian delicacy.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "peppered-fish",
    name: "Peppered Fish",
    slug: "peppered-fish",
    description:
      "Fish cooked in spicy peppered sauce. Bold flavour and tender fish in every bite.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
  {
    id: "sauteed-ponmo",
    name: "Sauteed Ponmo",
    slug: "sauteed-ponmo",
    description:
      "Beautifully sauteed ponmo with rich spices. A traditional Nigerian favourite.",
    price: 0,
    categoryId: "proteins",
    image: PHOTO_PLACEHOLDER,
    featured: false,
    available: true,
  },
]
