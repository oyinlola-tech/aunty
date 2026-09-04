"use client"

import { useId, useState } from "react"
import {
  ChevronDown,
  Minus,
  PencilLine,
  Plus,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import { useCartStore } from "../store/cart-store"
import { getAddOnTotal, getCartItemLineTotal } from "../utils/pricing"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/types/cart"

interface CartItemProps {
  item: CartItemType
  /** Called when the customer taps Edit on this configured meal. */
  onEdit?: (item: CartItemType) => void
}

const ADD_ON_GROUP: Record<string, { label: string; hint: string }> = {
  sides: { label: "Sides", hint: "No sides added" },
  proteins: { label: "Proteins", hint: "No proteins added" },
}

/**
 * A configured cart line. The card stays short by default: dish name, a
 * one-line summary of the customization (e.g. "2 sides · 3 proteins"), the
 * price and the actions. Full details — every side and protein with its
 * quantity, the special request and the meal quantity — expand on demand so
 * complex meals never dominate the cart.
 */
export function CartItem({ item, onEdit }: CartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const detailsId = useId()
  const [expanded, setExpanded] = useState(false)

  const lineTotal = getCartItemLineTotal(item)
  const sides = item.addOns.filter((addOn) => addOn.categoryId === "sides")
  const proteins = item.addOns.filter(
    (addOn) => addOn.categoryId === "proteins"
  )
  const hasDetails = item.addOns.length > 0 || Boolean(item.notes)
  const canEdit = onEdit !== undefined

  const summaryParts: string[] = []
  if (sides.length > 0) {
    summaryParts.push(`${sides.length} ${sides.length === 1 ? "side" : "sides"}`)
  }
  if (proteins.length > 0) {
    summaryParts.push(
      `${proteins.length} ${proteins.length === 1 ? "protein" : "proteins"}`
    )
  }
  if (summaryParts.length === 0) {
    summaryParts.push("No extras")
  }

  return (
    <article className="flex flex-col rounded-2xl border border-border/50 bg-cream-deep p-3 sm:p-4">
      <div className="flex gap-3 sm:gap-4">
        <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-deep sm:size-24">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-base leading-snug font-semibold text-balance text-bean-black sm:text-lg">
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
                <PencilLine className="size-3.5" aria-hidden="true" />
                Edit
              </Button>
            )}
          </div>

          <p className="mt-0.5 text-xs font-medium text-warm-grey">
            {summaryParts.join(" · ")}
            {item.quantity > 1 && (
              <span className="text-warm-grey"> · meal × {item.quantity}</span>
            )}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="size-10"
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() => decrementQuantity(item.id)}
                disabled={item.quantity <= 1}
              >
                <Minus className="size-4" aria-hidden="true" />
              </Button>
              <span
                className="w-8 text-center text-sm font-semibold text-bean-black"
                role="status"
                aria-live="polite"
              >
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="size-10"
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => incrementQuantity(item.id)}
              >
                <Plus className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <span className="ml-auto flex items-center gap-2">
              {lineTotal > 0 ? (
                <span className="font-heading text-base font-bold text-bean-black">
                  {formatCurrency(lineTotal)}
                </span>
              ) : (
                <span className="text-xs text-warm-grey">
                  Price on request
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-warm-grey hover:text-rich-red"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </span>
          </div>

          {hasDetails && (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full text-xs font-semibold text-palace-orange transition-colors hover:text-palace-orange-hover focus-visible:ring-2 focus-visible:ring-palace-orange/50 focus-visible:outline-none"
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden="true"
              />
              {expanded ? "Hide details" : "View details"}
            </button>
          )}
        </div>
      </div>

      {hasDetails && expanded && (
        <div
          id={detailsId}
          className="mt-3 flex flex-col gap-3 rounded-xl border border-border/50 bg-cream p-3.5 sm:p-4"
        >
          {item.addOns.length > 0 ? (
            <AddOnDetailGroup label="Sides" addOns={sides} />
          ) : null}
          {proteins.length > 0 && <AddOnDetailGroup label="Proteins" addOns={proteins} />}

          {item.notes && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wide text-warm-grey uppercase">
                Special request
              </span>
              <p className="text-sm leading-relaxed text-bean-black">
                &ldquo;{item.notes}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ */

function AddOnDetailGroup({
  label,
  addOns,
}: {
  label: string
  addOns: CartItemType["addOns"]
}) {
  const group = ADD_ON_GROUP[label === "Sides" ? "sides" : "proteins"]

  if (addOns.length === 0) {
    return (
      <div>
        <span className="text-xs font-semibold tracking-wide text-warm-grey uppercase">
          {group.label}
        </span>
        <p className="text-sm text-warm-grey italic">{group.hint}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold tracking-wide text-warm-grey uppercase">
        {label}
      </span>
      <ul role="list" aria-label={label} className="flex flex-col gap-0.5">
        {addOns.map((addOn) => (
          <li
            key={`${addOn.categoryId}-${addOn.menuItemId}`}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="font-medium text-bean-black">
              {addOn.name}
              <span className="ml-1.5 font-bold text-palace-orange">
                × {addOn.quantity}
              </span>
            </span>
            {addOn.unitPrice > 0 ? (
              <span className="text-xs text-warm-grey">
                {formatCurrency(getAddOnTotal(addOn))}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
