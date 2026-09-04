"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store/cart-store"
import { CartDrawer } from "@/features/cart/components/cart-drawer"
import { useMounted } from "@/hooks/use-mounted"
import { navigation } from "@/data/navigation"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const totalItems = useCartStore((s) => s.getTotalItems())
  const mounted = useMounted()
  const visibleCount = mounted ? totalItems : 0
  const [cartOpen, setCartOpen] = useState(false)

  // Cart icon opens the quick-view drawer when there is something to show;
  // with an empty cart it falls back to the cart page (which explains what
  // to do next).
  const handleCartClick = () => {
    if (visibleCount > 0) {
      setCartOpen(true)
    } else {
      router.push("/cart")
    }
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/brand/logo.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-xl"
            aria-hidden="true"
          />
          <span className="font-heading text-lg leading-none font-bold text-bean-black">
            Soft Beans
            <span className="block text-xs font-semibold tracking-wide text-palace-orange">
              Palace
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-palace-orange after:transition-all",
                  active
                    ? "text-bean-black after:w-full"
                    : "text-warm-grey after:w-0 hover:text-bean-black hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer"
            onClick={handleCartClick}
            aria-label={`Open shopping cart${visibleCount > 0 ? ` with ${visibleCount} items` : ""}`}
          >
            <ShoppingBag className="size-5" />
            {visibleCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-palace-orange text-[10px] font-bold text-white">
                {visibleCount}
              </span>
            )}
          </Button>
          <Link href="/menu" className="hidden sm:block">
            <Button variant="default" size="sm">
              Order Now
            </Button>
          </Link>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
