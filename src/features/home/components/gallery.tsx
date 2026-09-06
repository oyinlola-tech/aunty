import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import Image from "next/image";

const galleryItems = [
  {
    src: "/images/gallery/beans-porridge.webp",
    label: "Beans Porridge",
    span: "col-span-2 row-span-2",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/fried-plantain.webp",
    label: "Fried Plantain",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/african-beans.webp",
    label: "African Beans",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/beans-soup.webp",
    label: "Beans Soup",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/plantain-corn.webp",
    label: "Plantain & More",
    span: "",
    aspect: "aspect-square",
  },
];

export function Gallery() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="GALLERY"
        title="A feast for your eyes."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl ${item.span} ${item.aspect}`}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
              <span className="font-heading text-sm font-bold text-white">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
