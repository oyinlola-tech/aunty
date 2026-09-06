"use client";

import { useState, useRef } from "react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { CartItem } from "@/features/cart/components/cart-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { EmptyCart } from "@/features/cart/components/empty-cart";
import { ProductModal } from "@/features/menu/components/product-modal";
import { menuItems } from "@/data/menu";
import { SectionContainer } from "@/components/shared/section-container";
import { ShoppingBag } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const mounted = useMounted();
  const hasItems = mounted && items.length > 0;
  const shownTotal = mounted ? totalItems : 0;

  const [editingItem, setEditingItem] = useState<CartItemType | null>(null);
  const editingMenuItem = editingItem
    ? (menuItems.find((menuItem) => menuItem.id === editingItem.menuItemId) ??
      null)
    : null;
  const editTriggerRef = useRef<HTMLDivElement>(null);

  const handleEdit = (item: CartItemType) => {
    setEditingItem(item);
  };

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
                <div key={item.id} ref={item.id === editingItem?.id ? editTriggerRef : undefined}>
                  <CartItem
                    item={item}
                    plateNumber={index + 1}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary />
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
          triggerRef={editTriggerRef}
        />
      )}
    </SectionContainer>
  );
}
