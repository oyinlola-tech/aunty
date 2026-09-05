"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  subject?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  subject,
}: QuantitySelectorProps) {
  function handleDecrease() {
    if (value > min) onChange(value - 1);
  }

  function handleIncrease() {
    onChange(value + 1);
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label={subject ? `Decrease ${subject} quantity` : "Decrease quantity"}
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-[2rem] text-center text-lg font-semibold text-bean-black">
        {value}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        aria-label={subject ? `Increase ${subject} quantity` : "Increase quantity"}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
