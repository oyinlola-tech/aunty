"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MenuSearch({
  value,
  onChange,
  placeholder = "Search food...",
  className,
}: MenuSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-warm-grey" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-full border border-border bg-ivory pl-10 pr-10 text-sm text-bean-black placeholder:text-warm-grey focus:border-palace-orange focus:outline-none focus:ring-2 focus:ring-palace-orange/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey hover:text-bean-black"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
