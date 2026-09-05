"use client";

import { MenuCard } from "./menu-card";
import type { MenuItem } from "@/types/menu";

interface MenuGridProps {
  items: MenuItem[];
  onViewDetails?: (item: MenuItem) => void;
  onAdd?: (item: MenuItem) => void;
}

export function MenuGrid({ items, onViewDetails, onAdd }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-heading text-lg font-semibold text-bean-black">
          No food found.
        </p>
        <p className="mt-1 text-sm text-warm-grey">
          Try searching for something else or browse our full menu.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onViewDetails={onViewDetails}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
