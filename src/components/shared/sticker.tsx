import { cn } from "@/lib/utils";

interface StickerProps {
  children: React.ReactNode;
  variant?: "orange" | "purple" | "pink" | "gold" | "green";
  className?: string;
}

const variantStyles = {
  orange: "bg-palace-orange text-white",
  purple: "bg-purple-sticker text-white",
  pink: "bg-pink-sticker text-white",
  gold: "bg-golden-yellow text-bean-black",
  green: "bg-muted-green text-white",
};

export function Sticker({
  children,
  variant = "orange",
  className,
}: StickerProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
