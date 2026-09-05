"use client";

import { formatCurrency } from "@/lib/currency";
import type { CartItem } from "@/types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  notes?: string;
}

export function OrderSummary({ items, subtotal, notes }: OrderSummaryProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-2xl bg-ivory p-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-bean-black">
        Order Summary
      </h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex-1">
              <span className="text-bean-black">{item.name}</span>
              <span className="ml-1 text-warm-grey">× {item.quantity}</span>
              {item.notes && (
                <span className="block text-xs text-warm-grey">{item.notes}</span>
              )}
            </div>
            <span className="font-medium text-bean-black">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-border/50 pt-3">
        <div className="flex items-center justify-between text-sm text-warm-grey">
          <span>Items ({totalItems})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-bold text-bean-black">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>
      {notes && (
        <div className="mt-3 rounded-xl bg-cream-deep p-3 text-sm text-bean-black/80">
          <span className="font-medium">Note:</span> {notes}
        </div>
      )}
    </div>
  );
}
