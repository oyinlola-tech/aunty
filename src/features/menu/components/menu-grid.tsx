"use client"

import { cn } from "@/lib/utils"
import type { MenuItem } from "@/types/menu"
import { MenuCard } from "./menu-card"

interface MenuGridProps {
  items: MenuItem[]
  onAdd?: (item: MenuItem) => void
  className?: string
}

export function MenuGrid({
  items,
  onAdd,
  className,
}: MenuGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  )
}
