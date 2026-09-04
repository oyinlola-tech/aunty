/**
 * One complement (side or protein) attached to a configured meal, together
 * with the quantity the customer wants of it. A configured meal holds a
 * collection of these; there is no limit on how many entries or how large
 * each quantity may be. Data is snapshotted at add-time so the cart stays
 * readable even if menu data changes later.
 */
export interface CartAddOn {
  menuItemId: string
  categoryId: "sides" | "proteins"
  name: string
  /** Price of one portion of this add-on. */
  unitPrice: number
  /** How many portions of this add-on are in the configured meal. */
  quantity: number
}

/**
 * One configured cart line: a main dish plus its collection of sides and
 * proteins (each with its own quantity), special instructions and the number
 * of identical configured meals. Two lines whose configuration differs in
 * any way — add-ons, their quantities, or instructions — stay independent.
 */
export interface CartItem {
  id: string
  menuItemId: string
  name: string
  image: string
  /** Unit price of the main dish only (add-ons are priced separately). */
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
