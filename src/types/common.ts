export type MenuFilter = "all" | "beans" | "sides" | "proteins"

export interface CustomerDetails {
  name: string
  phone: string
}

export interface DeliveryDetails {
  area: string
  address: string
  directions?: string
}

export interface OrderNotes {
  notes?: string
}

export interface CheckoutFormData {
  customerName: string
  phoneNumber: string
  area: string
  address: string
  directions?: string
  notes?: string
}

export interface Order {
  id: string
  customer: {
    name: string
    phone: string
  }
  delivery: {
    area: string
    address: string
    directions?: string
  }
  items: import("@/types/cart").CartItem[]
  subtotal: number
  notes?: string
  createdAt: string
}
