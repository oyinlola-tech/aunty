import type { CartAddOn } from "@/types/cart"

export interface CartConfig {
  menuItemId: string
  addOns?: CartAddOn[]
  notes?: string
}

/**
 * Stable identity for one configured meal. Two additions are "the same
 * configuration" only when the main dish, every add-on (kind + item), and
 * the special instructions match — so Ewa Agoyin + plantain + fish and
 * Ewa Agoyin + bread + chicken remain independent cart lines.
 */
export function getCartConfigKey(config: CartConfig): string {
  const addOnKey = (config.addOns ?? [])
    .map((addOn) => `${addOn.categoryId}:${addOn.menuItemId}`)
    .sort()
    .join("|")
  const notesKey = (config.notes ?? "").trim().toLowerCase()

  return `${config.menuItemId}#${addOnKey}#${notesKey}`
}
