"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ShoppingBag } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import { useCartStore } from "../store/cart-store"
import { CartItem } from "./cart-item"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Quick cart view used from the navbar so customers can check their order
 * without leaving the page. Full management (including editing a meal's
 * configuration) lives on the dedicated /cart page.
 */
export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const totalItems = useCartStore((s) => s.getTotalItems())

  const handleCheckout = () => {
    onOpenChange(false)
    router.push("/checkout")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/50 px-5 py-4 pr-14">
          <SheetTitle className="flex items-center gap-2 font-heading text-xl font-bold text-bean-black">
            <ShoppingBag className="size-5 text-palace-orange" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border/50 bg-cream px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-warm-grey">
              {subtotal > 0 ? "Subtotal" : "Total"}
            </span>
            {subtotal > 0 ? (
              <span className="font-heading text-xl font-bold text-bean-black">
                {formatCurrency(subtotal)}
              </span>
            ) : (
              <span className="text-sm font-medium text-warm-grey">
                Confirmed on WhatsApp
              </span>
            )}
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
          >
            Continue to Checkout
            <ArrowRight className="size-4" />
          </Button>

          <SheetClose
            render={
              <Link
                href="/cart"
                className={cn(
                  buttonVariants({ variant: "soft" }),
                  "w-full no-underline"
                )}
              />
            }
          >
            View full cart &amp; edit meals
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
