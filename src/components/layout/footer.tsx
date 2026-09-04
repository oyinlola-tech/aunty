import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/images/brand/logo.svg"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-xl"
                aria-hidden="true"
              />
              <span className="font-heading text-lg leading-none font-bold text-bean-black">
                Soft Beans
                <span className="block text-xs font-semibold tracking-wide text-palace-orange">
                  Palace
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-grey">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-bean-black">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2">
              {navigation.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-grey transition-colors hover:text-bean-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-bean-black">
              Menu
            </h3>
            <ul className="mt-3 space-y-2">
              {navigation.menuCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-grey transition-colors hover:text-bean-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-bean-black">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-warm-grey">
              {siteConfig.location && <li>{siteConfig.location}</li>}
              {siteConfig.contact.phone && <li>{siteConfig.contact.phone}</li>}
              {siteConfig.contact.whatsapp ? (
                <li>WhatsApp ordering available</li>
              ) : (
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-palace-orange px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-palace-orange-hover"
                  >
                    Get in touch
                  </Link>
                </li>
              )}
              {siteConfig.hours.weekdays && (
                <li>Mon - Sat: {siteConfig.hours.weekdays}</li>
              )}
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${siteConfig.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-bean-black"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Extra mobile padding keeps the bottom bar from covering content. */}
      <div className="border-t border-border/50 pb-16 md:pb-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-warm-grey">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
