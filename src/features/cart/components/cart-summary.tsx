"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "../store/cart-store";

export function CartSummary() {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <div className="border-t border-border/50 pt-4">
      <div className="flex items-center justify-between text-sm text-warm-grey">
        <span>Items ({totalItems})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-base font-semibold text-bean-black">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <Link href="/checkout" className="mt-4 block">
        <Button variant="default" className="w-full">
          Continue to Checkout
        </Button>
      </Link>
    </div>
  );
}
