"use client"

import Image from "next/image"
import { formatCurrency } from "@/lib/currency"
import { Check } from "lucide-react"
import type { CartItem } from "@/types/cart"
import {
  getAddOnTotal,
  getCartItemLineTotal,
} from "@/features/cart/utils/pricing"

const ADD_ON_LABEL: Record<string, string> = {
  sides: "Side",
  proteins: "Protein",
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  /** Whole-order notes captured at checkout (separate from per-meal notes). */
  notes?: string
}

export function OrderSummary({ items, subtotal, notes }: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-cream p-4">
      <div>
        <h3 className="font-heading text-lg font-bold text-bean-black">
          Order Summary
        </h3>
        <p className="mt-1 text-sm text-warm-grey">
          Review your configured meals before sending
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const lineTotal = getCartItemLineTotal(item)
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl bg-cream-deep p-3 sm:flex-row sm:items-start"
            >
              <div className="flex flex-1 items-start gap-3">
                <div className="relative size-14 flex-shrink-0 overflow-hidden rounded-lg bg-palace-orange sm:size-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-heading text-sm font-semibold text-bean-black">
                      {item.name}
                    </span>
                    <span className="text-xs text-warm-grey">
                      Qty {item.quantity}
                    </span>
                  </div>

                  {item.addOns.length > 0 && (
                    <ul
                      className="flex flex-col gap-0.5"
                      aria-label="Customization"
                    >
                      {item.addOns.map((addOn) => (
                        <li
                          key={`${addOn.categoryId}-${addOn.menuItemId}`}
                          className="text-xs text-warm-grey"
                        >
                          <span className="font-semibold text-bean-black">
                            {ADD_ON_LABEL[addOn.categoryId]}:
                          </span>{" "}
                          {addOn.name}
                          {addOn.quantity > 1 && <span> × {addOn.quantity}</span>}
                          {addOn.unitPrice > 0 && (
                            <span className="text-warm-grey">
                              {" "}
                              (+{formatCurrency(getAddOnTotal(addOn))})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.notes && (
                    <p className="text-xs leading-relaxed text-warm-grey italic">
                      &ldquo;{item.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end sm:w-24 sm:justify-end">
                {lineTotal > 0 ? (
                  <span className="font-heading text-sm font-bold text-bean-black">
                    {formatCurrency(lineTotal)}
                  </span>
                ) : (
                  <span className="text-xs text-warm-grey">Price on request</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border/50 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-warm-grey">
            {subtotal > 0 ? "Subtotal" : "Total"}
          </span>
          {subtotal > 0 ? (
            <span className="font-heading text-xl font-bold text-bean-black">
              {formatCurrency(subtotal)}
            </span>
          ) : (
            <span className="text-sm font-medium text-warm-grey">
              Confirmed on WhatsApp
            </span>
          )}
        </div>
      </div>

      {notes && (
        <div className="rounded-xl bg-cream-deep p-3">
          <h4 className="text-xs font-semibold tracking-wide text-warm-grey uppercase">
            Order Notes
          </h4>
          <p className="mt-1 text-sm text-bean-black">{notes}</p>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-xl bg-muted-green/15 p-3">
        <Check className="mt-0.5 size-5 flex-shrink-0 text-muted-green" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-bean-black/80">
          You will complete the order via WhatsApp after reviewing this message.
        </p>
      </div>
    </div>
  )
}
