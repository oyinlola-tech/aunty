"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "@/features/cart/store/cart-store";
import type { MenuItem } from "@/types/menu";
import { Plus } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onViewDetails?: (item: MenuItem) => void;
  onAdd?: (item: MenuItem) => void;
}

export function MenuCard({ item, onViewDetails, onAdd }: MenuCardProps) {
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
    if (onViewDetails) {
      onViewDetails(item);
    } else if (onAdd) {
      onAdd(item);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl bg-ivory shadow-sm transition-all hover:shadow-md",
        !item.available && "opacity-60"
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-deep">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-bean-black/50">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-bean-black">
              Sold Out
            </span>
          </div>
        )}
        {item.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-palace-orange px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Popular
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-bean-black">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-warm-grey">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-bean-black">
            {formatCurrency(item.price)}
          </span>
          {item.available && (
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
