export interface CartAddOn {
  menuItemId: string;
  categoryId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
  addOns?: CartAddOn[];
  variant?: "plate" | "combo";
}
