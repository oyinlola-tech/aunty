import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, CartState } from "@/types/cart"
import type { MenuItem } from "@/types/menu"

function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

interface CartStore extends CartState {
  items: CartItem[]
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: Omit<CartItem, "id">) => {
        const id = generateId()
        const newItem: CartItem = { ...item, id }

        set((state) => {
          const existing = state.items.find(
            (i) => i.menuItemId === item.menuItemId && i.notes === item.notes
          )

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }))
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }))
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity >= 1),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
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
