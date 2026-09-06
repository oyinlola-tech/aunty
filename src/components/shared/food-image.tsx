"use client";

import { useState } from "react";
import Image from "next/image";
import { Soup } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
  beans: "from-amber-700 via-amber-800 to-amber-900",
  sides: "from-yellow-400 via-amber-400 to-amber-500",
  proteins: "from-red-500 via-red-600 to-red-700",
};

interface FoodImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

export function FoodImage({
  src,
  alt,
  category = "beans",
  className,
  imgClassName,
  children,
}: FoodImageProps) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !src || imgError;

  return (
    <div className={cn("relative overflow-hidden bg-cream-deep", className)}>
      {showFallback ? (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br",
            categoryGradients[category] || categoryGradients.beans
          )}
        >
          <Soup className="size-10 text-white/60" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-transform duration-300 group-hover:scale-105",
            imgClassName
          )}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
      {children}
    </div>
  );
}
