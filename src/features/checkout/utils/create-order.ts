import type { Order } from "@/types/common"
import type { CartItem } from "@/types/cart"

export interface CreateOrderInput {
  /** Unique reference for this order (see order-reference.ts). */
  reference: string
  customer: {
    name: string
    phone: string
  }
  delivery: {
    area: string
    address: string
    directions?: string
  }
  items: CartItem[]
  subtotal: number
  notes?: string
}

/**
 * Builds a structured order object from the cart and the completed
 * checkout form. Phase 1 sends this order to WhatsApp; a future
 * backend can consume the same shape.
 */
export function createOrder(input: CreateOrderInput): Order {
  return {
    reference: input.reference,
    customer: input.customer,
    delivery: input.delivery,
    items: input.items,
    subtotal: input.subtotal,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  }
}
