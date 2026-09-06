import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/features/checkout/utils/whatsapp-message";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Soft Beans Palace. Order via WhatsApp or reach us directly.",
};

const contactItems = [
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location || "Port Harcourt",
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.hours.weekdays || siteConfig.hours.weekends,
  },
];

const whatsappNumber = siteConfig.contact.whatsapp;
const whatsappHref = whatsappNumber
  ? createWhatsAppUrl(whatsappNumber, "Hello Soft Beans Palace! I'd like to inquire about your menu.")
  : null;

export default function ContactPage() {
  const hasContactDetails = contactItems.some((item) => item.value);

  return (
    <>
      <SectionContainer>
        <SectionHeading
          eyebrow="CONTACT US"
          title="Let's talk."
          description="Got questions or want to make a reservation? Reach out to us."
        />
        {hasContactDetails ? (
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {contactItems
              .filter((item) => item.value)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl bg-ivory p-5"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-palace-orange/10">
                      <Icon className="size-5 text-palace-orange" />
                    </div>
                    <div>
                      <p className="text-sm text-warm-grey">{item.label}</p>
                      <p className="mt-0.5 font-medium text-bean-black">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-warm-grey">
              Contact details are being set up. The fastest way to reach us is on WhatsApp.
            </p>
          </div>
        )}
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-2xl bg-espresso p-8 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">
            Prefer to order on WhatsApp?
          </h2>
          <p className="mt-2 text-white/70">
            Send us a message and we&apos;ll sort you out.
          </p>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 inline-flex items-center gap-2 no-underline"
              )}
            >
              <MessageCircle className="size-4" />
              Chat with us
            </a>
          )}
        </div>
      </SectionContainer>
    </>
  );
}
