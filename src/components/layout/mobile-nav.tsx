"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  MoreHorizontal,
  Info,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";

const bottomLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
];

const moreLinks = [
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export function MobileNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const mounted = useMounted();
  const visibleCount = mounted ? totalItems : 0;
  const [moreOpen, setMoreOpen] = useState(false);

  const moreActive = pathname === "/about" || pathname === "/contact";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
      {moreOpen && (
        <div className="absolute bottom-full left-0 right-0 border-t border-border/50 bg-background/95 pb-2 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-2 px-4 py-3">
            {moreLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMoreOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 text-xs font-semibold transition-colors",
                    isActive
                      ? "border-palace-orange bg-palace-orange/10 text-palace-orange"
                      : "border-border/60 bg-cream text-bean-black"
                  )}
                >
                  <Icon className="size-5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-around px-2 py-1.5">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-palace-orange"
                  : "text-warm-grey hover:text-bean-black"
              )}
            >
              <span className="relative">
                <Icon className="size-5" />
                {link.label === "Cart" && visibleCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-palace-orange text-[9px] font-bold text-white">
                    {visibleCount}
                  </span>
                )}
              </span>
              {link.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-label={moreOpen ? "Close more options" : "Open more options"}
          className={cn(
            "flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[10px] font-medium transition-colors",
            moreOpen || moreActive
              ? "text-palace-orange"
              : "text-warm-grey hover:text-bean-black"
          )}
        >
          <MoreHorizontal className="size-5" />
          More
        </button>
      </div>
    </nav>
  );
}
