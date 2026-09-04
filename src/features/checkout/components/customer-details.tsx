"use client"

import { forwardRef } from "react"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomerDetailsProps {
  name: string
  phone: string
  onNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  nameError?: string
  phoneError?: string
}

export const CustomerDetails = forwardRef<
  HTMLDivElement,
  CustomerDetailsProps
>(function CustomerDetails({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  nameError,
  phoneError,
}, ref) {
  return (
    <div ref={ref} className="flex flex-col gap-4">
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
          <Label className="text-sm font-medium text-bean-black">
            Full Name
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Chioma Okafor"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <p id="name-error" className="mt-1 text-xs text-rich-red">
              {nameError}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-bean-black">
            Phone Number
          </Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="08012345678"
            className="mt-1.5 h-12 rounded-xl bg-cream-deep"
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
})
