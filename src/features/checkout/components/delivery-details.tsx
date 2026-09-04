"use client"

import { forwardRef } from "react"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DeliveryDetailsProps {
  area: string
  address: string
  directions: string
  onAreaChange: (value: string) => void
  onAddressChange: (value: string) => void
  onDirectionsChange: (value: string) => void
  areaError?: string
  addressError?: string
}

export const DeliveryDetails = forwardRef<
  HTMLDivElement,
  DeliveryDetailsProps
>(function DeliveryDetails({
  area,
  address,
  directions,
  onAreaChange,
  onAddressChange,
  onDirectionsChange,
  areaError,
  addressError,
}, ref) {
  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-espresso">
          <MapPin className="size-5 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-bean-black">
            Delivery Details
          </h3>
          <p className="text-sm text-warm-grey">
            Where should we deliver your food?
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-cream p-4">
        <div>
          <Label className="text-sm font-medium text-bean-black">
            Area / Location
          </Label>
          <Input
            type="text"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            placeholder="GRA Phase 1"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-describedby={areaError ? "area-error" : undefined}
          />
          {areaError && (
            <p id="area-error" className="mt-1 text-xs text-rich-red">
              {areaError}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-bean-black">
            Full Address
          </Label>
          <Input
            type="text"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="123 Example Street"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-describedby={addressError ? "address-error" : undefined}
          />
          {addressError && (
            <p id="address-error" className="mt-1 text-xs text-rich-red">
              {addressError}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-bean-black">
            Landmark (optional)
          </Label>
          <Input
            type="text"
            value={directions}
            onChange={(e) => onDirectionsChange(e.target.value)}
            placeholder="Near Example Junction"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
          />
        </div>
      </div>
    </div>
  )
})
