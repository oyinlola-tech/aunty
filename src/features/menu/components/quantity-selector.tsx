"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  className?: string
  /**
   * What the counter refers to, used for accessible button names, e.g.
   * "Fried Plantain" -> "Increase Fried Plantain quantity". Falls back to
   * a generic "quantity" label when omitted.
   */
  subject?: string
  /** Smallest allowed value. Add-on rows use 0 (0 = not selected). */
  min?: number
  /** Compact sizing for dense rows (food configuration). */
  compact?: boolean
}

export function QuantitySelector({
  value,
  onChange,
  className,
  subject = "quantity",
  min = 1,
  compact = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    onChange(value + 1)
  }

  const buttonClass = compact ? "size-9" : "size-10"
  const valueClass = compact ? "w-9 text-base" : "w-10 text-lg"

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Button
        variant="outline"
        size="icon"
        className={buttonClass}
        aria-label={`Decrease ${subject} quantity`}
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="size-4" />
      </Button>

      <span
        className={cn(
          "text-center font-bold text-bean-black",
          valueClass
        )}
        role="status"
        aria-live="polite"
        aria-label={`${subject} quantity: ${value}`}
      >
        {value}
      </span>

      <Button
        variant="outline"
        size="icon"
        className={buttonClass}
        aria-label={`Increase ${subject} quantity`}
        onClick={handleIncrement}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
