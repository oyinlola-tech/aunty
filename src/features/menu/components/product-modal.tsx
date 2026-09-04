"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import type { CartAddOn, CartItem } from "@/types/cart"
import type { MenuItem } from "@/types/menu"
import { menuItems } from "@/data/menu"
import { QuantitySelector } from "./quantity-selector"
import { useCartStore } from "@/features/cart/store/cart-store"
import { getCartItemUnitPrice } from "@/features/cart/utils/pricing"

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
  /** Present when the dialog is editing an existing configured cart line. */
  existing?: CartItem
}

type AddOnKind = "sides" | "proteins"

const ADD_ON_LABEL: Record<AddOnKind, string> = {
  sides: "Side",
  proteins: "Protein",
}

function findMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((menuItem) => menuItem.id === id)
}

function addOnKindNoun(kind: AddOnKind): string {
  return kind === "sides" ? "side" : "protein"
}

/** Reads an existing cart line's selected add-ons of one kind. */
function selectionFromItem(existing: CartItem | undefined, kind: AddOnKind): string[] {
  return (existing?.addOns ?? [])
    .filter((addOn) => addOn.categoryId === kind)
    .map((addOn) => addOn.menuItemId)
}

export function ProductModal({
  open,
  onOpenChange,
  item,
  existing,
}: ProductModalProps) {
  const addItem = useCartStore((s) => s.addItem)
  const updateItem = useCartStore((s) => s.updateItem)

  // A dish advertises how many of each kind it accepts (0 = none).
  // A value above 1 means the customer may pick several of that kind.
  const sideMax = item.customization?.sides ?? 0
  const proteinMax = item.customization?.proteins ?? 0
  const isMealBase = sideMax > 0 || proteinMax > 0

  const [quantity, setQuantity] = useState(existing?.quantity ?? 1)
  const [notes, setNotes] = useState(existing?.notes ?? "")
  const [selectedSideIds, setSelectedSideIds] = useState<string[]>(() =>
    selectionFromItem(existing, "sides")
  )
  const [selectedProteinIds, setSelectedProteinIds] = useState<string[]>(() =>
    selectionFromItem(existing, "proteins")
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sideOptions =
    sideMax > 0
      ? menuItems.filter(
          (option) => option.categoryId === "sides" && option.available
        )
      : []
  const proteinOptions =
    proteinMax > 0
      ? menuItems.filter(
          (option) => option.categoryId === "proteins" && option.available
        )
      : []

  // Every selected add-on, snapshotted as typed cart data so identity,
  // pricing and the WhatsApp message all share one representation.
  const selectedAddOns: CartAddOn[] = []
  for (const id of selectedSideIds) {
    const side = findMenuItem(id)
    if (side) {
      selectedAddOns.push({
        menuItemId: side.id,
        categoryId: "sides",
        name: side.name,
        price: side.price,
      })
    }
  }
  for (const id of selectedProteinIds) {
    const protein = findMenuItem(id)
    if (protein) {
      selectedAddOns.push({
        menuItemId: protein.id,
        categoryId: "proteins",
        name: protein.name,
        price: protein.price,
      })
    }
  }

  const unitPrice = getCartItemUnitPrice({
    price: item.price,
    addOns: selectedAddOns,
  })
  const lineTotal = unitPrice * quantity
  const isEditing = existing !== undefined
  const canSave = item.available && quantity >= 1

  const customizationHint = (): string | null => {
    const parts: string[] = []
    if (sideMax > 0)
      parts.push(sideMax === 1 ? "a side" : `up to ${sideMax} sides`)
    if (proteinMax > 0)
      parts.push(proteinMax === 1 ? "a protein" : `up to ${proteinMax} proteins`)
    if (parts.length === 0) return null
    return `Build your plate — add ${parts.join(" and ")}. Everything optional.`
  }

  // Toggle one add-on of a kind; refuses a pick when the dish's max for that
  // kind is already reached (the customer deselects one to swap it out).
  const handleAddOnToggle = (kind: AddOnKind, id: string) => {
    const max = kind === "sides" ? sideMax : proteinMax
    const setter = kind === "sides" ? setSelectedSideIds : setSelectedProteinIds
    setter((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id)
      if (current.length >= max) return current
      return [...current, id]
    })
  }

  const handleSave = () => {
    if (!canSave) return
    setIsSubmitting(true)

    try {
      if (isEditing && existing) {
        updateItem(existing.id, {
          quantity,
          notes: notes.trim() || undefined,
          addOns: selectedAddOns,
        })
      } else {
        addItem({
          menuItemId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity,
          notes: notes.trim() || undefined,
          addOns: selectedAddOns,
        })
      }

      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderOptionGroup(kind: AddOnKind) {
    const options = kind === "sides" ? sideOptions : proteinOptions
    const max = kind === "sides" ? sideMax : proteinMax
    const selectedIds = kind === "sides" ? selectedSideIds : selectedProteinIds
    const noun = addOnKindNoun(kind)

    if (options.length === 0) return null

    const isMulti = max > 1
    const countLabel =
      isMulti && selectedIds.length > 0
        ? `${selectedIds.length} of ${max} selected`
        : "Optional"

    return (
      <fieldset className="flex flex-col gap-2">
        <legend className="flex w-full items-baseline justify-between gap-2 text-sm font-medium text-bean-black">
          <span>
            {isMulti
              ? `Choose your ${noun}s`
              : `Choose a ${noun}`}
          </span>
          <span className="text-xs font-normal text-warm-grey">{countLabel}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isSelected = selectedIds.includes(option.id)
            const atCapacity =
              !isSelected && selectedIds.length >= max
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                disabled={atCapacity}
                onClick={() => handleAddOnToggle(kind, option.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palace-orange disabled:cursor-not-allowed disabled:opacity-40",
                  isSelected
                    ? "border-espresso bg-espresso text-white"
                    : "border-border/60 bg-cream-deep text-bean-black hover:border-palace-orange hover:text-palace-orange"
                )}
              >
                {option.name}
                {option.price > 0 && (
                  <span
                    className={cn(
                      "text-xs",
                      isSelected ? "text-white/70" : "text-warm-grey"
                    )}
                  >
                    +{formatCurrency(option.price)}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </fieldset>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:max-w-lg">
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
                {isMealBase && customizationHint() && (
                  <p className="mt-1 text-sm text-warm-grey">
                    {customizationHint()}
                  </p>
                )}
              </div>
            </div>

            <p className="text-warm-grey leading-relaxed">{item.description}</p>

            {!item.available && (
              <div className="flex items-center gap-2 rounded-full bg-warm-grey px-3 py-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
                Currently unavailable
              </div>
            )}

            <div className="flex flex-col gap-5 rounded-xl border border-border/50 bg-cream p-4">
              {renderOptionGroup("sides")}
              {renderOptionGroup("proteins")}

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-sm font-medium text-bean-black">
                  Special instructions (optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Less pepper, pack separately, no onions..."
                  className="mt-1 min-h-[72px] rounded-xl border border-border/50 bg-cream-deep px-3 py-2 text-sm text-bean-black placeholder:text-warm-grey resize-none focus:border-palace-orange focus:outline-none"
                  rows={3}
                />
                <p className="text-xs text-warm-grey">
                  Instructions apply to this meal only.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-bean-black">Quantity</span>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Selected extras">
                {selectedAddOns.map((addOn) => (
                  <span
                    key={`${addOn.categoryId}-${addOn.menuItemId}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted-green/15 px-3 py-1 text-xs font-semibold text-muted-green"
                  >
                    {ADD_ON_LABEL[addOn.categoryId]}: {addOn.name}
                    {addOn.price > 0 && (
                      <span className="opacity-80">+{formatCurrency(addOn.price)}</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {unitPrice > 0 ? (
              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                <span className="text-sm text-warm-grey">
                  {quantity} × {formatCurrency(unitPrice)}
                </span>
                <span className="font-heading text-xl font-bold text-bean-black">
                  {formatCurrency(lineTotal)}
                </span>
              </div>
            ) : (
              <p className="text-sm text-warm-grey">
                Total is confirmed on WhatsApp once prices are available.
              </p>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!canSave || isSubmitting}
              onClick={handleSave}
            >
              {isSubmitting
                ? "Adding..."
                : isEditing
                  ? "Save Changes"
                  : "Add to Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
