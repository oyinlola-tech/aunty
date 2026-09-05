import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-palace-orange/10" />
        <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-golden-yellow/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="inline-block rounded-full bg-palace-orange/20 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-palace-orange">
          Ready to order?
        </span>

        <h2 className="mt-6 font-heading text-4xl font-bold text-white sm:text-5xl">
          Hungry already?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
          Your next plate of soft, delicious comfort food is one message away.
          Build your order and send it straight to us on WhatsApp.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/menu">
            <Button size="lg" className="gap-2 px-8">
              Order Now
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          {siteConfig.contact.whatsapp && (
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white">
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </Button>
            </a>
          )}
        </div>

        <p className="mt-8 text-sm text-white/40">
          Port Harcourt delivery &middot; No minimum order &middot; Pay on delivery
        </p>
      </div>
    </section>
  );
}
