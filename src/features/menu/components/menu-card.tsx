"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart-store";
import { FoodImage } from "@/components/shared/food-image";
import { PriceDisplay } from "@/components/shared/price-display";
import type { MenuItem } from "@/types/menu";
import { Plus, Info } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onViewDetails?: (item: MenuItem) => void;
  onAdd?: (item: MenuItem) => void;
}

export function MenuCard({ item, onViewDetails, onAdd }: MenuCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (!item.available) return;
    if (onAdd) {
      onAdd(item);
    } else {
      addItem({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    }
  }

  function handleClick() {
    const isCustomizable = (item.customization?.sides || item.customization?.proteins) && item.categoryId !== "proteins"
    if (isCustomizable && item.available) {
      router.push(`/menu/${item.slug}`)
      return
    }
    if (onAdd && item.categoryId === "proteins") {
      onAdd(item);
    } else if (onViewDetails) {
      onViewDetails(item);
    } else if (onAdd) {
      onAdd(item);
    }
  }

  const isProtein = item.categoryId === "proteins"
  const showQuickAdd = item.available && !isProtein

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl bg-ivory shadow-sm transition-all hover:shadow-md",
        !item.available && "opacity-60 cursor-default"
      )}
    >
      <FoodImage
        src={item.image}
        alt={item.name}
        category={item.categoryId}
        className="aspect-square"
      >
        {!item.available && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-bean-black/50">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-bean-black">
              Sold Out
            </span>
          </div>
        )}
        {item.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-palace-orange px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Popular
          </span>
        )}
        {isProtein && item.available && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-espresso px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Add to plate
          </span>
        )}
      </FoodImage>
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-bean-black">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-warm-grey">
          {item.description}
        </p>
        {isProtein && item.available && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-warm-grey">
            <Info className="size-3.5" aria-hidden="true" />
            Add this inside a meal or side plate.
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <PriceDisplay
            price={item.price}
            originalPrice={item.originalPrice}
            size="md"
          />
          {showQuickAdd && (
            <button
              onClick={handleQuickAdd}
              className="flex size-8 items-center justify-center rounded-full bg-palace-orange text-white transition-colors hover:bg-palace-orange-hover"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
