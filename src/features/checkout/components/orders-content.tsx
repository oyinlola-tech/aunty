"use client";

import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useOrderHistoryStore } from "@/features/checkout/store/order-history-store";
import { formatCurrency } from "@/lib/currency";
import { MapPin, ReceiptText, UserRound, StickyNote } from "lucide-react";
import { FoodImage } from "@/components/shared/food-image";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function OrdersContent() {
  const orders = useOrderHistoryStore((s) => s.orders);

  return (
    <SectionContainer className="flex flex-col gap-10 py-12 sm:py-16">
      <SectionHeading
        eyebrow="YOUR JOURNEY WITH US"
        title="Your orders"
        description="Keep track of the plates you have enjoyed from Soft Beans Palace."
      />

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
              {/* Header */}
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

              {/* Items with images */}
              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h2 className="font-heading text-base font-semibold text-bean-black">
                    Items ordered
                  </h2>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => {
                      const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? [];
                      const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? [];
                      const addOnsTotal = (item.addOns ?? []).reduce(
                        (sum, a) => sum + a.unitPrice * a.quantity * item.quantity,
                        0
                      );
                      const lineTotal = item.price * item.quantity + addOnsTotal;

                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-border/50 bg-cream/40 p-3"
                        >
                          <div className="flex items-start gap-3">
                            <FoodImage
                              src={item.image}
                              alt={item.name}
                              category="beans"
                              className="size-14 shrink-0 rounded-xl"
                            />
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="truncate text-sm font-semibold text-bean-black">
                                  {item.name}
                                </p>
                                <span className="shrink-0 text-sm font-bold text-bean-black">
                                  {formatCurrency(lineTotal)}
                                </span>
                              </div>
                              <p className="text-xs text-warm-grey">
                                {formatCurrency(item.price)} × {item.quantity}
                                {item.variant === "combo" && (
                                  <span className="ml-1.5 inline-flex items-center rounded-full bg-cream-deep px-1.5 py-0.5 text-[10px] font-bold uppercase text-warm-grey">
                                    Combo
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Add-ons breakdown */}
                          {(sides.length > 0 || proteins.length > 0) && (
                            <div className="mt-2 space-y-1.5 border-t border-border/40 pt-2 pl-[4.25rem]">
                              {sides.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-grey">
                                    Sides
                                  </p>
                                  <ul className="mt-0.5 space-y-0.5">
                                    {sides.map((addOn) => (
                                      <li
                                        key={addOn.menuItemId}
                                        className="flex items-center justify-between text-xs text-bean-black/70"
                                      >
                                        <span>
                                          {addOn.name} × {addOn.quantity * item.quantity}
                                        </span>
                                        <span className="font-medium text-bean-black/80">
                                          {formatCurrency(addOn.unitPrice * addOn.quantity * item.quantity)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {proteins.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-grey">
                                    Proteins
                                  </p>
                                  <ul className="mt-0.5 space-y-0.5">
                                    {proteins.map((addOn) => (
                                      <li
                                        key={addOn.menuItemId}
                                        className="flex items-center justify-between text-xs text-bean-black/70"
                                      >
                                        <span>
                                          {addOn.name} × {addOn.quantity * item.quantity}
                                        </span>
                                        <span className="font-medium text-bean-black/80">
                                          {formatCurrency(addOn.unitPrice * addOn.quantity * item.quantity)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Item-level notes */}
                          {item.notes && (
                            <div className="mt-2 flex items-start gap-1.5 pl-[4.25rem]">
                              <StickyNote className="mt-0.5 size-3 shrink-0 text-warm-grey" aria-hidden="true" />
                              <p className="text-xs italic text-warm-grey">
                                &ldquo;{item.notes}&rdquo;
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customer & Delivery */}
                <div className="grid gap-4 border-t border-border/60 pt-5 text-sm sm:grid-cols-2">
                  <div className="flex gap-3">
                    <UserRound className="mt-0.5 size-4 shrink-0 text-palace-orange" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-bean-black">Customer</p>
                      <p className="mt-1 text-warm-grey">{order.customer.name}</p>
                      <p className="text-xs text-warm-grey">{order.customer.phone}</p>
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
                          Landmark: {order.delivery.directions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order notes */}
                {order.notes && (
                  <div className="flex items-start gap-2 rounded-2xl bg-golden-yellow/10 px-4 py-3 text-sm">
                    <StickyNote className="mt-0.5 size-4 shrink-0 text-warm-brown" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-bean-black">Order notes</p>
                      <p className="mt-1 text-warm-grey">{order.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
