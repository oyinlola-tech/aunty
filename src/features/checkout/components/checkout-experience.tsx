"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCartStore } from "@/features/cart/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import { CustomerDetails } from "./customer-details"
import { DeliveryDetails } from "./delivery-details"
import { OrderSummary } from "./order-summary"
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkout.schema"
import { createOrder } from "../utils/create-order"
import { generateWhatsAppMessage } from "../utils/whatsapp-message"
import { createWhatsAppUrl } from "../utils/whatsapp-url"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CheckoutExperience() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const clearCart = useCartStore((s) => s.clearCart)
  const mounted = useMounted()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  })
  // react-hook-form's watch is the supported way to mirror one field live
  // into the summary; React Compiler merely opts this component out of auto
  // memoization, which is safe here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const orderNotes = watch("notes")

  // Avoid rendering cart-dependent content before hydration so the server
  // HTML and first client render match.
  if (!mounted) {
    return (
      <div className="flex flex-col gap-3 py-10">
        <div className="flex size-10 items-center justify-center rounded-full bg-cream-deep">
          <span className="size-4 animate-spin rounded-full border-2 border-palace-orange border-t-transparent" />
        </div>
        <p className="text-sm text-warm-grey">Preparing your order…</p>
      </div>
    )
  }

  // Phase 1 never submits through a backend: the customer reviews and sends
  // the order inside WhatsApp, so there is nothing to do with an empty cart.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold text-bean-black">
          Your plate is empty
        </h2>
        <p className="max-w-sm text-warm-grey">
          Add a few dishes to your cart before checking out.
        </p>
        <Link href="/menu" className={buttonVariants({ size: "lg" })}>
          Explore Menu
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  const onSubmit = (data: CheckoutFormData) => {
    const whatsappNumber = siteConfig.contact.whatsapp
    if (!whatsappNumber) {
      setConfigError(
        "WhatsApp ordering isn't set up yet — please contact us directly to place your order."
      )
      return
    }

    setIsSubmitting(true)
    setConfigError(null)

    try {
      const order = createOrder({
        customer: {
          name: data.customerName,
          phone: data.phoneNumber.replace(/[\s-]/g, ""),
        },
        delivery: {
          area: data.area,
          address: data.address,
          directions: data.directions || undefined,
        },
        items,
        subtotal,
        notes: data.notes || undefined,
      })

      const orderMessage = generateWhatsAppMessage(order)
      const url = createWhatsAppUrl(whatsappNumber, orderMessage)
      setWhatsappUrl(url)

      window.open(url, "_blank", "noopener,noreferrer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 lg:flex-row lg:gap-8"
    >
      <div className="flex flex-col gap-8 lg:max-w-lg">
        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-cream p-6">
          <CustomerDetails
            nameField={register("customerName")}
            phoneField={register("phoneNumber")}
            nameError={errors.customerName?.message}
            phoneError={errors.phoneNumber?.message}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-cream p-6">
          <DeliveryDetails
            areaField={register("area")}
            addressField={register("address")}
            directionsField={register("directions")}
            areaError={errors.area?.message}
            addressError={errors.address?.message}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-cream p-6">
          <h2 className="font-heading text-xl font-bold text-bean-black">
            Order Notes
          </h2>
          <div>
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-bean-black"
            >
              Anything else we should know about this order?
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Call before delivery, gate code, extra napkins..."
              className="mt-1.5 min-h-[100px] rounded-xl bg-cream-deep resize-none"
              rows={4}
            />
            <p className="mt-2 text-xs text-warm-grey">
              Dish-level instructions (less pepper, pack separately) are set on
              each meal when you add it to your cart.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:max-w-md">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          notes={orderNotes || undefined}
        />

        {configError && (
          <p className="rounded-xl bg-peach p-4 text-sm font-medium text-warm-brown">
            {configError}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full rounded-xl no-underline"
              )}
            >
              Open WhatsApp
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-xl"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Preparing..." : "Continue on WhatsApp"}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </Button>
          )}

          {whatsappUrl && (
            <div className="flex flex-col gap-3 rounded-xl bg-cream-deep p-4">
              <p className="text-sm text-warm-grey">
                WhatsApp should have opened with your order pre-filled. Review
                it, press send, and we&apos;ll take it from there.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearCart()
                  router.push("/menu")
                }}
              >
                Done — back to the menu
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
