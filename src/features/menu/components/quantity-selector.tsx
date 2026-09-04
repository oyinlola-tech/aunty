"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  className?: string
  max?: number
}

export function QuantitySelector({
  value,
  onChange,
  className,
  max = 10,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-xl"
        aria-label="Decrease quantity"
        onClick={handleDecrement}
        disabled={value <= 1}
      >
        <Minus className="size-4" />
      </Button>

      <span className="w-10 text-center text-lg font-bold text-bean-black">
        {value}
      </span>

      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-xl"
        aria-label="Increase quantity"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
