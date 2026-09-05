"use client";

import { Input } from "@/components/ui/input";

interface CustomerDetailsProps {
  nameField: any;
  phoneField: any;
  nameError?: string;
  phoneError?: string;
}

export function CustomerDetails({
  nameField,
  phoneField,
  nameError,
  phoneError,
}: CustomerDetailsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-semibold text-bean-black">
        Customer Details
      </h3>
      <div>
        <label htmlFor="customerName" className="mb-1.5 block text-sm font-medium text-bean-black">
          Full Name
        </label>
        <Input
          id="customerName"
          placeholder="John Doe"
          {...nameField}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p className="mt-1 text-xs text-rich-red">{nameError}</p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-bean-black">
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="080XXXXXXXX"
          {...phoneField}
          aria-invalid={!!phoneError}
        />
        {phoneError && (
          <p className="mt-1 text-xs text-rich-red">{phoneError}</p>
        )}
      </div>
    </div>
  );
}
