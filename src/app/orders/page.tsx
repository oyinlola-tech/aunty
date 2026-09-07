"use client";

import { SectionContainer } from "@/components/shared/section-container";
import { useOrderHistoryStore } from "@/features/checkout/store/order-history-store";
import { formatCurrency } from "@/lib/currency";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function OrdersPage() {
  const orders = useOrderHistoryStore((s) => s.orders);

  return (
    <SectionContainer className="flex flex-col gap-10 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-bold text-bean-black">
          Your Orders
        </h1>
        <p className="text-warm-grey">
          A history of your orders with Soft Beans Palace.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-heading text-lg font-semibold text-bean-black">
            No orders yet
          </p>
          <p className="max-w-sm text-warm-grey">
            When you place an order, it will appear here with the date and time.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-border/50 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm font-bold text-palace-orange">
                    {order.reference}
                  </span>
                  <span className="text-xs text-warm-grey">
                    {dateFormatter.format(new Date(order.createdAt))}
                  </span>
                </div>
                <span className="text-base font-bold text-bean-black">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-bean-black/80">
                      {idx + 1}. {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-bean-black">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-1 text-sm text-warm-grey">
                <p>
                  <span className="font-medium text-bean-black">Customer:</span>{" "}
                  {order.customer.name}
                </p>
                <p>
                  <span className="font-medium text-bean-black">Delivery:</span>{" "}
                  {order.delivery.area} — {order.delivery.address}
                </p>
                {order.notes && (
                  <p>
                    <span className="font-medium text-bean-black">Notes:</span>{" "}
                    {order.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
