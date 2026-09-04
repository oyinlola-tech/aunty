"use client"

import { useId, useMemo, useState } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Check, Minus, Plus, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { MenuItem } from "@/types/menu"

interface AddOnPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** "sides" or "proteins" — used for copy and titles. */
  kind: "sides" | "proteins"
  /** Visible title, e.g. "Choose your sides". */
  title: string
  /** Short helper line under the title. */
  description: string
  /** Every selectable option (already filtered to available items). */
  options: MenuItem[]
  /** Currently selected quantities, keyed by menu item id. */
  counts: Record<string, number>
  /**
   * Called with the new selections when the customer taps Done.
   * Closing without Done (X, backdrop, Escape) discards the session.
   */
  onCommit: (counts: Record<string, number>) => void
}

/**
 * Focused, full-bleed picker for one add-on group (sides or proteins).
 * It opens as a bottom sheet on phones and a centered dialog on larger
 * screens, and it never limits how many options — or how many of each —
 * the customer can add. Quantity 0 simply means "not selected".
 *
 * The picker works on a local working copy and only reports back on Done,
 * so accidental dismissal never loses the configuration underneath.
 */
export function AddOnPicker({
  open,
  onOpenChange,
  kind,
  title,
  description,
  options,
  counts,
  onCommit,
}: AddOnPickerProps) {
  // The parent only mounts this picker while it is open (open === true), so
  // initialising from the current selections on mount always reflects the
  // configuration underneath — no effect round-trip needed.
  const [working, setWorking] = useState<Record<string, number>>(() => ({
    ...counts,
  }))
  const [query, setQuery] = useState("")
  const searchId = useId()

  const noun = kind === "sides" ? "side" : "protein"

  const showSearch = options.length >= 6
  const normalizedQuery = query.trim().toLowerCase()

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) return options
    return options.filter((option) =>
      option.name.toLowerCase().includes(normalizedQuery)
    )
  }, [options, normalizedQuery])

  const selectedPortions = Object.values(working).reduce(
    (sum, quantity) => sum + quantity,
    0
  )
  const subtotal = Object.entries(working).reduce((sum, [id, quantity]) => {
    const option = options.find((item) => item.id === id)
    return sum + (option ? option.price * quantity : 0)
  }, 0)

  const selectedLabels = useMemo(() => {
    const kinds = options.filter((option) => (working[option.id] ?? 0) > 0)
    return kinds
      .map((option) => `${option.name} x ${working[option.id]}`)
      .join(", ")
  }, [options, working])

  const updateQuantity = (optionId: string, value: number) => {
    setWorking((current) => {
      const next = { ...current }
      if (value <= 0) {
        delete next[optionId]
      } else {
        next[optionId] = value
      }
      return next
    })
  }

  const handleDone = () => {
    onCommit(working)
    onOpenChange(false)
  }

  const clearSearch = () => setQuery("")

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="addon-picker-backdrop"
          className="fixed inset-0 z-50 bg-black/15 transition-opacity duration-150 supports-backdrop-filter:backdrop-blur-xs data-ending-style:opacity-0 data-starting-style:opacity-0"
        />

        <DialogPrimitive.Popup
          data-slot="addon-picker"
          className={cn(
            // Mobile: bottom sheet that hugs the screen.
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-3xl border-t border-border/50 bg-popover text-popover-foreground shadow-xl",
            // Larger screens: centered modal.
            "sm:inset-x-auto sm:right-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border sm:shadow-2xl",
            // Entrance / exit (bottom-sheet slide on phones, gentle zoom when centered).
            "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-6 data-open:zoom-in-[0.98] data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-6 data-closed:zoom-out-[0.98]",
            "sm:data-open:slide-in-from-bottom-0 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-bottom-0 sm:data-closed:zoom-out-95",
            "outline-none"
          )}
        >
          {/* Header */}
          <header className="flex items-start justify-between gap-4 border-b border-border/50 px-5 pt-5 pb-4 sm:px-6">
            <div className="flex min-w-0 flex-col gap-1">
              <DialogPrimitive.Title
                data-slot="addon-picker-title"
                className="font-heading text-xl font-bold text-bean-black"
              >
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description
                data-slot="addon-picker-description"
                className="text-sm text-warm-grey"
              >
                {description}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  aria-label={`Close ${title.toLowerCase()}`}
                />
              }
            >
              <X className="size-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </header>

          {/* Search (only when the list is long enough to need it) */}
          {showSearch && (
            <div className="px-5 pt-4 sm:px-6">
              <Label htmlFor={searchId} className="sr-only">
                Search {kind}
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-warm-grey"
                  aria-hidden="true"
                />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${kind}...`}
                  autoComplete="off"
                  className="h-11 w-full rounded-full border border-border/60 bg-cream-deep pr-9 pl-9 text-sm text-bean-black outline-none placeholder:text-warm-grey focus:border-palace-orange focus:ring-2 focus:ring-palace-orange/30"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label={`Clear ${kind} search`}
                    className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-warm-grey transition-colors hover:bg-cream hover:text-bean-black"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Option rows */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4 sm:px-6">
            {filteredOptions.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <p className="text-warm-grey">
                  No {kind} match &ldquo;{query}&rdquo;.
                </p>
                <Button variant="outline" size="sm" onClick={clearSearch}>
                  Clear search
                </Button>
              </div>
            ) : (
              <ul role="list" className="flex flex-col gap-2">
                {filteredOptions.map((option) => {
                  const quantity = working[option.id] ?? 0
                  const isSelected = quantity > 0
                  return (
                    <li
                      key={option.id}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors sm:px-4",
                        isSelected
                          ? "border-palace-orange/40 bg-palace-orange/5"
                          : "border-border/50 bg-cream-deep"
                      )}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className="truncate text-sm font-semibold text-bean-black">
                          {option.name}
                        </p>
                        <p className="text-xs text-warm-grey">
                          {option.price > 0
                            ? formatCurrency(option.price)
                            : "Price on request"}{" "}
                          {option.price > 0 && "/ portion"}
                        </p>
                      </div>

                      {isSelected ? (
                        <PickerStepper
                          name={option.name}
                          quantity={quantity}
                          onDecrease={() => updateQuantity(option.id, quantity - 1)}
                          onIncrease={() => updateQuantity(option.id, quantity + 1)}
                        />
                      ) : (
                        <Button
                          variant="soft"
                          size="sm"
                          className="flex-shrink-0"
                          onClick={() => updateQuantity(option.id, 1)}
                          aria-label={`Add ${option.name} to your meal`}
                        >
                          <Plus className="size-4" aria-hidden="true" />
                          Add
                        </Button>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer: live selection summary + Done */}
          <footer className="flex flex-col gap-3 border-t border-border/50 bg-cream px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="font-medium text-bean-black">
                {selectedPortions > 0 ? (
                  <>
                    {selectedPortions}{" "}
                    {selectedPortions === 1 ? "portion" : "portions"} selected
                  </>
                ) : (
                  <>No {noun} selected</>
                )}
              </span>
              <span className="sr-only">{selectedLabels}</span>
              <span className="text-warm-grey">
                {subtotal > 0 ? (
                  <>
                    {kind === "sides" ? "Sides" : "Proteins"} subtotal:{" "}
                    <span className="font-semibold text-bean-black">
                      {formatCurrency(subtotal)}
                    </span>
                  </>
                ) : (
                  <span className="italic">
                    Add as many as you like - all optional.
                  </span>
                )}
              </span>
            </div>

            <Button size="lg" className="w-full" onClick={handleDone}>
              <Check className="size-4" aria-hidden="true" />
              Done
            </Button>
          </footer>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/* ------------------------------------------------------------------ */

interface PickerStepperProps {
  name: string
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

function PickerStepper({
  name,
  quantity,
  onDecrease,
  onIncrease,
}: PickerStepperProps) {
  return (
    <div className="flex flex-shrink-0 items-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label={`Decrease ${name} quantity`}
        onClick={onDecrease}
      >
        <Minus className="size-4" aria-hidden="true" />
      </Button>
      <span
        role="status"
        aria-live="polite"
        aria-label={`${name} quantity: ${quantity}`}
        className="w-9 text-center text-base font-bold text-bean-black"
      >
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label={`Increase ${name} quantity`}
        onClick={onIncrease}
      >
        <Plus className="size-4" aria-hidden="true" />
      </Button>
    </div>
  )
}
