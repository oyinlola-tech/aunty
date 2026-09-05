"use client";

import { useCartStore } from "../store/cart-store";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { EmptyCart } from "./empty-cart";
import { X } from "lucide-react";

interface CartDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-bean-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange?.(false)}
      />

      <div
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl sm:ml-auto sm:rounded-l-3xl"
        style={{
          animation: "sbp-slide-in 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between border-b border-border/50 p-5">
          <h2 className="font-heading text-lg font-bold text-bean-black">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            className="flex size-8 items-center justify-center rounded-full bg-cream text-warm-grey transition-colors hover:bg-border/50 hover:text-bean-black"
            aria-label="Close cart"
          >
            <X className="size-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </>
        )}
      </div>
    </div>
  );
}
