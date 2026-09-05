"use client";

import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types/menu";
import type { MenuFilter } from "@/types/common";

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeFilter: MenuFilter;
  onFilterChange: (filter: MenuFilter) => void;
  className?: string;
}

export function MenuFilters({
  categories,
  activeFilter,
  onFilterChange,
  className,
}: MenuFiltersProps) {
  const allFilters: { id: MenuFilter; name: string }[] = [
    { id: "all", name: "All" },
    ...categories.map((c) => ({ id: c.slug as MenuFilter, name: c.name })),
  ];

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2 scrollbar-none", className)}>
      {allFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors",
            activeFilter === filter.id
              ? "bg-bean-black text-white"
              : "bg-cream-deep text-warm-grey hover:bg-doodle"
          )}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}
