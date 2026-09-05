"use client";

import { useCartStore } from "../store/cart-store";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { EmptyCart } from "./empty-cart";

interface CartDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-center">
      <div
        className="fixed inset-0 bg-bean-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-ivory p-6 shadow-xl sm:rounded-3xl">
        <h2 className="font-heading text-lg font-bold text-bean-black">
          Your Cart
        </h2>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
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
