import { formatCurrency } from "@/lib/currency"
import type { Order } from "@/types/common"
import type { CartAddOn } from "@/types/cart"
import { getCartItemUnitPrice } from "@/features/cart/utils/pricing"

const ADD_ON_LABEL: Record<CartAddOn["categoryId"], string> = {
  sides: "Side",
  proteins: "Protein",
}

/** One configured meal, indented under its numbered line. */
function formatMeal(item: Order["items"][number], index: number): string[] {
  const lines: string[] = []

  lines.push(`${index + 1}. ${item.name} × ${item.quantity}`)

  for (const addOn of item.addOns) {
    lines.push(`   ${ADD_ON_LABEL[addOn.categoryId]}: ${addOn.name}`)
  }

  if (item.notes) {
    lines.push(`   Special instructions: ${item.notes}`)
  }

  const unitPrice = getCartItemUnitPrice(item)
  if (unitPrice > 0) {
    lines.push(`   @ ${formatCurrency(unitPrice)} each`)
  }

  return lines
}

export function generateWhatsAppMessage(order: Order): string {
  const lines: string[] = []

  lines.push("Hello Soft Beans Palace 👋")
  lines.push("")
  lines.push("I'd like to place an order.")
  lines.push("")
  lines.push("ORDER SUMMARY")
  lines.push("─".repeat(21))
  order.items.forEach((item, index) => {
    lines.push(...formatMeal(item, index))
  })
  lines.push("")

  if (order.subtotal > 0) {
    lines.push("TOTAL: " + formatCurrency(order.subtotal))
  } else {
    lines.push("TOTAL: to be confirmed")
  }
  lines.push("")

  lines.push("CUSTOMER DETAILS")
  lines.push("─".repeat(21))
  lines.push(`Name: ${order.customer.name}`)
  lines.push(`Phone: ${order.customer.phone}`)
  lines.push("")

  lines.push("DELIVERY DETAILS")
  lines.push("─".repeat(21))
  lines.push(`Area: ${order.delivery.area}`)
  lines.push(`Address: ${order.delivery.address}`)
  if (order.delivery.directions) {
    lines.push(`Landmark: ${order.delivery.directions}`)
  }
  lines.push("")

  if (order.notes) {
    lines.push("ORDER NOTES")
    lines.push("─".repeat(21))
    lines.push(order.notes)
    lines.push("")
  }

  lines.push("Thank you! 😊")

  return lines.join("\n")
}
