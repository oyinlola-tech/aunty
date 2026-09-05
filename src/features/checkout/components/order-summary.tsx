"use client";

import { formatCurrency } from "@/lib/currency";
import type { CartItem, CartAddOn } from "@/types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  notes?: string;
}

function AddOnGroup({
  title,
  addOns,
  plateQuantity,
}: {
  title: string;
  addOns: CartAddOn[];
  plateQuantity: number;
}) {
  if (addOns.length === 0) return null;

  return (
    <div className="mt-2 pl-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">
        {title}
      </p>
      <ul className="mt-1 space-y-1">
        {addOns.map((addOn) => (
          <li
            key={addOn.menuItemId}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-bean-black/80">
              {addOn.name} × {addOn.quantity * plateQuantity}
            </span>
            <span className="font-medium text-bean-black">
              {formatCurrency(addOn.unitPrice * addOn.quantity * plateQuantity)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OrderSummary({ items, subtotal, notes }: OrderSummaryProps) {
  const totalItems = items.reduce((sum, item) => {
    const addOnPortions = (item.addOns ?? []).reduce(
      (addOnSum, addOn) => addOnSum + addOn.quantity * item.quantity,
      0
    );
    return sum + item.quantity + addOnPortions;
  }, 0);

  return (
    <div className="rounded-2xl bg-ivory p-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-bean-black">
        Order Summary
      </h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => {
          const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? [];
          const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? [];
          const addOnsTotal = (item.addOns ?? []).reduce(
            (sum, addOn) => sum + addOn.unitPrice * addOn.quantity * item.quantity,
            0
          );
          const plateTotal = item.price * item.quantity + addOnsTotal;

          return (
            <div
              key={item.id}
              className="rounded-xl border border-border/50 bg-cream/50 p-3"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex-1">
                  <span className="font-semibold text-bean-black">
                    {item.name}
                  </span>
                  <span className="ml-1 text-warm-grey">
                    × {item.quantity}
                  </span>
                </div>
                <span className="font-medium text-bean-black">
                  {formatCurrency(plateTotal)}
                </span>
              </div>

              <AddOnGroup
                title="Sides"
                addOns={sides}
                plateQuantity={item.quantity}
              />
              <AddOnGroup
                title="Proteins"
                addOns={proteins}
                plateQuantity={item.quantity}
              />

              {item.notes && (
                <p className="mt-2 text-xs text-warm-grey italic">
                  &ldquo;{item.notes}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t border-border/50 pt-3">
        <div className="flex items-center justify-between text-sm text-warm-grey">
          <span>
            {items.length} {items.length === 1 ? "plate" : "plates"} ·{" "}
            {totalItems} {totalItems === 1 ? "portion" : "portions"}
          </span>
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
