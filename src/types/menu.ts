export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export type MenuCategoryId = "beans" | "sides" | "proteins" | "combos";

export interface MenuItemCustomization {
  sides?: boolean;
  proteins?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: MenuCategoryId;
  image: string;
  featured: boolean;
  available: boolean;
  customization?: MenuItemCustomization;
  combo?: boolean;
}
