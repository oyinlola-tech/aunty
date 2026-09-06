"use client"

import { useId, useMemo, useState, useEffect } from "react"
import { ArrowRight, Plus, X } from "lucide-react"
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
import { AddOnPicker } from "./add-on-picker"

type AddOnKind = "sides" | "proteins"

const ADD_ON_GROUP: Record<
  AddOnKind,
  { title: string; hint: string; emptyHint: string }
> = {
  sides: {
    title: "Sides",
    hint: "Optional extras to round out your meal.",
    emptyHint: "Nothing yet — beans on its own works great.",
  },
  proteins: {
    title: "Proteins",
    hint: "Optional — add your favourites with no limits.",
    emptyHint: "No protein yet — that is perfectly fine.",
  },
}

interface MealConfiguratorProps {
  item: MenuItem
  /** Present when editing an existing configured cart line. */
  existing?: CartItem
  /** Called after the meal is added/updated successfully. */
  onAdded?: () => void
  /**
   * Where the sticky order bar is anchored:
   * - "dialog": not used — dialog-level footer is preferred
   * - "page": pinned above the mobile bottom navigation on dish pages
   * - "none": no sticky bar rendered at all
   */
  stickyBar?: "page" | "none"
  /** Called with the current config whenever quantity, add-ons, or notes change. */
  onChange?: (state: {
    canSave: boolean
    isSubmitting: boolean
    lineTotal: number
    unitPrice: number
    mealQuantity: number
    selectedAddOns: CartAddOn[]
  }) => void
  className?: string
}

/**
 * Builds one configured meal. Sides and proteins are optional, unbounded
 * collections: each option carries its own quantity, so a customer can add
 * any combination (e.g. Fried Plantain x 2, Soft Bread x 1, Fried Fish x 3)
 * with no artificial maximum.
 *
 * Rather than listing every option at once, each group shows a compact
 * summary of what is already chosen and an "Add" button that opens a focused
 * picker overlay. The live total and Add-to-Cart action stay pinned to the
 * bottom of the viewport while the customer builds the meal.
 */
export function MealConfigurator({
  item,
  existing,
  onAdded,
  stickyBar = "page",
  onChange,
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
  const [picker, setPicker] = useState<AddOnKind | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sideOptions = useMemo(() => {
    return allowSides
      ? menuItems.filter(
          (option) => option.categoryId === "sides" && option.available
        )
      : [];
  }, [allowSides]);

  const proteinOptions = useMemo(() => {
    return allowProteins
      ? menuItems.filter(
          (option) => option.categoryId === "proteins" && option.available
        )
      : [];
  }, [allowProteins]);

  // Every non-zero selection, snapshotted as typed cart data so identity,
  // pricing and the WhatsApp message all share one representation.
  const selectedAddOns = useMemo(() => {
    return [
      ...collectAddOns(sideOptions, sideCounts, "sides"),
      ...collectAddOns(proteinOptions, proteinCounts, "proteins"),
    ] as CartAddOn[];
  }, [sideOptions, sideCounts, proteinOptions, proteinCounts]);

  const isEditing = existing !== undefined
  const addOnsTotal = getAddOnsTotal(selectedAddOns)
  const unitPrice = item.price + addOnsTotal
  const lineTotal = unitPrice * mealQuantity
  const hasPrices = unitPrice > 0
  const canSave = item.available && mealQuantity >= 1

  useEffect(() => {
    onChange?.({
      canSave,
      isSubmitting,
      lineTotal,
      unitPrice,
      mealQuantity,
      selectedAddOns,
    })
  }, [canSave, isSubmitting, lineTotal, unitPrice, mealQuantity, selectedAddOns, onChange])

  function commitAddOns(kind: AddOnKind, counts: Record<string, number>) {
    const setter = kind === "sides" ? setSideCounts : setProteinCounts
    setter(counts)
  }

  function removeAddOn(kind: AddOnKind, optionId: string) {
    commitAddOns(
      kind,
      Object.fromEntries(
        Object.entries(kind === "sides" ? sideCounts : proteinCounts).filter(
          ([id, quantity]) => id !== optionId && quantity > 0
        )
      )
    )
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

      {/* Sides collection */}
      {allowSides && (
        <AddOnSummary
          kind="sides"
          options={sideOptions}
          counts={sideCounts}
          onOpen={() => setPicker("sides")}
          onRemove={(optionId) => removeAddOn("sides", optionId)}
        />
      )}

      {/* Proteins collection */}
      {allowProteins && (
        <AddOnSummary
          kind="proteins"
          options={proteinOptions}
          counts={proteinCounts}
          onOpen={() => setPicker("proteins")}
          onRemove={(optionId) => removeAddOn("proteins", optionId)}
        />
      )}

      {/* Special instructions */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={notesId}
          className="text-sm font-medium text-bean-black"
        >
          Special request{" "}
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

      {/* Sticky order bar: price breakdown + total + action */}
      {stickyBar !== "none" && (
        <div
          className={cn(
            "sticky z-10 bottom-0 flex flex-col rounded-2xl border-t border-border/50 bg-cream/95 shadow-[0_-6px_24px_rgba(27,22,17,0.07)] backdrop-blur-sm",
            stickyBar === "page" && "bottom-16 md:bottom-0"
          )}
        >
        <div className="flex flex-col gap-1.5 px-4 pt-3.5 text-sm sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium text-bean-black">{item.name}</span>
            {item.price > 0 ? (
              <span className="text-warm-grey">
                {formatCurrency(item.price)}
              </span>
            ) : (
              <span className="text-xs text-warm-grey">Price on request</span>
            )}
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
                <span className="text-xs text-warm-grey">Price on request</span>
              )}
            </div>
          ))}

          {selectedAddOns.length === 0 &&
            (allowSides || allowProteins) && (
              <p className="text-xs text-warm-grey">
                No extras added — beans only is perfectly fine.
              </p>
            )}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border/60 px-4 py-3 sm:px-6">
          {hasPrices ? (
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-warm-grey">
                Total · {mealQuantity} × {formatCurrency(unitPrice)}
              </span>
              <span className="font-heading text-xl font-bold text-bean-black">
                {formatCurrency(lineTotal)}
              </span>
            </div>
          ) : (
            <p className="text-xs text-warm-grey">
              Total is confirmed on WhatsApp once prices are available.
            </p>
          )}

          <Button
            size="lg"
            className="flex-shrink-0"
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
            {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      )}

      {/* Focused side/protein picker */}
      {allowSides && picker === "sides" && (
        <AddOnPicker
          open={picker === "sides"}
          onOpenChange={(open) => {
            if (!open) setPicker(null)
          }}
          kind="sides"
          title="Choose your sides"
          description="Add as many sides as you like — each with its own quantity."
          options={sideOptions}
          counts={sideCounts}
          onCommit={(counts) => commitAddOns("sides", counts)}
        />
      )}
      {allowProteins && picker === "proteins" && (
        <AddOnPicker
          open={picker === "proteins"}
          onOpenChange={(open) => {
            if (!open) setPicker(null)
          }}
          kind="proteins"
          title="Choose your proteins"
          description="Add as many proteins as you like — each with its own quantity."
          options={proteinOptions}
          counts={proteinCounts}
          onCommit={(counts) => commitAddOns("proteins", counts)}
        />
      )}
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

interface AddOnSummaryProps {
  kind: AddOnKind
  options: MenuItem[]
  counts: Record<string, number>
  onOpen: () => void
  onRemove: (optionId: string) => void
}

/**
 * Compact summary of one add-on group. When nothing is selected it is a
 * quiet two-line block with a single "+ Add" action; once items are chosen
 * they appear as removable chips so the configuration stays short even with
 * many selections.
 */
function AddOnSummary({
  kind,
  options,
  counts,
  onOpen,
  onRemove,
}: AddOnSummaryProps) {
  const group = ADD_ON_GROUP[kind]
  const selected = options.filter((option) => (counts[option.id] ?? 0) > 0)
  const selectedCount = selected.length
  const selectedPortions = sumCounts(counts)
  const noun = kind === "sides" ? "side" : "protein"

  return (
    <section
      aria-label={group.title}
      className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-cream-deep/50 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-base font-semibold text-bean-black">
            {group.title}
          </span>
          <span className="text-xs text-warm-grey">
            {selectedCount > 0
              ? `${selectedCount} ${noun}${selectedCount === 1 ? "" : "s"} · ${selectedPortions} portion${selectedPortions === 1 ? "" : "s"}`
              : group.hint}
          </span>
        </div>
        <Button variant="soft" size="sm" onClick={onOpen}>
          <Plus className="size-4" aria-hidden="true" />
          {selectedCount > 0 ? "Add more" : `Add ${noun}s`}
        </Button>
      </div>

      {selected.length > 0 ? (
        <ul role="list" aria-label={`Selected ${kind}`} className="flex flex-wrap gap-2">
          {selected.map((option) => (
            <li key={option.id}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-palace-orange/25 bg-white py-1.5 pr-1.5 pl-3 text-sm font-medium text-bean-black shadow-sm">
                {option.name}
                <span className="font-bold text-palace-orange">
                  × {counts[option.id]}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(option.id)}
                  aria-label={`Remove ${option.name}`}
                  className="flex size-6 items-center justify-center rounded-full text-warm-grey transition-colors hover:bg-cream-deep hover:text-rich-red focus-visible:ring-2 focus-visible:ring-palace-orange/50 focus-visible:outline-none"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-warm-grey italic">{group.emptyHint}</p>
      )}
    </section>
  )
}
