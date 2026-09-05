"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowRight, MessageCircle, Phone, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { navigation } from "@/data/navigation"
import { createWhatsAppUrl } from "@/features/checkout/utils/whatsapp-message"

const whatsappNumber = siteConfig.contact.whatsapp
const whatsappHref = whatsappNumber
  ? createWhatsAppUrl(
      whatsappNumber,
      "Hello Soft Beans Palace! I'd like to place an order."
    )
  : null

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

function BrandLockup({ size = 36 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src="/images/brand/logo.svg"
        alt=""
        width={size}
        height={size}
        className="rounded-xl"
        aria-hidden="true"
      />
      <span className="font-heading leading-none font-bold text-bean-black">
        Soft Beans
        <span className="block text-xs font-semibold tracking-wide text-palace-orange">
          Palace
        </span>
      </span>
    </Link>
  )
}

export function Footer() {
  const pathname = usePathname()
  // The homepage already ends with a full final-CTA section, so the footer's
  // own conversion band is reserved for the other pages.
  const isHome = pathname === "/"

  return (
    <footer className="bg-cream-deep">
      {/* Conversion band */}
      {!isHome && (
        <div className="border-t border-border/50 bg-espresso text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
            <div className="flex max-w-xl flex-col gap-2">
              <p className="font-heading text-xs font-bold tracking-widest text-golden-yellow uppercase">
                Hungry already?
              </p>
              <h2 className="font-heading text-2xl font-bold text-balance sm:text-3xl">
                Pick your beans. Build your plate.
                <br className="hidden sm:block" /> Send it our way.
              </h2>
              <p className="text-white/70">
                Your next plate of soft, delicious comfort food is one message
                away.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "no-underline",
                  !whatsappHref && "w-full"
                )}
              >
                Order Now
                <ArrowRight className="size-4" />
              </Link>
              {whatsappHref && (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "border border-white/25 bg-transparent text-white hover:border-palace-orange hover:bg-palace-orange"
                  )}
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main footer columns */}
      <div className="border-t border-border/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr] lg:px-8">
          <div className="flex flex-col gap-4">
            <BrandLockup />
            <p className="max-w-xs text-sm leading-relaxed text-warm-grey">
              Soft beans, sides and proteins made fresh in Port Harcourt.
              Build your perfect plate and order it straight on WhatsApp.
            </p>
            <div className="flex items-center gap-2 text-sm text-warm-grey">
              <MapPin className="size-4 text-palace-orange" aria-hidden="true" />
              {siteConfig.location}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-heading text-sm font-bold tracking-wide text-bean-black uppercase">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-grey transition-colors hover:text-palace-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer menu">
            <h3 className="font-heading text-sm font-bold tracking-wide text-bean-black uppercase">
              The Menu
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.menuCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-grey transition-colors hover:text-palace-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/menu"
                  className="text-sm font-semibold text-palace-orange transition-colors hover:text-palace-orange-hover"
                >
                  Full menu
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-sm font-bold tracking-wide text-bean-black uppercase">
              Get in Touch
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {whatsappHref && (
                <li>
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-palace-orange px-4 py-2 font-bold text-white transition-colors hover:bg-palace-orange-hover"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Order on WhatsApp
                  </Link>
                </li>
              )}
              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 text-warm-grey transition-colors hover:text-bean-black"
                  >
                    <Phone className="size-4 text-palace-orange" aria-hidden="true" />
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${siteConfig.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-warm-grey transition-colors hover:text-bean-black"
                  >
                    <InstagramIcon className="size-4 text-palace-orange" />
                    Instagram
                  </a>
                </li>
              )}
              {siteConfig.hours.weekdays && (
                <li className="inline-flex items-start gap-2 text-warm-grey">
                  <Clock className="mt-0.5 size-4 shrink-0 text-palace-orange" aria-hidden="true" />
                  <span>
                    Mon - Sat: {siteConfig.hours.weekdays}
                    {siteConfig.hours.weekends && (
                      <span className="block">
                        Sun: {siteConfig.hours.weekends}
                      </span>
                    )}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 pb-20 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-warm-grey">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Made with care.
          </p>
          <p className="text-xs text-warm-grey">
            Soft beans. Big flavour. Port Harcourt.
          </p>
        </div>
      </div>
    </footer>
  )
}
