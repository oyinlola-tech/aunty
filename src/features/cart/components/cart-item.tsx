"use client"

import { Minus, Plus, Trash2, PencilLine } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "../store/cart-store"
import { getAddOnTotal, getCartItemLineTotal } from "../utils/pricing"
import { formatCurrency } from "@/lib/currency"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/types/cart"

interface CartItemProps {
  item: CartItem
  /** Called when the customer taps Edit on this configured meal. */
  onEdit?: (item: CartItem) => void
}

const ADD_ON_LABEL: Record<string, string> = {
  sides: "Side",
  proteins: "Protein",
}

export function CartItem({ item, onEdit }: CartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const lineTotal = getCartItemLineTotal(item)
  const hasAddOns = item.addOns.length > 0
  const canEdit = onEdit !== undefined

  return (
    <article className="flex gap-4 rounded-2xl border border-border/50 bg-cream-deep p-3 sm:gap-5 sm:p-4">
      <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-deep sm:size-24">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base leading-snug font-semibold text-bean-black sm:text-lg">
            {item.name}
          </h3>
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="-mt-1 -mr-1 flex-shrink-0 gap-1.5 px-2.5 text-xs font-semibold text-palace-orange hover:text-palace-orange-hover"
              onClick={() => onEdit(item)}
              aria-label={`Edit ${item.name} configuration`}
            >
              <PencilLine className="size-3.5" />
              Edit
            </Button>
          )}
        </div>

        {hasAddOns && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Customization">
            {item.addOns.map((addOn) => (
              <li
                key={`${addOn.categoryId}-${addOn.menuItemId}`}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-cream px-2.5 py-1 text-xs font-medium text-bean-black"
              >
                {ADD_ON_LABEL[addOn.categoryId]}: {addOn.name}
                {addOn.quantity > 1 && <span>× {addOn.quantity}</span>}
                {addOn.unitPrice > 0 && (
                  <span className="text-warm-grey">
                    +{formatCurrency(getAddOnTotal(addOn))}
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

        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() => decrementQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              <Minus className="size-3.5" />
            </Button>

            <span className="w-7 text-center text-sm font-semibold text-bean-black" role="status" aria-live="polite">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => incrementQuantity(item.id)}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {lineTotal > 0 ? (
              <span className="font-heading text-base font-bold text-bean-black">
                {formatCurrency(lineTotal)}
              </span>
            ) : (
              <span className="text-xs text-warm-grey">
                Qty × unit price — confirmed on WhatsApp
              </span>
            )}

            <Button
              variant="ghost"
              size="icon-sm"
              className="text-warm-grey hover:text-rich-red"
              aria-label={`Remove ${item.name} from cart`}
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
