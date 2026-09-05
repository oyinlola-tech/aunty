"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/cart-store";
import { EmptyCart } from "./empty-cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";

interface CartDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCheckout?: () => void;
}

export function CartDrawer({ open, onOpenChange, onCheckout }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    onCheckout?.();
    onOpenChange?.(false);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border/50 bg-ivory shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <div>
          <h3 className="font-heading text-base font-bold text-bean-black">
            Your Cart
          </h3>
          <p className="text-xs text-warm-grey">
            {items.length} plate{items.length === 1 ? "" : "s"} ready
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange?.(false)}
          className="flex size-7 items-center justify-center rounded-full text-warm-grey transition-colors hover:bg-cream-deep hover:text-bean-black"
          aria-label="Close cart"
        >
          <X className="size-4" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center">
          <EmptyCart />
        </div>
      ) : (
        <>
          <div className="max-h-[50vh] space-y-3 overflow-y-auto p-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-3"
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-bean-black">
                      {item.name}
                    </p>
                    <span className="text-xs font-bold text-bean-black">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-warm-grey">
                    Plate {index + 1}
                    {item.addOns && item.addOns.length > 0 && (
                      <>
                        {" "}
                        · {item.addOns.length} add-on
                        {item.addOns.length === 1 ? "" : "s"}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-warm-grey">Subtotal</span>
              <span className="text-sm font-bold text-bean-black">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Link
                href="/cart"
                className={cn(
                  buttonVariants({ variant: "soft", size: "sm" }),
                  "w-full no-underline"
                )}
                onClick={() => onOpenChange?.(false)}
              >
                View Full Cart
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
