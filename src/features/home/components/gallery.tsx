import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const galleryItems = [
  {
    gradient: "from-amber-800 via-amber-700 to-red-600",
    label: "Ewa Agoyin",
    span: "col-span-2 row-span-2",
    aspect: "aspect-square",
  },
  {
    gradient: "from-yellow-400 via-amber-400 to-amber-500",
    label: "Fried Plantain",
    span: "",
    aspect: "aspect-square",
  },
  {
    gradient: "from-red-500 via-red-600 to-red-700",
    label: "Peppered Chicken",
    span: "",
    aspect: "aspect-square",
  },
  {
    gradient: "from-amber-200 via-amber-300 to-amber-400",
    label: "Soft Bread",
    span: "",
    aspect: "aspect-square",
  },
  {
    gradient: "from-amber-600 via-amber-700 to-amber-800",
    label: "Porridge Beans",
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
            {/* Gradient background as food visual placeholder */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />

            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
            </div>

            {/* Label */}
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
