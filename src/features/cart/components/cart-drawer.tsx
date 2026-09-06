"use client";

import { useEffect, useRef } from "react";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../store/cart-store";
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full z-50 mt-2 w-96 rounded-2xl border border-border/50 bg-ivory shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-palace-orange" aria-hidden="true" />
          <h3 className="font-heading text-base font-bold text-bean-black">
            Your Cart
          </h3>
          {items.length > 0 && (
            <span className="rounded-full bg-palace-orange px-2 py-0.5 text-xs font-bold text-white">
              {items.length}
            </span>
          )}
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
        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-cream-deep">
            <ShoppingBag className="size-6 text-warm-grey" aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-bean-black">
              Your cart is waiting.
            </p>
            <p className="mt-1 text-xs text-warm-grey">
              Start building your perfect plate.
            </p>
          </div>
          <Link
            href="/menu"
            className={cn(buttonVariants({ size: "sm" }), "mt-2 no-underline")}
            onClick={() => onOpenChange?.(false)}
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="max-h-[50vh] space-y-2 overflow-y-auto p-3">
            {items.map((item) => {
              const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? [];
              const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? [];
              const addOnSummary = [
                ...(sides.length > 0 ? [`${sides.length} side${sides.length === 1 ? "" : "s"}`] : []),
                ...(proteins.length > 0 ? [`${proteins.length} protein${proteins.length === 1 ? "" : "s"}`] : []),
              ].join(" · ");

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-3"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
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
                    {addOnSummary && (
                      <p className="mt-0.5 text-xs text-warm-grey">
                        {addOnSummary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
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
