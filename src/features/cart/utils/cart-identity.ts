import type { CartAddOn } from "@/types/cart"

export interface CartConfig {
  menuItemId: string
  addOns?: CartAddOn[]
  notes?: string
}

/**
 * Stable identity for one configured meal. Two additions are "the same
 * configuration" only when the main dish, every add-on (kind, item AND its
 * quantity), and the special instructions match. So:
 *
 *   Ewa Agoyin + plantain × 2 + fish × 1
 *   Ewa Agoyin + plantain × 2 + fish × 2
 *   Ewa Agoyin + bread × 1 + chicken × 1
 *
 * are three independent cart lines — no selection or quantity ever bleeds
 * into another line.
 */
export function getCartConfigKey(config: CartConfig): string {
  const addOnKey = (config.addOns ?? [])
    .map((addOn) => `${addOn.categoryId}:${addOn.menuItemId}:${addOn.quantity}`)
    .sort()
    .join("|")
  const notesKey = (config.notes ?? "").trim().toLowerCase()

  return `${config.menuItemId}#${addOnKey}#${notesKey}`
}
