"use client"

import Image from "next/image"
import { formatCurrency } from "@/lib/currency"
import { Check } from "lucide-react"

interface OrderSummaryProps {
  items: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    notes?: string
  }[]
  subtotal: number
  notes?: string
}

export function OrderSummary({
  items,
  subtotal,
  notes,
}: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-cream p-4">
      <div>
        <h3 className="font-heading text-lg font-bold text-bean-black">
          Order Summary
        </h3>
        <p className="mt-1 text-sm text-warm-grey">
          Review your order before sending
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl bg-cream-deep p-3"
          >
            <div className="relative flex size-16 flex-shrink-0 overflow-hidden rounded-lg bg-palace-orange">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold text-bean-black line-clamp-1">
                  {item.name}
                </span>
                {item.price > 0 ? (
                  <span className="text-sm font-semibold text-bean-black">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-warm-grey">
                Qty: {item.quantity}
                {item.notes ? ` · ${item.notes}` : ""}
              </p>
            </div>
          </div>
        ))}
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
          <h4 className="text-xs font-semibold uppercase tracking-wide text-warm-grey">
            Special Instructions
          </h4>
          <p className="mt-1 text-sm text-bean-black">{notes}</p>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-xl bg-muted-green/20 p-3">
        <Check className="mt-0.5 size-5 text-muted-green" />
        <p className="text-sm text-muted-green">
          You will complete the order via WhatsApp after reviewing this message.
        </p>
      </div>
    </div>
  )
}
