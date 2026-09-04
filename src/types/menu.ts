/**
 * How many complements of each kind a dish can be combined with.
 *
 * - Absent / undefined means the dish cannot take that kind of add-on.
 * - The value is the MAXIMUM the customer may pick for that kind.
 * - 1 = single select; >1 = multiple select (e.g. sides: 2 lets a customer
 *   add two different sides to one meal). All picks are optional in
 *   Phase 1, so a customer may always choose fewer than the maximum.
 *
 * Example: beans dishes currently allow up to two sides and one protein:
 * { sides: 2, proteins: 1 }.
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
