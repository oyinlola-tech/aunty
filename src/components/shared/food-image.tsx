import Image from "next/image";
import { cn } from "@/lib/utils";

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function FoodImage({
  src,
  alt,
  className,
  priority = false,
}: FoodImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-2xl bg-cream-deep",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
