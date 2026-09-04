/**
 * A single complement (side or protein) attached to a configured meal.
 * Snapshot data at add-time so the cart stays readable even if menu data
 * changes later.
 */
export interface CartAddOn {
  menuItemId: string
  categoryId: "sides" | "proteins"
  name: string
  price: number
}

/**
 * One configured cart line: a main dish plus its optional add-ons,
 * quantity and special instructions. Two lines with different add-ons or
 * instructions are different configurations and stay separate.
 */
export interface CartItem {
  id: string
  menuItemId: string
  name: string
  image: string
  /** Unit price of the main dish only. */
  price: number
  quantity: number
  notes?: string
  addOns: CartAddOn[]
}

export interface AddToCartInput {
  menuItemId: string
  name: string
  image: string
  price: number
  quantity: number
  notes?: string
  addOns?: CartAddOn[]
}

export interface UpdateCartItemInput {
  quantity?: number
  notes?: string
  addOns?: CartAddOn[]
}

export interface CartState {
  items: CartItem[]
  addItem: (input: AddToCartInput) => void
  removeItem: (id: string) => void
  /** Updates a configured meal in place, merging if it becomes identical to another line. */
  updateItem: (id: string, input: UpdateCartItemInput) => void
  updateQuantity: (id: string, quantity: number) => void
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
  getTotalItems: () => number
  /** Number of configured lines (distinct configurations). */
  getItemCount: () => number
}
