"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import type { MenuItem } from "@/types/menu"
import { cn } from "@/lib/utils"

interface MenuCardProps {
  item: MenuItem
  /** Adds the dish (meal bases open the configuration dialog first). */
  onAdd?: (item: MenuItem) => void
  className?: string
}

export function MenuCard({ item, onAdd, className }: MenuCardProps) {
  const isMealBase =
    item.customization?.sides === true || item.customization?.proteins === true
  const detailHref = `/menu/${item.slug}`

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-cream-deep transition-all duration-300 hover:shadow-lg",
        !item.available && "opacity-80",
        className
      )}
    >
      <div className="relative block aspect-square overflow-hidden bg-cream-deep">
        <Link
          href={detailHref}
          className="absolute inset-0"
          aria-label={`View ${item.name}`}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {item.featured && (
            <span className="absolute top-3 left-3 rounded-full bg-palace-orange px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
              Featured
            </span>
          )}

          {!item.available && (
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-warm-grey/95 px-3 py-1.5 text-center text-xs font-semibold text-white">
              Sold out
            </span>
          )}
        </Link>

        {item.available && onAdd && (
          <button
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name} to cart`}
            className="absolute right-3 bottom-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-palace-orange px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:bg-palace-orange-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palace-orange group-hover:scale-105"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Add
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg leading-snug font-semibold text-bean-black">
          <Link
            href={detailHref}
            className="transition-colors hover:text-palace-orange"
          >
            {item.name}
          </Link>
        </h3>

        {isMealBase && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-warm-brown">
            Combine with sides &amp; proteins — any number, any quantity
          </p>
        )}

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-warm-grey">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {item.price > 0 ? (
            <span className="font-heading text-lg font-bold text-bean-black">
              {formatCurrency(item.price)}
            </span>
          ) : (
            <span className="text-sm text-warm-grey">Price on request</span>
          )}

          <Link
            href={detailHref}
            className="rounded-full border border-border bg-cream px-3 py-1.5 text-xs font-semibold text-bean-black transition-colors hover:border-palace-orange hover:bg-palace-orange hover:text-white"
            aria-label={`Open ${item.name} page`}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
