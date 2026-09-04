import { formatCurrency } from "@/lib/currency"
import type { Order } from "@/types/common"

export function generateWhatsAppMessage(order: Order): string {
  const lines: string[] = []

  lines.push("Hello Soft Beans Palace 👋")
  lines.push("")
  lines.push("I'd like to place an order.")
  lines.push("")

  lines.push("ORDER SUMMARY")
  lines.push("─".repeat(21))
  order.items.forEach((item, index) => {
    const notes = item.notes ? ` (${item.notes})` : ""
    const price =
      item.price > 0 ? ` @ ${formatCurrency(item.price)} each` : ""
    lines.push(`${index + 1}. ${item.name} × ${item.quantity}${notes}${price}`)
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
    lines.push("SPECIAL INSTRUCTIONS")
    lines.push("─".repeat(21))
    lines.push(order.notes)
    lines.push("")
  }

  lines.push("Thank you! 😊")

  return lines.join("\n")
}
