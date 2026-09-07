import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types/common";

interface OrderHistoryState {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearHistory: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      clearHistory: () => set({ orders: [] }),
    }),
    {
      name: "soft-beans-palace-orders",
    }
  )
);
