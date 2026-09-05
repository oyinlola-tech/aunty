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
    .map(
      (item: any, index: number) =>
        `${index + 1}. ${item.name} × ${item.quantity}${item.notes ? ` (${item.notes})` : ""}`
    )
    .join("\n");

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
    sections.push(`Landmark: ${order.delivery.directions}`);
  }

  if (order.notes) {
    sections.push(``, `SPECIAL INSTRUCTIONS`, order.notes);
  }

  sections.push(``, `Thank you!`);

  return sections.join("\n");
}
