"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/features/cart/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import { CartItem } from "@/features/cart/components/cart-item"
import { CartSummary } from "@/features/cart/components/cart-summary"
import { EmptyCart } from "@/features/cart/components/empty-cart"
import { ProductModal } from "@/features/menu/components/product-modal"
import { menuItems } from "@/data/menu"
import { SectionContainer } from "@/components/shared/section-container"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CartItem as CartItemType } from "@/types/cart"

export function CartPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.getTotalItems())
  const mounted = useMounted()
  const hasItems = mounted && items.length > 0
  const shownTotal = mounted ? totalItems : 0

  const [editingItem, setEditingItem] = useState<CartItemType | null>(null)
  const editingMenuItem = editingItem
    ? (menuItems.find((menuItem) => menuItem.id === editingItem.menuItemId) ??
      null)
    : null

  const handleCheckout = () => {
    if (hasItems) {
      router.push("/checkout")
    }
  }

  return (
    <SectionContainer className="flex flex-col gap-10 py-16">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <ShoppingBag className="size-6 text-palace-orange" />
          <h1 className="font-heading text-3xl font-bold text-bean-black">
            Your Cart
          </h1>
          {shownTotal > 0 && (
            <span className="rounded-full bg-palace-orange px-2.5 py-0.5 text-xs font-bold text-white">
              {shownTotal}
            </span>
          )}
        </div>
        <p className="text-warm-grey">
          {!hasItems
            ? "Your plate is looking a little empty."
            : `${items.length} configured plate${items.length === 1 ? "" : "s"}, ${shownTotal} portion${shownTotal === 1 ? "" : "s"} in your cart`}
        </p>
      </div>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <CartItem key={item.id} item={item} plateNumber={index + 1} onEdit={setEditingItem} />
            ))}
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary />

              <div className="mt-4 flex flex-col gap-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Continue to Checkout
                  <ArrowRight className="size-4" />
                </Button>

                <Link
                  href="/menu"
                  className={cn(
                    buttonVariants({ variant: "soft", size: "lg" }),
                    "w-full no-underline"
                  )}
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingMenuItem && editingItem && (
        <ProductModal
          open
          onOpenChange={(open) => {
            if (!open) setEditingItem(null)
          }}
          item={editingMenuItem}
          existing={editingItem}
        />
      )}
    </SectionContainer>
  )
}
