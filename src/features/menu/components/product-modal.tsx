"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import type { MenuItem } from "@/types/menu"
import { QuantitySelector } from "./quantity-selector"
import { useCartStore } from "@/features/cart/store/cart-store"

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
}

export function ProductModal({
  open,
  onOpenChange,
  item,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = async () => {
    setIsSubmitting(true)

    try {
      addItem({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity,
        notes: notes.trim() || undefined,
      })

      setQuantity(1)
      setNotes("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-6">
          <div className="relative flex aspect-video w-full overflow-hidden rounded-xl bg-cream-deep">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="font-heading text-2xl font-bold text-bean-black">
                  {item.name}
                </DialogTitle>

                {item.featured && (
                  <span className="mt-1 inline-flex items-center rounded-full bg-palace-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Featured
                  </span>
                )}
              </div>

              {item.price > 0 ? (
                <span className="font-heading text-2xl font-bold text-bean-black whitespace-nowrap">
                  {formatCurrency(item.price)}
                </span>
              ) : (
                <span className="text-sm text-warm-grey whitespace-nowrap">
                  Price on request
                </span>
              )}
            </div>

            <p className="text-warm-grey leading-relaxed">
              {item.description}
            </p>

            {!item.available && (
              <div className="flex items-center gap-2 rounded-full bg-warm-grey px-3 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
                Currently unavailable
              </div>
            )}

            <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-cream p-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-sm font-medium text-bean-black">
                  Quantity
                </label>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-sm font-medium text-bean-black">
                  Special Instructions (optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Less pepper, extra stew, no onions..."
                  className="mt-1.5 min-h-[80px] rounded-xl border border-border/50 bg-cream-deep px-3 py-2 text-sm text-bean-black placeholder:text-warm-grey resize-none focus:border-palace-orange focus:outline-none"
                  rows={3}
                />
              </div>

              {item.price > 0 && quantity > 0 && (
                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
                  <span className="text-sm text-warm-grey">
                    {quantity} × {formatCurrency(item.price)}
                  </span>
                  <span className="font-heading text-lg font-bold text-bean-black">
                    {formatCurrency(item.price * quantity)}
                  </span>
                </div>
              )}
            </div>

            <Button
              className="w-full rounded-xl"
              size="lg"
              disabled={!item.available || isSubmitting}
              onClick={handleAddToCart}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Adding...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Add to Cart
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </Button>

            {!item.available && (
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Browse other items
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
