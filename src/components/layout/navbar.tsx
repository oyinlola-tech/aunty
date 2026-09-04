"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import { navigation } from "@/data/navigation"

export function Navbar() {
  const totalItems = useCartStore((s) => s.getTotalItems())
  const mounted = useMounted()
  const visibleCount = mounted ? totalItems : 0

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-bean-black">
            Soft Beans Palace
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-grey transition-colors hover:text-bean-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative"
            aria-label={`Shopping cart${visibleCount > 0 ? ` with ${visibleCount} items` : ""}`}
          >
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ShoppingBag className="size-5" />
              {visibleCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-palace-orange text-[10px] font-bold text-white">
                  {visibleCount}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/menu" className="hidden sm:block">
            <Button variant="default" size="sm">
              Order Now
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
