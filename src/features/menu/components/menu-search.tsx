"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface MenuSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MenuSearch({
  value,
  onChange,
  placeholder = "Search dishes...",
  className,
}: MenuSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-warm-grey" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-12 rounded-xl bg-cream-deep border-border/50"
      />
    </div>
  )
}
