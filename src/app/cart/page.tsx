"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CartItem } from "@/features/cart/components/cart-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { EmptyCart } from "@/features/cart/components/empty-cart";
import { useCartStore } from "@/features/cart/store/cart-store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <SectionContainer className="max-w-2xl">
      <SectionHeading
        eyebrow="YOUR CART"
        title="Review your order"
      />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
          <div className="flex gap-3">
            <Link href="/menu">
              <Button variant="outline">Continue Browsing</Button>
            </Link>
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
