export type MenuFilter = "all" | "beans" | "sides" | "proteins";

export interface Order {
  id: string;
  reference: string;
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    area: string;
    address: string;
    directions?: string;
  };
  items: import("./cart").CartItem[];
  subtotal: number;
  notes?: string;
  createdAt: string;
}
