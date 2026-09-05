"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "../store/cart-store";
import { FoodImage } from "@/components/shared/food-image";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? []
  const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? []
  const hasAddOns = sides.length > 0 || proteins.length > 0

  return (
    <div className="flex gap-4 rounded-2xl border border-border/50 bg-white p-3 shadow-sm transition-colors hover:border-border">
      <FoodImage
        src={item.image}
        alt={item.name}
        category="beans"
        className="size-20 shrink-0 rounded-xl"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading text-sm font-semibold text-bean-black">
              {item.name}
            </h4>
            <span className="text-sm font-bold text-bean-black">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>

          {hasAddOns && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {sides.map((addOn) => (
                <span
                  key={addOn.menuItemId}
                  className="inline-flex items-center gap-1 rounded-full bg-cream-deep px-2 py-0.5 text-xs font-medium text-warm-grey"
                >
                  {addOn.name} × {addOn.quantity * item.quantity}
                </span>
              ))}
              {proteins.map((addOn) => (
                <span
                  key={addOn.menuItemId}
                  className="inline-flex items-center gap-1 rounded-full bg-cream-deep px-2 py-0.5 text-xs font-medium text-warm-grey"
                >
                  {addOn.name} × {addOn.quantity * item.quantity}
                </span>
              ))}
            </div>
          )}

          {item.notes && (
            <p className="mt-1.5 text-xs text-warm-grey italic">
              &ldquo;{item.notes}&rdquo;
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => decrementQuantity(item.id)}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus className="size-3" />
            </Button>
            <span className="min-w-[1.5rem] text-center text-sm font-medium text-bean-black">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => incrementQuantity(item.id)}
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="size-3.5 text-warm-grey" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
