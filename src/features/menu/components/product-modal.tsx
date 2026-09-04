"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { CartItem } from "@/types/cart"
import type { MenuItem } from "@/types/menu"
import { MealConfigurator } from "./meal-configurator"

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
  /** Present when the dialog is editing an existing configured cart line. */
  existing?: CartItem
}

export function ProductModal({
  open,
  onOpenChange,
  item,
  existing,
}: ProductModalProps) {
  const isMealBase =
    item.customization?.sides === true || item.customization?.proteins === true

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-2xl p-0 sm:max-w-xl">
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="relative flex aspect-video w-full overflow-hidden rounded-2xl bg-cream-deep">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <DialogTitle className="font-heading text-2xl font-bold text-balance text-bean-black">
              {item.name}
            </DialogTitle>

            <p className="leading-relaxed text-warm-grey">{item.description}</p>

            {isMealBase && (
              <p className="rounded-xl bg-cream p-3 text-sm text-warm-grey">
                Build your plate — add any number of sides and proteins, each
                with its own quantity. Everything optional.
              </p>
            )}

            {!item.available && (
              <div className="flex items-center gap-2 rounded-full bg-warm-grey px-3 py-2 text-sm font-semibold text-white">
                <span className="size-2 rounded-full bg-white" />
                Currently unavailable
              </div>
            )}
          </div>

          <MealConfigurator
            item={item}
            existing={existing}
            stickyBar="dialog"
            onAdded={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
