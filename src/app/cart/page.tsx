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
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/types/cart"

export default function CartPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.getTotalItems())
  const mounted = useMounted()
  const hasItems = mounted && items.length > 0
  const shownTotal = mounted ? totalItems : 0

  // Reopens the meal configuration dialog for one cart line (edit mode).
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
            : `${items.length} configured meal${items.length === 1 ? "" : "s"}, ${shownTotal} item${shownTotal === 1 ? "" : "s"} in your cart`}
        </p>
      </div>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onEdit={setEditingItem} />
            ))}
          </div>

          <CartSummary />

          <div className="flex flex-col gap-4">
            <Button
              className="w-full rounded-xl"
              size="lg"
              onClick={handleCheckout}
            >
              Continue to Checkout
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-palace-orange/30 bg-white px-6 py-3 text-sm font-medium text-bean-black transition-colors hover:border-palace-orange hover:bg-palace-orange hover:text-white"
            >
              Add More Items
            </Link>
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
