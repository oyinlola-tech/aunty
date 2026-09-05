import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  const sizeClasses = {
    sm: {
      current: "text-sm font-bold",
      original: "text-xs",
    },
    md: {
      current: "text-lg font-bold",
      original: "text-sm",
    },
    lg: {
      current: "text-xl font-bold",
      original: "text-base",
    },
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-heading text-palace-orange",
          sizeClasses[size].current
        )}
      >
        {formatCurrency(price)}
      </span>
      {hasDiscount && (
        <span
          className={cn(
            "font-heading text-warm-grey line-through",
            sizeClasses[size].original
          )}
        >
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
}
