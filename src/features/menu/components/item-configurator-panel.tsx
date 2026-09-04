"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { MenuItem } from "@/types/menu"
import { MealConfigurator } from "./meal-configurator"

interface ItemConfiguratorPanelProps {
  item: MenuItem
}

export function ItemConfiguratorPanel({ item }: ItemConfiguratorPanelProps) {
  const [justAdded, setJustAdded] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <MealConfigurator
        item={item}
        stickyBar="page"
        onAdded={() => setJustAdded(true)}
      />

      {justAdded && (
        <div className="flex items-start gap-3 rounded-xl bg-muted-green/15 p-4">
          <Check
            className="mt-0.5 size-5 flex-shrink-0 text-muted-green"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-relaxed font-medium text-bean-black">
              Added to your cart.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-espresso/90"
              >
                View Cart
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold text-bean-black transition-colors hover:border-palace-orange hover:text-palace-orange"
              >
                Add another dish
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
