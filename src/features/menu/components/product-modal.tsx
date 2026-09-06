"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "@/features/cart/store/cart-store";
import { FoodImage } from "@/components/shared/food-image";
import { PriceDisplay } from "@/components/shared/price-display";
import { QuantitySelector } from "./quantity-selector";
import { MealConfigurator } from "./meal-configurator";
import type { MenuItem } from "@/types/menu";
import type { CartItem, CartAddOn } from "@/types/cart";
import Link from "next/link";

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
  const dialogRef = useRef<HTMLDivElement>(null);

  const isCustomizable =
    item.customization?.sides === true ||
    item.customization?.proteins === true;

  const isProtein = item.categoryId === "proteins";

  const isVisible = open !== undefined ? open : false;
  const handleClose = useCallback(() => {
    onClose?.();
    onOpenChange?.(false);
  }, [onClose, onOpenChange]);

  const [configState, setConfigState] = useState({
    canSave: true,
    isSubmitting: false,
    lineTotal: item.price,
    unitPrice: item.price,
    mealQuantity: 1,
    selectedAddOns: [] as CartAddOn[],
  });

  useEffect(() => {
    if (!isVisible) return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

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

  function handleConfigSave() {
    if (existing) {
      updateItem(existing.id, {
        quantity: configState.mealQuantity,
        notes: notes.trim() || undefined,
        addOns: configState.selectedAddOns,
      });
    } else {
      addItem({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: configState.mealQuantity,
        notes: notes.trim() || undefined,
        addOns: configState.selectedAddOns,
      });
    }
    handleClose();
    onAdded?.();
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="fixed inset-0 bg-bean-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative z-10 flex h-full max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-ivory sm:max-h-[90vh] sm:max-w-lg sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.name} details`}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex size-8 items-center justify-center rounded-full bg-cream-deep text-warm-grey transition-colors hover:text-bean-black"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="shrink-0">
          <FoodImage
            src={item.image}
            alt={item.name}
            category={item.categoryId}
            className="aspect-video w-full rounded-t-3xl sm:rounded-t-3xl"
          />
          <div className="border-b border-border/50 p-5 sm:p-6">
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
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-5 sm:p-6">
            {isProtein ? (
              <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-cream p-5">
                <p className="font-heading text-base font-semibold text-bean-black">
                  Build a plate first
                </p>
                <p className="text-sm text-warm-grey">
                  Proteins are added inside a meal or side plate. Choose a base
                  first, then add your favourite proteins while you build it.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/menu" onClick={handleClose}>
                    <Button className="w-full sm:w-auto">Browse Meals</Button>
                  </Link>
                  <Link href="/menu?category=sides" onClick={handleClose}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Browse Sides
                    </Button>
                  </Link>
                </div>
              </div>
            ) : isCustomizable ? (
              <MealConfigurator
                item={item}
                existing={existing}
                stickyBar="none"
                onChange={setConfigState}
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
                    rows={3}
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

        {isCustomizable && !isProtein && (
          <div className="shrink-0 border-t border-border/50 bg-cream/95 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-warm-grey">
                  Total · {configState.mealQuantity} × {formatCurrency(configState.unitPrice)}
                </span>
                <span className="font-heading text-xl font-bold text-bean-black">
                  {formatCurrency(configState.lineTotal)}
                </span>
              </div>
              <Button
                size="lg"
                className="flex-shrink-0"
                disabled={!configState.canSave || configState.isSubmitting}
                onClick={handleConfigSave}
              >
                {configState.isSubmitting
                  ? existing
                    ? "Saving..."
                    : "Adding..."
                  : existing
                    ? "Save Changes"
                    : "Add to Cart"}
                {!configState.isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
