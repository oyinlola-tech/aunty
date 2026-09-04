import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormRegisterReturn } from "react-hook-form"

interface CustomerDetailsProps {
  nameField: UseFormRegisterReturn
  phoneField: UseFormRegisterReturn
  nameError?: string
  phoneError?: string
}

export function CustomerDetails({
  nameField,
  phoneField,
  nameError,
  phoneError,
}: CustomerDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-palace-orange">
          <User className="size-5 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-bean-black">
            Your Details
          </h3>
          <p className="text-sm text-warm-grey">
            We need this to confirm your order
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-cream p-4">
        <div>
          <Label htmlFor="customerName" className="text-sm font-medium text-bean-black">
            Full Name
          </Label>
          <Input
            type="text"
            id="customerName"
            {...nameField}
            placeholder="Chioma Okafor"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <p id="name-error" className="mt-1 text-xs text-rich-red">
              {nameError}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-bean-black">
            Phone Number
          </Label>
          <Input
            type="tel"
            id="phoneNumber"
            {...phoneField}
            placeholder="08012345678"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={phoneError ? "phone-error" : undefined}
          />
          {phoneError && (
            <p id="phone-error" className="mt-1 text-xs text-rich-red">
              {phoneError}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
