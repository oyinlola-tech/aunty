"use client"

import { useState } from "react"
import { menuItems } from "@/data/menu"
import { categories } from "@/data/categories"
import { MenuGrid } from "./menu-grid"
import { MenuFilters } from "./menu-filters"
import { MenuSearch } from "./menu-search"
import { ProductModal } from "./product-modal"
import { useMenuFilter } from "../hooks/use-menu-filter"
import type { MenuItem } from "@/types/menu"
import { useCartStore } from "@/features/cart/store/cart-store"
import { Button } from "@/components/ui/button"

export function MenuExperience() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const {
    activeFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    setSearchQuery,
  } = useMenuFilter(menuItems)

  const addItem = useCartStore((s) => s.addItem)

  const handleQuickAdd = (item: MenuItem) => {
    if (!item.available) return

    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  const handleViewDetails = (item: MenuItem) => {
    if (!item.available) return

    setSelectedItem(item)
    setModalOpen(true)
  }

  return (
    <>
      <MenuSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search dishes..."
        className="max-w-md"
      />

      <MenuFilters
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        className="flex-wrap"
      />

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-cream-deep">
            <svg
              className="size-8 text-warm-grey"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-bean-black">
            No dishes found
          </h3>
          <p className="text-warm-grey">
            Try another search or explore our full menu.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              handleFilterChange("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <MenuGrid
          items={filteredItems}
          onOpenDetails={handleViewDetails}
          onQuickAdd={handleQuickAdd}
        />
      )}

      {selectedItem && (
        <ProductModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          item={selectedItem}
        />
      )}
    </>
  )
}
