"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Check, MessageCircle } from "lucide-react"
import { useCartStore } from "@/features/cart/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import { CustomerDetails } from "./customer-details"
import { DeliveryDetails } from "./delivery-details"
import { OrderSummary } from "./order-summary"
import { PaymentSection } from "./payment-section"
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkout.schema"
import { createOrder } from "../utils/create-order"
import { generateOrderReference } from "../utils/order-reference"
import { generateWhatsAppMessage } from "../utils/whatsapp-message"
import { createWhatsAppUrl } from "../utils/whatsapp-message"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CheckoutExperience() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const clearCart = useCartStore((s) => s.clearCart)
  const mounted = useMounted()

  const [isSubmitting, setIsSubmitting] = useState(false)
  // One stable reference + WhatsApp link per submission action. They are
  // generated together exactly once and reused for every follow-up render,
  // so a rerender or a second tap can never mint a different order number.
  const [submitted, setSubmitted] = useState<{
    reference: string
    whatsappUrl: string
  } | null>(null)
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

  const paymentConfigured = Boolean(
    siteConfig.payment.bankName ||
      siteConfig.payment.accountName ||
      siteConfig.payment.accountNumber
  )

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
    // Never generate a second reference or a second draft for one action.
    if (submitted) return

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
      const reference = generateOrderReference()
      const order = createOrder({
        reference,
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
      setSubmitted({ reference, whatsappUrl: url })

      window.open(url, "_blank", "noopener,noreferrer")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDone = () => {
    clearCart()
    router.push("/menu")
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
              className="mt-1.5 min-h-[100px] resize-none rounded-xl bg-cream-deep"
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

        <PaymentSection amount={subtotal} payment={siteConfig.payment} />

        {configError && (
          <p className="rounded-xl bg-peach p-4 text-sm font-medium text-warm-brown">
            {configError}
          </p>
        )}

        {submitted ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-palace-orange/40 bg-cream p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-muted-green">
                <Check className="size-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-heading text-lg font-bold text-bean-black">
                  Your order is ready to send
                </h3>
                <p className="text-sm text-warm-grey">
                  Review it in WhatsApp, attach your payment receipt, then send.
                </p>
              </div>
            </div>

            <div
              role="status"
              aria-live="polite"
              className="flex flex-col gap-1 rounded-xl bg-espresso p-4 text-white"
            >
              <span className="text-xs tracking-wide text-white/70 uppercase">
                Your order reference
              </span>
              <span className="font-mono text-xl font-bold tracking-wider text-palace-orange">
                {submitted.reference}
              </span>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                Keep this reference to discuss your order with us — it also
                appears at the top and bottom of your WhatsApp message.
              </p>
            </div>

            <a
              href={submitted.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full no-underline"
              )}
            >
              Open WhatsApp with my order
              <MessageCircle className="size-4" />
            </a>

            <p className="text-center text-xs leading-relaxed text-warm-grey">
              WhatsApp should have opened automatically. If it did not, tap the
              button above. Before sending, attach your bank transfer receipt
              to the conversation.
            </p>

            <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDone}
              >
                Done — back to the menu
              </Button>
              <p className="text-center text-xs text-warm-grey">
                Nothing is charged by this website — your transfer is confirmed
                by Soft Beans Palace when your receipt arrives.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paymentConfigured && (
              <div className="flex items-start gap-2 rounded-xl bg-cream-deep p-3 text-sm leading-relaxed text-bean-black/80">
                <Check
                  className="mt-0.5 size-4 flex-shrink-0 text-muted-green"
                  aria-hidden="true"
                />
                <p>
                  Made your transfer? Tap below and WhatsApp opens with your
                  order and reference ready.
                </p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Preparing..."
                : paymentConfigured
                  ? "I've Made Payment — Open WhatsApp"
                  : "Continue on WhatsApp"}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </Button>
            <p className="text-center text-xs leading-relaxed text-warm-grey">
              {paymentConfigured
                ? "Tapping this states that you have paid — Soft Beans Palace confirms the transfer when your receipt arrives on WhatsApp."
                : "WhatsApp opens with your order pre-filled — review it, attach anything we should see, and send."}
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
