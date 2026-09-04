"use client"

import { cn } from "@/lib/utils"
import type { MenuFilter } from "@/types/common"
import { Button } from "@/components/ui/button"
import type { MenuCategory } from "@/types/menu"

interface MenuFiltersProps {
  categories: MenuCategory[]
  activeFilter: MenuFilter
  onFilterChange?: (filter: MenuFilter) => void
  className?: string
}

export function MenuFilters({
  categories,
  activeFilter,
  onFilterChange,
  className,
}: MenuFiltersProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const isActive = activeFilter === category.slug

        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full h-10 whitespace-nowrap",
              isActive && "bg-palace-orange hover:bg-palace-orange-hover",
              !isActive &&
                "bg-cream-deep border-border/50 hover:bg-cream hover:text-bean-black"
            )}
            onClick={() => onFilterChange?.(category.slug as MenuFilter)}
          >
            {category.name}
          </Button>
        )
      })}
    </div>
  )
}
