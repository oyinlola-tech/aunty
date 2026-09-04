"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "../store/cart-store"
import { formatCurrency } from "@/lib/currency"
import { Button } from "@/components/ui/button"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    notes?: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const itemTotal = item.price * item.quantity

  return (
    <div className="flex gap-4">
      <div className="relative flex size-24 overflow-hidden rounded-xl bg-cream-deep">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 64px, 96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="font-heading text-base font-semibold text-bean-black line-clamp-1">
          {item.name}
        </h3>

        {item.notes && (
          <p className="text-xs text-warm-grey line-clamp-1">{item.notes}</p>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              aria-label="Decrease quantity"
              onClick={() => decrementQuantity(item.id)}
            >
              <Minus className="size-4" />
            </Button>

            <span className="w-8 text-center text-sm font-semibold text-bean-black">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="size-7"
              aria-label="Increase quantity"
              onClick={() => incrementQuantity(item.id)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {item.price > 0 && (
            <span className="text-sm font-semibold text-bean-black">
              {formatCurrency(itemTotal)}
            </span>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-warm-grey hover:text-rich-red"
            aria-label="Remove item"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
