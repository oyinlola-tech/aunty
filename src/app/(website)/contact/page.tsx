import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";

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
    value: siteConfig.contact.phone || "Contact us",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email || "Contact us",
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.hours.weekdays || "Contact us",
  },
];

export default function ContactPage() {
  return (
    <>
      <SectionContainer>
        <SectionHeading
          eyebrow="CONTACT US"
          title="Let's talk."
          description="Got questions or want to make a reservation? Reach out to us."
        />
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map((item) => {
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
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-2xl bg-espresso p-8 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">
            Prefer to order on WhatsApp?
          </h2>
          <p className="mt-2 text-white/70">
            Send us a message and we&apos;ll sort you out.
          </p>
        </div>
      </SectionContainer>
    </>
  );
}
