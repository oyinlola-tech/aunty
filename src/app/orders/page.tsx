"use client";

import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { SectionContainer } from "@/components/shared/section-container";
import { FloatingCart } from "@/features/cart/components/floating-cart";
import { useOrderHistoryStore } from "@/features/checkout/store/order-history-store";
import { formatCurrency } from "@/lib/currency";
import { MapPin, ReceiptText, UserRound } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function OrdersPage() {
  const orders = useOrderHistoryStore((s) => s.orders);

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <SectionContainer className="flex flex-col gap-10 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-semibold tracking-[0.18em] text-palace-orange uppercase">
              Your journey with us
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-bean-black sm:text-5xl">
              Your orders
            </h1>
            <p className="mt-4 text-base leading-relaxed text-warm-grey sm:text-lg">
              Keep track of the plates you have enjoyed from Soft Beans Palace.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-palace-orange/30 bg-white/60 px-6 py-16 text-center shadow-sm">
              <ReceiptText className="size-10 text-palace-orange" aria-hidden="true" />
              <h2 className="mt-5 font-heading text-xl font-semibold text-bean-black">
                No orders yet
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-warm-grey sm:text-base">
                Once you place an order, your order details and delivery information will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-border/60 bg-cream-deep/60 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] text-warm-grey uppercase">
                        Order reference
                      </p>
                      <p className="mt-1 font-mono text-sm font-bold text-palace-orange">
                        {order.reference}
                      </p>
                      <p className="mt-2 text-xs text-warm-grey">
                        {dateFormatter.format(new Date(order.createdAt))}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs font-semibold tracking-[0.16em] text-warm-grey uppercase">
                        Subtotal
                      </p>
                      <p className="mt-1 font-heading text-xl font-bold text-bean-black">
                        {formatCurrency(order.subtotal)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 p-5 sm:p-6">
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-bean-black">
                        Items
                      </h2>
                      <div className="mt-3 divide-y divide-border/50 rounded-2xl border border-border/50 bg-cream/50 px-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-start justify-between gap-4 py-3 text-sm">
                            <span className="text-bean-black/80">
                              {item.name} <span className="text-warm-grey">x {item.quantity}</span>
                            </span>
                            <span className="shrink-0 font-medium text-bean-black">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 border-t border-border/60 pt-5 text-sm sm:grid-cols-2">
                      <div className="flex gap-3">
                        <UserRound className="mt-0.5 size-4 shrink-0 text-palace-orange" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-bean-black">Customer</p>
                          <p className="mt-1 text-warm-grey">{order.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-palace-orange" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-bean-black">Delivery</p>
                          <p className="mt-1 text-warm-grey">
                            {order.delivery.area}, {order.delivery.address}
                          </p>
                          {order.delivery.directions && (
                            <p className="mt-1 text-xs text-warm-grey">
                              {order.delivery.directions}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="rounded-2xl bg-golden-yellow/10 px-4 py-3 text-sm">
                        <p className="font-semibold text-bean-black">Notes</p>
                        <p className="mt-1 text-warm-grey">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionContainer>
      </main>
      <Footer />
      <FloatingCart />
      <MobileNav />
    </>
  );
}
