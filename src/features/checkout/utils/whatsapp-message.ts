import { formatCurrency } from "@/lib/currency"
import type { Order } from "@/types/common"
import type { CartAddOn } from "@/types/cart"
import {
  getCartItemLineTotal,
  getCartItemUnitPrice,
} from "@/features/cart/utils/pricing"

const ADD_ON_LABEL: Record<CartAddOn["categoryId"], string> = {
  sides: "Sides",
  proteins: "Proteins",
}

const SEPARATOR = "-".repeat(28)

/**
 * Renders one configured meal with every side and protein, its own
 * quantities, special request, meal quantity and item total.
 */
function formatMeal(item: Order["items"][number], index: number): string[] {
  const lines: string[] = []

  lines.push(`${index + 1}. ${item.name}`)
  lines.push(`   Meal quantity: ${item.quantity}`)

  for (const kind of ["sides", "proteins"] as const) {
    const ofKind = item.addOns.filter((addOn) => addOn.categoryId === kind)
    if (ofKind.length === 0) continue

    lines.push(`   ${ADD_ON_LABEL[kind]}:`)
    for (const addOn of ofKind) {
      const unit =
        addOn.unitPrice > 0
          ? ` (${formatCurrency(addOn.unitPrice)} each)`
          : ""
      lines.push(`   - ${addOn.name} x ${addOn.quantity}${unit}`)
    }
  }

  if (item.notes) {
    lines.push(`   Special request: ${item.notes}`)
  }

  const unitPrice = getCartItemUnitPrice(item)
  const lineTotal = getCartItemLineTotal(item)
  if (unitPrice > 0) {
    lines.push(`   Meal price (one serving): ${formatCurrency(unitPrice)}`)
  }
  if (lineTotal > 0) {
    lines.push(`   Item total: ${formatCurrency(lineTotal)}`)
  } else {
    lines.push(`   Item total: to be confirmed`)
  }

  return lines
}

/**
 * The operational message the vendor reads inside WhatsApp. Every field that
 * exists in the order is present, sectioned and easy to scan; the order
 * reference appears near both the top and the bottom so it can be searched
 * quickly. Only amounts the frontend actually calculates are printed.
 */
export function generateWhatsAppMessage(order: Order): string {
  const lines: string[] = []

  lines.push("*SOFT BEANS PALACE - NEW ORDER*")
  lines.push("")
  lines.push("*ORDER REFERENCE*")
  lines.push(order.reference)
  lines.push("")
  lines.push(SEPARATOR)
  lines.push("")
  lines.push("*CUSTOMER DETAILS*")
  lines.push(`Name: ${order.customer.name}`)
  lines.push(`Phone: ${order.customer.phone}`)
  lines.push("")
  lines.push(SEPARATOR)
  lines.push("")
  lines.push("*ORDER ITEMS*")

  order.items.forEach((item, index) => {
    if (index > 0) lines.push("")
    lines.push(...formatMeal(item, index))
  })

  const totalMeals = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  lines.push("")
  lines.push(SEPARATOR)
  lines.push("")
  lines.push("*ORDER SUMMARY*")
  lines.push(
    `Meal configurations: ${order.items.length}${totalMeals !== order.items.length ? ` (${totalMeals} meals total)` : ""}`
  )
  if (order.subtotal > 0) {
    lines.push(`Subtotal: ${formatCurrency(order.subtotal)}`)
    lines.push(`*Total: ${formatCurrency(order.subtotal)}*`)
  } else {
    lines.push("Total: to be confirmed on WhatsApp")
  }
  lines.push("")
  lines.push(SEPARATOR)
  lines.push("")
  lines.push("*DELIVERY DETAILS*")
  lines.push(`Area: ${order.delivery.area}`)
  lines.push(`Address: ${order.delivery.address}`)
  if (order.delivery.directions) {
    lines.push(`Landmark: ${order.delivery.directions}`)
  }
  lines.push("")

  if (order.notes) {
    lines.push("*ORDER NOTES*")
    lines.push(order.notes)
    lines.push("")
  }

  lines.push("*PAYMENT*")
  lines.push("Method: Bank Transfer")
  if (order.subtotal > 0) {
    lines.push(`Amount: ${formatCurrency(order.subtotal)}`)
  } else {
    lines.push("Amount: to be confirmed on WhatsApp")
  }
  lines.push("Status: Customer indicates payment has been made.")
  lines.push("Please confirm the transfer before preparing the order.")
  lines.push("Receipt: Customer will attach payment proof to this chat.")
  lines.push("")
  lines.push(SEPARATOR)
  lines.push("")
  lines.push("*ORDER REFERENCE*")
  lines.push(order.reference)
  lines.push("")
  lines.push("Please keep this order reference for easy follow-up.")
  lines.push("Payment proof should be attached to this conversation.")
  lines.push("Thank you for ordering from Soft Beans Palace.")

  return lines.join("\n")
}
