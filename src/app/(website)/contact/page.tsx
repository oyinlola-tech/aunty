import type { Metadata } from "next"
import { SectionContainer } from "@/components/shared/section-container"
import { siteConfig } from "@/config/site"
import { createWhatsAppUrl } from "@/features/checkout/utils/whatsapp-url"
import { MessageCircle, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Soft Beans Palace. Chat with us on WhatsApp or give us a call.",
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function ContactPage() {
  const whatsappNumber = siteConfig.contact.whatsapp
  const whatsappUrl = whatsappNumber
    ? createWhatsAppUrl(whatsappNumber, "Hello Soft Beans Palace! I have a question about your menu.")
    : undefined

  const showHours =
    Boolean(siteConfig.hours.weekdays) || Boolean(siteConfig.hours.weekends)

  return (
    <div className="flex flex-col gap-16">
      <SectionContainer className="flex flex-col gap-10 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-palace-orange">
            Get in Touch
          </span>
          <h1 className="font-heading text-3xl font-bold text-bean-black sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-md text-warm-grey">
            Have a question or want to place an order? Reach out to us.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-cream p-6">
            <h2 className="font-heading text-xl font-bold text-bean-black mb-6">
              Contact Info
            </h2>
            <div className="flex flex-col gap-4">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-palace-orange p-4 text-white transition-colors hover:bg-palace-orange-hover"
                >
                  <MessageCircle className="size-6" />
                  <div>
                    <p className="font-heading text-lg font-bold">
                      Chat on WhatsApp
                    </p>
                    <p className="text-sm opacity-80">
                      Send us a message anytime
                    </p>
                  </div>
                </a>
              )}

              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-4 rounded-xl bg-cream-deep p-4 transition-colors hover:bg-palace-orange hover:text-white"
                >
                  <Phone className="size-5 text-palace-orange" />
                  <div>
                    <p className="text-sm text-warm-grey">Phone</p>
                    <p className="font-medium text-bean-black">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </a>
              )}

              {siteConfig.social.instagram && (
                <a
                  href={`https://instagram.com/${siteConfig.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl bg-cream-deep p-4 transition-colors hover:bg-palace-orange"
                >
                  <InstagramIcon className="size-5 text-palace-orange transition-colors group-hover:text-white" />
                  <div>
                    <p className="text-sm text-warm-grey transition-colors group-hover:text-white/80">
                      Instagram
                    </p>
                    <p className="font-medium text-bean-black transition-colors group-hover:text-white">
                      @
                      {siteConfig.social.instagram.startsWith("@")
                        ? siteConfig.social.instagram.slice(1)
                        : siteConfig.social.instagram}
                    </p>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4 rounded-xl bg-cream-deep p-4">
                <MapPin className="size-5 text-palace-orange" />
                <div>
                  <p className="text-sm text-warm-grey">Location</p>
                  <p className="font-medium text-bean-black">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-cream-deep p-4">
                <Clock className="size-5 text-palace-orange" />
                <div>
                  <p className="text-sm text-warm-grey">Hours</p>
                  {showHours ? (
                    <>
                      {siteConfig.hours.weekdays && (
                        <p className="font-medium text-bean-black">
                          Mon - Sat: {siteConfig.hours.weekdays}
                        </p>
                      )}
                      {siteConfig.hours.weekends && (
                        <p className="text-sm text-warm-grey">
                          Sun: {siteConfig.hours.weekends}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-medium text-bean-black">
                      Opening hours coming soon
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-cream p-6">
            <h2 className="font-heading text-xl font-bold text-bean-black mb-6">
              How to Order
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {[
                  {
                    step: "1",
                    title: "Browse the menu",
                    text: "Check out our delicious dishes.",
                  },
                  {
                    step: "2",
                    title: "Build your order",
                    text: "Add items to your cart and customize them.",
                  },
                  {
                    step: "3",
                    title: "Checkout",
                    text: "Enter your details and review your order.",
                  },
                  {
                    step: "4",
                    title: "Send on WhatsApp",
                    text: "Complete your order by sending it to us.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-palace-orange text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-bean-black">
                        {item.title}
                      </h3>
                      <p className="text-sm text-warm-grey">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

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
                  Chat With Us on WhatsApp
                  <ArrowRight className="size-4" />
                </a>
              ) : (
                <div className="rounded-xl bg-cream-deep p-4 text-sm text-warm-grey">
                  WhatsApp ordering is being set up. In the meantime, order
                  through the menu and checkout — or check back soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="rounded-2xl bg-cream-deep py-12 px-6 text-center">
        <p className="font-heading text-xl text-bean-black">
          We&apos;re here to serve you!
        </p>
        <p className="mt-2 text-warm-grey">
          Reach out anytime and we&apos;ll get back to you.
        </p>
      </div>
    </div>
  )
}
