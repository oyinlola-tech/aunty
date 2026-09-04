/**
 * Which complements a meal base can be combined with.
 *
 * - Absent / undefined means the dish cannot take that kind of add-on.
 * - A `true` flag means the dish accepts that kind, with NO limit: the
 *   customer may add any number of sides/proteins and any quantity of each.
 *   Every add-on is optional — a customer may always choose zero.
 *
 * Example: beans dishes are meal bases and take both kinds:
 * { sides: true, proteins: true }
 */
export interface MenuCustomization {
  sides?: boolean
  proteins?: boolean
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
