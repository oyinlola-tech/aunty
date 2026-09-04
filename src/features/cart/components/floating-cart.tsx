"use client"

import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCartStore } from "../store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"

export function FloatingCart() {
  // Select stable slices of state; selecting a freshly created array would
  // break useSyncExternalStore's snapshot caching in React 19.
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.getTotalItems())
  const subtotal = useCartStore((s) => s.getSubtotal())
  const mounted = useMounted()
  const pathname = usePathname()

  // Dish pages already carry their own sticky Add-to-Cart bar, so the
  // floating pill would collide with it — skip those routes.
  const isDishPage = pathname.startsWith("/menu/") && pathname !== "/menu"

  if (!mounted || totalItems === 0 || isDishPage) return null

  const previewItem = items[0]

  return (
    <Link
      href="/cart"
      className={cn(
        "fixed right-4 bottom-20 z-40 flex items-center gap-3 rounded-full bg-palace-orange px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-palace-orange-hover md:hidden"
      )}
      aria-label={`View cart with ${totalItems} items`}
    >
      {previewItem && (
        <Image
          src={previewItem.image}
          alt=""
          width={24}
          height={24}
          className="rounded-full object-cover"
        />
      )}
      <span className="flex items-center gap-1.5">
        <ShoppingBag className="size-4" />
        {totalItems} items
      </span>
      {subtotal > 0 && (
        <span className="font-semibold">{formatCurrency(subtotal)}</span>
      )}
    </Link>
  )
}
