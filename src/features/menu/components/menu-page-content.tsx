"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MenuFilters } from "@/features/menu/components/menu-filters";
import { MenuSearch } from "@/features/menu/components/menu-search";
import { MenuGrid } from "@/features/menu/components/menu-grid";
import { ProductModal } from "@/features/menu/components/product-modal";
import { useMenuFilter } from "@/features/menu/hooks/use-menu-filter";
import { useCartStore } from "@/features/cart/store/cart-store";
import { menuItems } from "@/data/menu";
import { categories } from "@/data/categories";
import type { MenuItem } from "@/types/menu";
import type { MenuFilter } from "@/types/common";

export default function MenuPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const validCategory: MenuFilter =
    categoryParam === "sides" || categoryParam === "proteins" || categoryParam === "beans" || categoryParam === "combos"
      ? categoryParam
      : "all";

  const {
    activeFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    setSearchQuery,
  } = useMenuFilter(menuItems, validCategory);
  const [guidanceItem, setGuidanceItem] = useState<MenuItem | null>(null);

  const handleAdd = (item: MenuItem) => {
    if (!item.available) return

    if (item.categoryId === "proteins") {
      setGuidanceItem(item)
      return
    }

    if (item.customization?.sides || item.customization?.proteins) {
      return
    }

    const addItem = useCartStore.getState().addItem
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

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
        <MenuGrid
          items={filteredItems}
          onAdd={handleAdd}
        />
      </SectionContainer>

      {guidanceItem && (
        <ProductModal
          open
          item={guidanceItem}
          onClose={() => {
            setGuidanceItem(null)
          }}
          existing={undefined}
          onAdded={() => {
            setGuidanceItem(null)
          }}
        />
      )}
    </>
  );
}
