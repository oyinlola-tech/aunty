import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

export function Gallery() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="GALLERY"
        title="A feast for your eyes."
      />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <div className="col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl bg-cream-deep">
          <div className="flex h-full w-full items-center justify-center text-6xl">
            🍛
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-cream-deep">
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🫘
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-cream-deep">
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍗
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-cream-deep">
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍞
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-cream-deep">
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍌
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
