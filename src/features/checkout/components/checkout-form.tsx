"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { CustomerDetails } from "./customer-details";
import { DeliveryDetails } from "./delivery-details";
import { OrderSummary } from "./order-summary";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "../schemas/checkout.schema";
import { createOrder } from "../utils/create-order";
import { generateOrderReference } from "../utils/order-reference";
import {
  generateWhatsAppMessage,
} from "../utils/whatsapp-message";
import { createWhatsAppUrl } from "../utils/whatsapp-url";
import { siteConfig } from "@/config/site";

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  function onSubmit(data: CheckoutFormData) {
    const reference = generateOrderReference();
    const order = createOrder({
      reference,
      customer: {
        name: data.customerName,
        phone: data.phoneNumber,
      },
      delivery: {
        area: data.area,
        address: data.address,
        directions: data.directions,
      },
      items,
      subtotal,
      notes: data.notes,
    });

    const message = generateWhatsAppMessage(order);

    if (!siteConfig.contact.whatsapp) {
      alert("WhatsApp number is not configured. Please contact the business.");
      return;
    }

    const url = createWhatsAppUrl(siteConfig.contact.whatsapp, message);
    window.open(url, "_blank");
    clearCart();
    router.push("/");
  }

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-heading text-lg font-semibold text-bean-black">
          Your cart is empty.
        </p>
        <p className="mt-1 text-sm text-warm-grey">
          Add some food before checking out.
        </p>
        <Button
          variant="default"
          className="mt-4"
          onClick={() => router.push("/menu")}
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <CustomerDetails
        nameField={register("customerName")}
        phoneField={register("phoneNumber")}
        nameError={errors.customerName?.message}
        phoneError={errors.phoneNumber?.message}
      />
      <DeliveryDetails
        areaField={register("area")}
        addressField={register("address")}
        directionsField={register("directions")}
        areaError={errors.area?.message}
        addressError={errors.address?.message}
      />
      <OrderSummary items={items} subtotal={subtotal} />
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        <MessageCircle className="size-5" />
        Continue on WhatsApp
      </Button>
    </form>
  );
}
