"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "@/features/cart/store/cart-store";
import { FoodImage } from "@/components/shared/food-image";
import { PriceDisplay } from "@/components/shared/price-display";
import { QuantitySelector } from "./quantity-selector";
import { MealConfigurator } from "./meal-configurator";
import type { MenuItem } from "@/types/menu";
import type { CartItem } from "@/types/cart";

interface ProductModalProps {
  item: MenuItem;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  existing?: CartItem;
  onAdded?: () => void;
}

export function ProductModal({
  item,
  open,
  onOpenChange,
  onClose,
  existing,
  onAdded,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(existing?.quantity ?? 1);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const updateItem = useCartStore((s) => s.updateItem);

  const isCustomizable =
    item.customization?.sides === true ||
    item.customization?.proteins === true;

  const isVisible = open !== undefined ? open : true;
  const handleClose = () => {
    onClose?.();
    onOpenChange?.(false);
  };

  function handleSimpleAddToCart() {
    if (existing) {
      updateItem(existing.id, {
        quantity,
        notes: notes.trim() || undefined,
      });
    } else {
      addItem({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity,
        notes: notes.trim() || undefined,
      });
    }
    handleClose();
    onAdded?.();
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="fixed inset-0 bg-bean-black/50" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-lg rounded-t-3xl bg-ivory sm:rounded-3xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex size-8 items-center justify-center rounded-full bg-cream-deep text-warm-grey hover:text-bean-black"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <FoodImage
          src={item.image}
          alt={item.name}
          category={item.categoryId}
          className="aspect-video w-full rounded-t-3xl sm:rounded-t-3xl"
        />

        <div className="p-6">
          <h2 className="font-heading text-2xl font-bold text-bean-black">
            {item.name}
          </h2>
          <p className="mt-2 text-sm text-warm-grey">{item.description}</p>
          <div className="mt-3">
            <PriceDisplay
              price={item.price}
              originalPrice={item.originalPrice}
              size="lg"
            />
          </div>

          {isCustomizable ? (
            <MealConfigurator
              item={item}
              existing={existing}
              stickyBar="dialog"
              onAdded={() => {
                onAdded?.();
                handleClose();
              }}
            />
          ) : (
            <>
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-bean-black">
                  Special Instructions
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra stew, less pepper..."
                  className="h-20 w-full resize-none rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-bean-black placeholder:text-warm-grey focus:border-palace-orange focus:outline-none focus:ring-2 focus:ring-palace-orange/20"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <Button variant="default" onClick={handleSimpleAddToCart}>
                  {existing ? "Update" : "Add to Cart"} -{" "}
                  {formatCurrency(item.price * quantity)}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
