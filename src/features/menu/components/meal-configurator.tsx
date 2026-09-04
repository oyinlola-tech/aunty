"use client"

import { useId, useState } from "react"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import type { CartAddOn, CartItem } from "@/types/cart"
import type { MenuItem } from "@/types/menu"
import { menuItems } from "@/data/menu"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store/cart-store"
import {
  getAddOnsTotal,
  getAddOnTotal,
} from "@/features/cart/utils/pricing"
import { QuantitySelector } from "./quantity-selector"

type AddOnKind = "sides" | "proteins"

const ADD_ON_TITLE: Record<AddOnKind, string> = {
  sides: "Add sides",
  proteins: "Add proteins",
}

interface MealConfiguratorProps {
  item: MenuItem
  /** Present when editing an existing configured cart line. */
  existing?: CartItem
  /** Called after the meal is added/updated successfully. */
  onAdded?: () => void
  className?: string
}

/**
 * Builds one configured meal. Sides and proteins are optional, unbounded
 * collections: each option carries its own quantity, so a customer can add
 * any combination (e.g. Fried Plantain x 2, Soft Bread x 1, Fried Fish x 3)
 * with no artificial maximum.
 */
export function MealConfigurator({
  item,
  existing,
  onAdded,
  className,
}: MealConfiguratorProps) {
  const notesId = useId()
  const addItem = useCartStore((s) => s.addItem)
  const updateItem = useCartStore((s) => s.updateItem)

  const allowSides = item.customization?.sides === true
  const allowProteins = item.customization?.proteins === true

  // id -> quantity (0 means "not selected")
  const [mealQuantity, setMealQuantity] = useState(existing?.quantity ?? 1)
  const [notes, setNotes] = useState(existing?.notes ?? "")
  const [sideCounts, setSideCounts] = useState<Record<string, number>>(() =>
    countsFromAddOns(existing, "sides")
  )
  const [proteinCounts, setProteinCounts] = useState<Record<string, number>>(
    () => countsFromAddOns(existing, "proteins")
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sideOptions = allowSides
    ? menuItems.filter(
        (option) => option.categoryId === "sides" && option.available
      )
    : []
  const proteinOptions = allowProteins
    ? menuItems.filter(
        (option) => option.categoryId === "proteins" && option.available
      )
    : []

  // Every non-zero selection, snapshotted as typed cart data so identity,
  // pricing and the WhatsApp message all share one representation.
  const selectedAddOns: CartAddOn[] = [
    ...collectAddOns(sideOptions, sideCounts, "sides"),
    ...collectAddOns(proteinOptions, proteinCounts, "proteins"),
  ]

  const isEditing = existing !== undefined
  const addOnsTotal = getAddOnsTotal(selectedAddOns)
  const unitPrice = item.price + addOnsTotal
  const lineTotal = unitPrice * mealQuantity
  const hasPrices = unitPrice > 0
  const canSave = item.available && mealQuantity >= 1

  const selectedSideCount = sumCounts(sideCounts)
  const selectedProteinCount = sumCounts(proteinCounts)

  function updateCount(
    kind: AddOnKind,
    optionId: string,
    value: number
  ) {
    const setter = kind === "sides" ? setSideCounts : setProteinCounts
    setter((counts) => ({ ...counts, [optionId]: Math.max(0, value) }))
  }

  function handleSave() {
    if (!canSave) return
    setIsSubmitting(true)

    try {
      const addOns = selectedAddOns.map((addOn) => ({ ...addOn }))
      const notesTrimmed = notes.trim() || undefined

      if (isEditing && existing) {
        updateItem(existing.id, {
          quantity: mealQuantity,
          notes: notesTrimmed,
          addOns,
        })
      } else {
        addItem({
          menuItemId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: mealQuantity,
          notes: notesTrimmed,
          addOns,
        })
      }

      onAdded?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Sides collection */}
      {sideOptions.length > 0 && (
        <AddOnSection
          kind="sides"
          options={sideOptions}
          counts={sideCounts}
          selectedTotal={selectedSideCount}
          onChange={(id, value) => updateCount("sides", id, value)}
        />
      )}

      {/* Proteins collection */}
      {proteinOptions.length > 0 && (
        <AddOnSection
          kind="proteins"
          options={proteinOptions}
          counts={proteinCounts}
          selectedTotal={selectedProteinCount}
          onChange={(id, value) => updateCount("proteins", id, value)}
        />
      )}

      {/* Special instructions */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={notesId}
          className="text-sm font-medium text-bean-black"
        >
          Special instructions{" "}
          <span className="font-normal text-warm-grey">(optional)</span>
        </label>
        <textarea
          id={notesId}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Less pepper, pack separately, no onions..."
          rows={3}
          className="min-h-[72px] resize-none rounded-xl border border-border/50 bg-cream-deep px-3 py-2 text-sm text-bean-black placeholder:text-warm-grey focus:border-palace-orange focus:outline-none focus:ring-2 focus:ring-palace-orange/30"
        />
        <p className="text-xs text-warm-grey">
          Instructions apply to this meal only.
        </p>
      </div>

      {/* Meal quantity */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-bean-black">
          How many of this meal?
        </span>
        <QuantitySelector
          value={mealQuantity}
          onChange={setMealQuantity}
          subject={`${item.name} meal`}
        />
      </div>

      {/* Price summary */}
      <div className="rounded-xl border border-border/50 bg-cream p-4">
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium text-bean-black">{item.name}</span>
            {item.price > 0 ? (
              <span className="text-warm-grey">
                {formatCurrency(item.price)}
              </span>
            ) : null}
          </div>

          {selectedAddOns.map((addOn) => (
            <div
              key={`${addOn.categoryId}-${addOn.menuItemId}`}
              className="flex items-center justify-between gap-3 pl-3"
            >
              <span className="text-warm-grey">
                {addOn.name} × {addOn.quantity}
              </span>
              {addOn.unitPrice > 0 ? (
                <span className="font-medium text-bean-black">
                  {formatCurrency(getAddOnTotal(addOn))}
                </span>
              ) : (
                <span className="text-xs text-warm-grey">
                  Price on request
                </span>
              )}
            </div>
          ))}

          {selectedAddOns.length === 0 &&
            (sideOptions.length > 0 || proteinOptions.length > 0) && (
              <p className="text-xs text-warm-grey">
                No sides or proteins added — beans only is perfectly fine.
              </p>
            )}
        </div>

        <div className="mt-3 flex flex-col gap-1 border-t border-border/60 pt-3">
          {hasPrices ? (
            <>
              <div className="flex items-center justify-between text-sm text-warm-grey">
                <span>
                  Meal price × {mealQuantity}
                </span>
                <span>{formatCurrency(unitPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-bean-black">
                  Line total
                </span>
                <span className="font-heading text-xl font-bold text-bean-black">
                  {formatCurrency(lineTotal)}
                </span>
              </div>
            </>
          ) : (
            <p className="text-xs text-warm-grey">
              Total is confirmed on WhatsApp once prices are available.
            </p>
          )}
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        disabled={!canSave || isSubmitting}
        onClick={handleSave}
      >
        {isSubmitting
          ? isEditing
            ? "Saving..."
            : "Adding..."
          : isEditing
            ? "Save Changes"
            : "Add to Cart"}
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function countsFromAddOns(
  existing: CartItem | undefined,
  kind: AddOnKind
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const addOn of existing?.addOns ?? []) {
    if (addOn.categoryId === kind) {
      counts[addOn.menuItemId] = addOn.quantity
    }
  }
  return counts
}

function collectAddOns(
  options: MenuItem[],
  counts: Record<string, number>,
  kind: AddOnKind
): CartAddOn[] {
  const result: CartAddOn[] = []
  for (const option of options) {
    const quantity = counts[option.id] ?? 0
    if (quantity > 0) {
      result.push({
        menuItemId: option.id,
        categoryId: kind,
        name: option.name,
        unitPrice: option.price,
        quantity,
      })
    }
  }
  return result
}

function sumCounts(counts: Record<string, number>): number {
  return Object.values(counts).reduce((sum, value) => sum + value, 0)
}

/* ------------------------------------------------------------------ */

interface AddOnSectionProps {
  kind: AddOnKind
  options: MenuItem[]
  counts: Record<string, number>
  selectedTotal: number
  onChange: (optionId: string, value: number) => void
}

function AddOnSection({
  kind,
  options,
  counts,
  selectedTotal,
  onChange,
}: AddOnSectionProps) {
  const title = ADD_ON_TITLE[kind]

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 w-full">
        <span className="text-base font-semibold text-bean-black">
          {title}
        </span>
        <span className="text-xs font-normal text-warm-grey">
          {selectedTotal > 0
            ? `${selectedTotal} ${selectedTotal === 1 ? "portion" : "portions"} selected`
            : "Optional — skip if you only want the beans"}
        </span>
      </legend>

      <ul role="list" aria-label={title} className="flex flex-col gap-2">
        {options.map((option) => {
          const quantity = counts[option.id] ?? 0
          return (
            <li
              key={option.id}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-cream-deep px-3 py-2 sm:px-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-bean-black">
                  {option.name}
                </p>
                <p className="text-xs text-warm-grey">
                  {option.price > 0
                    ? formatCurrency(option.price)
                    : "Price on request"}
                  {quantity > 0 && option.price > 0 && (
                    <span className="ml-1.5 font-semibold text-warm-brown">
                      = {formatCurrency(option.price * quantity)}
                    </span>
                  )}
                </p>
              </div>

              <QuantitySelector
                compact
                min={0}
                value={quantity}
                onChange={(value) => onChange(option.id, value)}
                subject={option.name}
              />
            </li>
          )
        })}
      </ul>

    </fieldset>
  )
}
