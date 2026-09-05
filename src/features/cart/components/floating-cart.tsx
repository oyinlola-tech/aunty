"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { useCartStore } from "../store/cart-store";

export function FloatingCart() {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const subtotal = useCartStore((s) => s.getSubtotal());

  if (totalItems === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-20 left-4 right-4 z-40 flex items-center justify-between rounded-2xl bg-espresso px-5 py-3 shadow-lg md:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingBag className="size-5 text-white" />
          <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-palace-orange text-[9px] font-bold text-white">
            {totalItems}
          </span>
        </div>
        <span className="text-sm font-medium text-white">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-white">
          {formatCurrency(subtotal)}
        </span>
        <span className="text-xs text-white/70">View Cart</span>
      </div>
    </Link>
  );
}
