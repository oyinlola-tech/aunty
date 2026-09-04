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

/** One configured meal, printed with all of its sides, proteins and totals. */
function formatMeal(item: Order["items"][number], index: number): string[] {
  const lines: string[] = []

  lines.push(`${index + 1}. ${item.name}`)
  lines.push(`   Meal quantity: ${item.quantity}`)

  for (const kind of ["sides", "proteins"] as const) {
    const ofKind = item.addOns.filter((addOn) => addOn.categoryId === kind)
    if (ofKind.length === 0) continue

    lines.push(`   ${ADD_ON_LABEL[kind]}:`)
    for (const addOn of ofKind) {
      const unit = addOn.unitPrice > 0 ? ` (${formatCurrency(addOn.unitPrice)} each)` : ""
      lines.push(`   - ${addOn.name} x ${addOn.quantity}${unit}`)
    }
  }

  if (item.notes) {
    lines.push(`   Special instructions: ${item.notes}`)
  }

  const unitPrice = getCartItemUnitPrice(item)
  const lineTotal = getCartItemLineTotal(item)
  if (unitPrice > 0) {
    lines.push(`   Meal price: ${formatCurrency(unitPrice)}`)
  }
  if (lineTotal > 0) {
    lines.push(`   Line total: ${formatCurrency(lineTotal)}`)
  }

  return lines
}

export function generateWhatsAppMessage(order: Order): string {
  const lines: string[] = []

  lines.push("Hello Soft Beans Palace!")
  lines.push("")
  lines.push("I'd like to place an order.")
  lines.push("")
  lines.push("ORDER SUMMARY")
  lines.push("-".repeat(24))
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
  lines.push("-".repeat(24))
  lines.push(`Name: ${order.customer.name}`)
  lines.push(`Phone: ${order.customer.phone}`)
  lines.push("")

  lines.push("DELIVERY DETAILS")
  lines.push("-".repeat(24))
  lines.push(`Area: ${order.delivery.area}`)
  lines.push(`Address: ${order.delivery.address}`)
  if (order.delivery.directions) {
    lines.push(`Landmark: ${order.delivery.directions}`)
  }
  lines.push("")

  if (order.notes) {
    lines.push("ORDER NOTES")
    lines.push("-".repeat(24))
    lines.push(order.notes)
    lines.push("")
  }

  lines.push("Thank you!")

  return lines.join("\n")
}
