/**
 * How many complements of each kind a dish can be combined with.
 * Absent / undefined means the dish cannot take that kind of add-on.
 * The counts are maximums; customers may choose fewer (all optional in
 * Phase 1). e.g. beans dishes: { sides: 1, proteins: 1 }.
 */
export interface MenuCustomization {
  sides?: number
  proteins?: number
}

export interface MenuItem {
  id: string
  name: string
  slug: string
  description: string
  price: number
  categoryId: string
  image: string
  featured: boolean
  available: boolean
  /** Present when this dish can act as a meal base with optional extras. */
  customization?: MenuCustomization
}

export interface MenuCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}
