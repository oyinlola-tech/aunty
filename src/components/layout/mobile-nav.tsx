"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";

const bottomLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
];

export function MobileNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const mounted = useMounted();
  const visibleCount = mounted ? totalItems : 0;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
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
                  <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-palace-orange text-[9px] font-bold text-white">
                    {visibleCount}
                  </span>
                )}
              </span>
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/about"
          className={cn(
            "flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[10px] font-medium transition-colors",
            pathname === "/about" || pathname === "/contact"
              ? "text-palace-orange"
              : "text-warm-grey hover:text-bean-black"
          )}
        >
          <MoreHorizontal className="size-5" />
          More
        </Link>
      </div>
    </nav>
  );
}
