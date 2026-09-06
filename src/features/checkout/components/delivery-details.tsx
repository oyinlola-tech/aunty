"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface DeliveryDetailsProps {
  areaField: UseFormRegisterReturn<"area">;
  addressField: UseFormRegisterReturn<"address">;
  directionsField: UseFormRegisterReturn<"directions">;
  areaError?: string;
  addressError?: string;
}

export function DeliveryDetails({
  areaField,
  addressField,
  directionsField,
  areaError,
  addressError,
}: DeliveryDetailsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-semibold text-bean-black">
        Delivery Details
      </h3>
      <div>
        <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-bean-black">
          Area
        </label>
        <Input
          id="area"
          placeholder="e.g. GRA, Trans-Amadi"
          {...areaField}
          aria-invalid={!!areaError}
        />
        {areaError && (
          <p className="mt-1 text-xs text-rich-red">{areaError}</p>
        )}
      </div>
      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-bean-black">
          Full Address
        </label>
        <Input
          id="address"
          placeholder="Street name, house number..."
          {...addressField}
          aria-invalid={!!addressError}
        />
        {addressError && (
          <p className="mt-1 text-xs text-rich-red">{addressError}</p>
        )}
      </div>
      <div>
        <label htmlFor="directions" className="mb-1.5 block text-sm font-medium text-bean-black">
          Nearest Landmark (Optional)
        </label>
        <Input
          id="directions"
          placeholder="e.g. Near the junction"
          {...directionsField}
        />
      </div>
    </div>
  );
}
