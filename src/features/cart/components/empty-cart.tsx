"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-cream-deep">
        <ShoppingBag className="size-8 text-warm-grey" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-bean-black">
        Your plate is looking a little empty.
      </h3>
      <p className="mt-1 text-sm text-warm-grey">Let&apos;s fix that.</p>
      <Link href="/menu" className="mt-6">
        <Button variant="default">Explore Menu</Button>
      </Link>
    </div>
  );
}
