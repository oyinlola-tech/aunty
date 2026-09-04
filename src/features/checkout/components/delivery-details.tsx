import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormRegisterReturn } from "react-hook-form"

interface DeliveryDetailsProps {
  areaField: UseFormRegisterReturn
  addressField: UseFormRegisterReturn
  directionsField: UseFormRegisterReturn
  areaError?: string
  addressError?: string
}

export function DeliveryDetails({
  areaField,
  addressField,
  directionsField,
  areaError,
  addressError,
}: DeliveryDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
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
          <Label htmlFor="area" className="text-sm font-medium text-bean-black">
            Area / Location
          </Label>
          <Input
            type="text"
            id="area"
            {...areaField}
            placeholder="GRA Phase 1"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-invalid={areaError ? true : undefined}
            aria-describedby={areaError ? "area-error" : undefined}
          />
          {areaError && (
            <p id="area-error" className="mt-1 text-xs text-rich-red">
              {areaError}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="address" className="text-sm font-medium text-bean-black">
            Full Address
          </Label>
          <Input
            type="text"
            id="address"
            {...addressField}
            placeholder="123 Example Street"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-invalid={addressError ? true : undefined}
            aria-describedby={addressError ? "address-error" : undefined}
          />
          {addressError && (
            <p id="address-error" className="mt-1 text-xs text-rich-red">
              {addressError}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="directions"
            className="text-sm font-medium text-bean-black"
          >
            Landmark (optional)
          </Label>
          <Input
            type="text"
            id="directions"
            {...directionsField}
            placeholder="Near Example Junction"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
          />
        </div>
      </div>
    </div>
  )
}
