import type { CartItem } from "@/types/cart"

/**
 * Unit price of one configured meal:
 * main dish price + the price of every selected add-on.
 */
export function getCartItemUnitPrice(item: Pick<CartItem, "price" | "addOns">): number {
  const addOnsTotal = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0)
  return item.price + addOnsTotal
}

/** Total for one cart line: configured unit price × quantity. */
export function getCartItemLineTotal(item: Pick<CartItem, "price" | "addOns" | "quantity">): number {
  return getCartItemUnitPrice(item) * item.quantity
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getCartItemLineTotal(item), 0)
}

/** Total items = sum of quantities (e.g. 2 meals × qty 3 = 6 items). */
export function getCartQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
