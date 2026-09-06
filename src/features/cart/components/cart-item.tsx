"use client";

import { forwardRef } from "react";
import { Pencil, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "../store/cart-store";
import { FoodImage } from "@/components/shared/food-image";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  plateNumber: number;
  onEdit?: (item: CartItemType) => void;
}

export const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  ({ item, plateNumber, onEdit }: CartItemProps, ref) => {
    const incrementQuantity = useCartStore((s) => s.incrementQuantity);
    const decrementQuantity = useCartStore((s) => s.decrementQuantity);
    const removeItem = useCartStore((s) => s.removeItem);

    const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? [];
    const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? [];
    const hasAddOns = sides.length > 0 || proteins.length > 0;

    const addOnsTotal = (item.addOns ?? []).reduce(
      (sum, addOn) => sum + addOn.unitPrice * addOn.quantity * item.quantity,
      0
    );
    const plateTotal = item.price * item.quantity + addOnsTotal;

    return (
      <div ref={ref} className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-white p-4 shadow-sm transition-colors hover:border-border sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-palace-orange">
            Plate {plateNumber}
          </span>
          {item.variant === "combo" && (
            <span className="rounded-full bg-cream-deep px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warm-grey">
              Combo
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(item)}
              aria-label={`Edit plate ${plateNumber}`}
            >
              <Pencil className="size-3.5 text-warm-grey" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove plate ${plateNumber} from cart`}
          >
            <Trash2 className="size-3.5 text-warm-grey" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <FoodImage
          src={item.image}
          alt={item.name}
          category="beans"
          className="size-20 shrink-0 rounded-xl"
        />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h4 className="font-heading text-sm font-semibold text-bean-black">
              {item.name}
            </h4>
            <p className="mt-0.5 text-xs text-warm-grey">
              Base meal · {formatCurrency(item.price)}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => decrementQuantity(item.id)}
                aria-label={`Decrease quantity of plate ${plateNumber}`}
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
                aria-label={`Increase quantity of plate ${plateNumber}`}
              >
                <Plus className="size-3" />
              </Button>
            </div>
            <span className="text-sm font-bold text-bean-black">
              {formatCurrency(plateTotal)}
            </span>
          </div>
        </div>
      </div>

      {hasAddOns && (
        <div className="mt-2 flex flex-col gap-3 border-t border-border/50 pt-3">
          {sides.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">
                Sides
              </p>
              <ul className="flex flex-col gap-1">
                {sides.map((addOn) => (
                  <li
                    key={addOn.menuItemId}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-bean-black/80">
                      {addOn.name} × {addOn.quantity * item.quantity}
                    </span>
                    <span className="font-medium text-bean-black">
                      {formatCurrency(addOn.unitPrice * addOn.quantity * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {proteins.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">
                Proteins
              </p>
              <ul className="flex flex-col gap-1">
                {proteins.map((addOn) => (
                  <li
                    key={addOn.menuItemId}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-bean-black/80">
                      {addOn.name} × {addOn.quantity * item.quantity}
                    </span>
                    <span className="font-medium text-bean-black">
                      {formatCurrency(addOn.unitPrice * addOn.quantity * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {item.notes && (
        <p className="border-t border-border/50 pt-3 text-xs text-warm-grey italic">
          &ldquo;{item.notes}&rdquo;
        </p>
      )}
    </div>
  );
});

CartItem.displayName = "CartItem";
