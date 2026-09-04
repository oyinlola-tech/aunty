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
import type { MenuFilter } from "@/types/common"
import { useCartStore } from "@/features/cart/store/cart-store"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface MenuExperienceProps {
  /** Optional category filter from ?category= (beans|sides|proteins). */
  initialCategory?: string
  /** Optional dish slug from ?item= to open directly in the dialog. */
  initialItemSlug?: string
}

const VALID_FILTERS: MenuFilter[] = ["all", "beans", "sides", "proteins"]

export function MenuExperience({
  initialCategory,
  initialItemSlug,
}: MenuExperienceProps) {
  const defaultFilter = VALID_FILTERS.includes(initialCategory as MenuFilter)
    ? (initialCategory as MenuFilter)
    : "all"

  // A ?item= deep link auto-opens that dish's configuration dialog on mount.
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(() =>
    initialItemSlug
      ? (menuItems.find(
          (menuItem) =>
            menuItem.slug === initialItemSlug && menuItem.available
        ) ?? null)
      : null
  )
  const [modalKey, setModalKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(selectedItem !== null)

  const {
    activeFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    setSearchQuery,
  } = useMenuFilter(menuItems, defaultFilter)

  const addItem = useCartStore((s) => s.addItem)

  // "Add" on a meal base (beans) opens the configuration dialog so the
  // customer can add sides/proteins first. Plain dishes are added straight
  // to the cart, and every card links through to its own /menu/[slug] page.
  const handleAdd = (item: MenuItem) => {
    if (!item.available) return

    const isMealBase =
      item.customization?.sides === true || item.customization?.proteins === true

    if (isMealBase) {
      setSelectedItem(item)
      setModalKey((key) => key + 1)
      setModalOpen(true)
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
            <Search className="size-8 text-warm-grey" aria-hidden="true" />
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
        <MenuGrid items={filteredItems} onAdd={handleAdd} />
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
