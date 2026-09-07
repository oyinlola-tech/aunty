"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/features/checkout/utils/whatsapp-message";
import { Doodle } from "@/components/shared/doodle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const whatsappNumber = siteConfig.contact.whatsapp;
const whatsappHref = whatsappNumber
  ? createWhatsAppUrl(
      whatsappNumber,
      "Hello Soft Beans Palace! I'd like to place an order."
    )
  : null;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.6a4.85 4.85 0 01-3.77-1.72V6.69h3.77z" />
    </svg>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  return (
    <footer>
      {/* Footer Hero CTA */}
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-palace-orange/5" />
          <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-golden-yellow/8" />
          <Doodle className="absolute -right-10 top-1/2 size-64 rotate-12 opacity-30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
            
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <p className="font-heading text-sm font-semibold tracking-widest text-palace-orange uppercase">
                Soft Beans Palace
              </p>

              <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-bean-black sm:text-5xl lg:text-6xl">
                Still thinking about{" "}
                <span className="relative inline-block">
                  that plate?
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8 Q50 2, 100 8 T198 8"
                      stroke="#F5821F"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-grey sm:text-xl">
                Build your perfect plate with soft beans, golden plantain, crispy yam, and your favourite proteins. Made fresh daily in Port Harcourt.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/menu">
                  <Button size="lg" className="px-8">
                    Build Your Plate
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                {whatsappHref && (
                  <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="px-8">
                      <MessageCircle className="size-4" />
                      Order on WhatsApp
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              className="relative flex-1 w-full max-w-md lg:max-w-lg"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative h-64 w-full sm:h-72 lg:h-80">
                <div className="absolute -left-2 top-2 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 border-4 border-white">
                  <Image
                    src="/images/hero/beans-porridge.webp"
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute right-0 top-6 w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 border-4 border-white">
                  <Image
                    src="/images/hero/fried-plantain.webp"
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute left-1/2 bottom-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden shadow-2xl transform -translate-x-1/2 border-4 border-white">
                  <Image
                    src="/images/hero/african-beans.webp"
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>

                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
                  animate={reduceMotion ? undefined : { rotate: [12, 8, 12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/decorations/stickers/100-yummy.svg"
                    alt=""
                    width={110}
                    height={32}
                    className="drop-shadow-md"
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compact footer info */}
      <div className="bg-cream-deep">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
            
            <div className="flex flex-col items-center gap-2 lg:items-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5"
                aria-label={`${siteConfig.name} home`}
              >
                <Image
                  src="/images/brand/logo.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-lg"
                  aria-hidden="true"
                />
                <span className="font-heading text-base leading-none font-bold text-bean-black">
                  Soft Beans
                  <span className="block text-xs font-semibold tracking-wide text-palace-orange">
                    Palace
                  </span>
                </span>
              </Link>
              <div className="flex items-center gap-2 text-sm text-warm-grey">
                <MapPin className="size-4 text-palace-orange" aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <nav aria-label="Quick links" className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/menu" className={cn("text-warm-grey transition-colors hover:text-palace-orange", pathname === "/menu" && "text-bean-black")} aria-current={pathname === "/menu" ? "page" : undefined}>
                Menu
              </Link>
              <Link href="/about" className={cn("text-warm-grey transition-colors hover:text-palace-orange", pathname === "/about" && "text-bean-black")} aria-current={pathname === "/about" ? "page" : undefined}>
                About
              </Link>
              <Link href="/contact" className={cn("text-warm-grey transition-colors hover:text-palace-orange", pathname === "/contact" && "text-bean-black")} aria-current={pathname === "/contact" ? "page" : undefined}>
                Contact
              </Link>
              <Link href="/orders" className={cn("text-warm-grey transition-colors hover:text-palace-orange", pathname === "/orders" && "text-bean-black")} aria-current={pathname === "/orders" ? "page" : undefined}>
                Orders
              </Link>
              {whatsappHref && (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-grey transition-colors hover:text-palace-orange"
                >
                  WhatsApp
                </Link>
              )}
            </nav>

            <div className="flex flex-col items-center gap-2 text-sm text-warm-grey lg:items-end">
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-bean-black"
                >
                  <Phone className="size-4 text-palace-orange" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              )}
              {siteConfig.social.tiktok && (
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-bean-black"
                >
                  <TikTokIcon className="size-4 text-palace-orange" />
                  TikTok
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-bean-black"
                >
                  <FacebookIcon className="size-4 text-palace-orange" />
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 bg-cream-deep pb-20 md:pb-0">
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
  );
}
