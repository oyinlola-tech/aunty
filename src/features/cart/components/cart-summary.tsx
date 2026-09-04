"use client"

import { ShoppingBag } from "lucide-react"
import { useCartStore } from "../store/cart-store"
import { formatCurrency } from "@/lib/currency"

export function CartSummary() {
  const subtotal = useCartStore((s) => s.getSubtotal())
  const totalItems = useCartStore((s) => s.getTotalItems())
  const clearCart = useCartStore((s) => s.clearCart)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-cream p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="size-5 text-warm-grey" />
          <span className="text-sm text-warm-grey">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {totalItems > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear everything from your cart?")) {
                clearCart()
              }
            }}
            className="text-xs text-warm-grey hover:text-rich-red"
          >
            Clear cart
          </button>
        )}
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

      <p className="text-xs text-warm-grey">
        No payment processed online. You will complete your order via WhatsApp.
      </p>
    </div>
  )
}
