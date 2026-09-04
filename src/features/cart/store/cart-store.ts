import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  AddToCartInput,
  CartItem,
  CartState,
  UpdateCartItemInput,
} from "@/types/cart"
import type { MenuItem } from "@/types/menu"
import { getCartConfigKey } from "../utils/cart-identity"
import { getCartQuantity, getCartSubtotal } from "../utils/pricing"

function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

interface CartStore extends CartState {
  items: CartItem[]
}

function itemToConfig(item: CartItem) {
  return getCartConfigKey({
    menuItemId: item.menuItemId,
    addOns: item.addOns,
    notes: item.notes,
  })
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Two additions with the same main dish + add-ons + instructions are
      // the same configuration, so they merge into one line (quantity sums).
      // Anything different stays an independent, separately configurable line.
      addItem: (input: AddToCartInput) => {
        const configKey = getCartConfigKey({
          menuItemId: input.menuItemId,
          addOns: input.addOns,
          notes: input.notes,
        })
        const quantity = Math.max(1, input.quantity || 1)

        set((state) => {
          const existing = state.items.find(
            (item) => itemToConfig(item) === configKey
          )

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === existing.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          const newItem: CartItem = {
            id: generateId(),
            menuItemId: input.menuItemId,
            name: input.name,
            image: input.image,
            price: input.price,
            quantity,
            notes: input.notes || undefined,
            addOns: input.addOns ?? [],
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      // Edit one configured meal in place. If the edited configuration
      // becomes identical to another line, merge quantities into that line
      // and drop the edited one — consistent with the identity rule.
      updateItem: (id: string, input: UpdateCartItemInput) => {
        set((state) => {
          const current = state.items.find((item) => item.id === id)
          if (!current) return {}

          const updated: CartItem = {
            ...current,
            quantity:
              typeof input.quantity === "number"
                ? Math.max(1, input.quantity)
                : current.quantity,
            notes:
              input.notes !== undefined
                ? input.notes.trim() || undefined
                : current.notes,
            addOns: input.addOns ?? current.addOns,
          }

          const duplicate = state.items.find(
            (item) => item.id !== id && itemToConfig(item) === itemToConfig(updated)
          )

          if (duplicate) {
            return {
              items: state.items
                .filter((item) => item.id !== id)
                .map((item) =>
                  item.id === duplicate.id
                    ? { ...item, quantity: item.quantity + updated.quantity }
                    : item
                ),
            }
          }

          return {
            items: state.items.map((item) =>
              item.id === id ? updated : item
            ),
          }
        })
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }))
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getSubtotal: () => getCartSubtotal(get().items),
      getTotal: () => getCartSubtotal(get().items),
      getTotalItems: () => getCartQuantity(get().items),
      getItemCount: () => get().items.length,
    }),
    {
      name: "soft-beans-cart",
    }
  )
)

export function selectMenuItemById(
  items: MenuItem[],
  id: string
): MenuItem | undefined {
  return items.find((item) => item.id === id)
}

export function isItemAvailable(
  item: MenuItem | undefined
): item is MenuItem {
  return item !== undefined && item.available
}
