import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/common";

export function createOrder(data: {
  reference: string;
  customer: { name: string; phone: string };
  delivery: { area: string; address: string; directions?: string };
  items: CartItem[];
  subtotal: number;
  notes?: string;
}): Order {
  return {
    id: crypto.randomUUID(),
    reference: data.reference,
    customer: data.customer,
    delivery: data.delivery,
    items: data.items,
    subtotal: data.subtotal,
    notes: data.notes,
    createdAt: new Date().toISOString(),
  };
}
