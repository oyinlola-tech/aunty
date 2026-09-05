"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MenuFilters } from "@/features/menu/components/menu-filters";
import { MenuSearch } from "@/features/menu/components/menu-search";
import { MenuGrid } from "@/features/menu/components/menu-grid";
import { ProductModal } from "@/features/menu/components/product-modal";
import { useMenuFilter } from "@/features/menu/hooks/use-menu-filter";
import { menuItems } from "@/data/menu";
import { categories } from "@/data/categories";
import type { MenuItem } from "@/types/menu";

export default function MenuPageContent() {
  const {
    activeFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    setSearchQuery,
  } = useMenuFilter(menuItems);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <SectionContainer className="pt-8 pb-4">
        <SectionHeading
          eyebrow="OUR MENU"
          title="Everything delicious, all in one place."
        />
      </SectionContainer>

      <SectionContainer className="py-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <MenuSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search dishes..."
              className="max-w-md"
            />
          </div>
          <MenuFilters
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </SectionContainer>

      <SectionContainer>
        <MenuGrid items={filteredItems} onViewDetails={setSelectedItem} />
      </SectionContainer>

      {selectedItem && (
        <ProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
