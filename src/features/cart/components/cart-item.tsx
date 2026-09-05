"use client";

import { Minus, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "../store/cart-store";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onEdit?: (item: CartItemType) => void;
}

export function CartItem({ item, onEdit }: CartItemProps) {
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="font-heading text-sm font-semibold text-bean-black">
            {item.name}
          </h4>
          {item.notes && (
            <p className="mt-0.5 text-xs text-warm-grey">{item.notes}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-bean-black">
              {formatCurrency(item.price * item.quantity)}
            </span>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onEdit(item)}
                aria-label={`Edit ${item.name}`}
              >
                <Pencil className="size-3 text-warm-grey" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="size-3 text-warm-grey" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
