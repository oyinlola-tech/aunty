import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import { menuItems } from "@/data/menu";
import { getCartConfigKey } from "../utils/cart-identity";
import { getCartSubtotal, getCartQuantity } from "../utils/pricing";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const menuItem = menuItems.find((m) => m.id === item.menuItemId)

          if (menuItem?.categoryId === "proteins") {
            return state
          }

          const base: Omit<CartItem, "id"> = {
            ...item,
            variant: menuItem?.combo ? "combo" : "plate",
          }

          const newKey = getCartConfigKey(base)
          const existingIndex = state.items.findIndex(
            (i) => getCartConfigKey(i) === newKey
          )

          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + base.quantity,
            }
            return { items: updated }
          }

          return {
            items: [...state.items, { ...base, id: crypto.randomUUID() }],
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }))
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        }))
      },

      incrementQuantity: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }))
      },

      decrementQuantity: (id) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }))
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => getCartSubtotal(get().items),

      getTotalItems: () => getCartQuantity(get().items),
    }),
    {
      name: "soft-beans-palace-cart",
    }
  )
);
