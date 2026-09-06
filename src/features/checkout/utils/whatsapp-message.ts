import { formatCurrency } from "@/lib/currency";
import type { Order } from "@/types/common";

export function createWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateWhatsAppMessage(order: Order): string {
  const items = order.items
    .map((item, index: number) => {
      const lines: string[] = [
        `${index + 1}. ${item.name} × ${item.quantity}`,
      ]

      const sides = item.addOns?.filter((a) => a.categoryId === "sides") ?? [];
      const proteins = item.addOns?.filter((a) => a.categoryId === "proteins") ?? [];

      if (sides.length > 0) {
        lines.push("   Sides:")
        sides.forEach((addOn) => {
          lines.push(`   - ${addOn.name} × ${addOn.quantity * item.quantity}`)
        })
      }

      if (proteins.length > 0) {
        lines.push("   Proteins:")
        proteins.forEach((addOn) => {
          lines.push(`   - ${addOn.name} × ${addOn.quantity * item.quantity}`)
        })
      }

      if (item.notes) {
        lines.push(`   Notes: ${item.notes}`)
      }

      return lines.join("\n")
    })
    .join("\n\n");

  const sections = [
    `Hello Soft Beans Palace 👋`,
    ``,
    `I'd like to place an order.`,
    ``,
    `ORDER REFERENCE: ${order.reference}`,
    ``,
    `ORDER ITEMS`,
    items,
    ``,
    `TOTAL: ${formatCurrency(order.subtotal)}`,
    ``,
    `CUSTOMER DETAILS`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    ``,
    `DELIVERY DETAILS`,
    `Area: ${order.delivery.area}`,
    `Address: ${order.delivery.address}`,
  ];

  if (order.delivery.directions) {
    sections.push(`Nearest Landmark: ${order.delivery.directions}`);
  }

  if (order.notes) {
    sections.push(``, `ORDER NOTES`, order.notes);
  }

  sections.push(``, `Thank you!`);

  return sections.join("\n");
}
