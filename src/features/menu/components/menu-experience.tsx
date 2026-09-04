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
  // Bumped on every open so the dialog mounts fresh (its own quantity /
  // side / protein / instructions) instead of inheriting a previous dish's.
  const [modalKey, setModalKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const {
    activeFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    setSearchQuery,
  } = useMenuFilter(menuItems)

  const addItem = useCartStore((s) => s.addItem)

  const openConfiguration = (item: MenuItem) => {
    if (!item.available) return
    setSelectedItem(item)
    setModalKey((key) => key + 1)
    setModalOpen(true)
  }

  // "Add" on a dish that can take a side/protein opens the configuration
  // dialog (the meal builder). Only plain dishes without a customization
  // slot are added straight to the cart.
  const handleAdd = (item: MenuItem) => {
    if (!item.available) return

    if (item.customization) {
      openConfiguration(item)
      return
    }

    addItem({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
    })
  }

  const handleViewDetails = (item: MenuItem) => {
    openConfiguration(item)
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
          onQuickAdd={handleAdd}
        />
      )}

      {selectedItem && (
        <ProductModal
          key={modalKey}
          open={modalOpen}
          onOpenChange={setModalOpen}
          item={selectedItem}
        />
      )}
    </>
  )
}
