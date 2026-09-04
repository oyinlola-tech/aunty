"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import type { MenuItem } from "@/types/menu"
import { cn } from "@/lib/utils"

interface MenuCardProps {
  item: MenuItem
  onOpenDetails: (item: MenuItem) => void
  onQuickAdd?: (item: MenuItem) => void
}

export function MenuCard({ item, onOpenDetails, onQuickAdd }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickAdd?.(item)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    onOpenDetails(item)
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-cream-deep border border-border/50 transition-all duration-300 hover:shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex aspect-square overflow-hidden bg-cream-deep">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-palace-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>
          </div>
        )}

        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="rounded-full bg-warm-grey px-3 py-1 text-xs font-semibold text-white">
              Sold Out
            </span>
          </div>
        )}

        <button
          type="button"
          className={cn(
            "absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-palace-orange px-3 py-2 text-xs font-bold text-white shadow-lg transition-all duration-300",
            !item.available && "opacity-0 pointer-events-none",
            isHovered && !item.available && "opacity-0",
            isHovered && item.available && "scale-110"
          )}
          onClick={handleAdd}
          aria-label={`Add ${item.name} to cart`}
        >
          <ShoppingBag className="mr-1 size-4" />
          Add
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-semibold text-bean-black">
          {item.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-warm-grey">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {item.price > 0 ? (
            <span className="font-heading text-lg font-bold text-bean-black">
              {formatCurrency(item.price)}
            </span>
          ) : (
            <span className="text-sm text-warm-grey">Price on request</span>
          )}

          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full bg-espresso px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-espresso/90"
            onClick={handleViewDetails}
            aria-label={`View details for ${item.name}`}
          >
            View Details
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </article>
  )
}
