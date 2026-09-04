"use client"

import { cn } from "@/lib/utils"
import type { MenuItem } from "@/types/menu"
import { MenuCard } from "./menu-card"

interface MenuGridProps {
  items: MenuItem[]
  onOpenDetails: (item: MenuItem) => void
  onQuickAdd?: (item: MenuItem) => void
  className?: string
}

export function MenuGrid({
  items,
  onOpenDetails,
  onQuickAdd,
  className,
}: MenuGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onOpenDetails={onOpenDetails}
          onQuickAdd={onQuickAdd}
        />
      ))}
    </div>
  )
}
