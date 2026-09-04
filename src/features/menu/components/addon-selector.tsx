"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AddonOption {
  id: string
  name: string
  price?: number
}

interface AddonSelectorProps {
  options: AddonOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function AddonSelector({
  options,
  selected,
  onChange,
  className,
}: AddonSelectorProps) {
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id)

        return (
          <Button
            key={option.id}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "rounded-full",
              isSelected
                ? "bg-palace-orange hover:bg-palace-orange-hover"
                : "bg-cream-deep border-border/50 hover:bg-cream"
            )}
            onClick={() => toggleOption(option.id)}
          >
            {isSelected && <Check className="mr-1 size-4" />}
            {option.name}
            {option.price !== undefined && (
              <span className="ml-1 text-warm-grey">
                ({option.price > 0 ? "₦" + option.price : "free"})
              </span>
            )}
          </Button>
        )
      })}
    </div>
  )
}
