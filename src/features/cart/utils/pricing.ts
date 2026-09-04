import type { CartAddOn, CartItem } from "@/types/cart"

/** Total contributed by one add-on: its unit price × its quantity. */
export function getAddOnTotal(addOn: Pick<CartAddOn, "unitPrice" | "quantity">): number {
  return addOn.unitPrice * addOn.quantity
}

/** Total of every selected side and protein in a configured meal. */
export function getAddOnsTotal(addOns: Pick<CartAddOn, "unitPrice" | "quantity">[]): number {
  return addOns.reduce((sum, addOn) => sum + getAddOnTotal(addOn), 0)
}

/**
 * Unit price of ONE configured meal:
 * main dish price + the total of all add-on collections
 * (each add-on's unit price × its quantity).
 */
export function getCartItemUnitPrice(item: Pick<CartItem, "price" | "addOns">): number {
  return item.price + getAddOnsTotal(item.addOns)
}

/** Total for one cart line: configured unit price × meal quantity. */
export function getCartItemLineTotal(
  item: Pick<CartItem, "price" | "addOns" | "quantity">
): number {
  return getCartItemUnitPrice(item) * item.quantity
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getCartItemLineTotal(item), 0)
}

/** Total items = sum of configured-meal quantities (e.g. 2 lines × qty 3 = 6 meals). */
export function getCartQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
