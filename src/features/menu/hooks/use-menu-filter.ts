"use client"

import { useState, useMemo, useCallback } from "react"
import type { MenuItem } from "@/types/menu"
import type { MenuFilter } from "@/types/common"

export function useMenuFilter(
  items: MenuItem[],
  defaultFilter: MenuFilter = "all"
) {
  const [activeFilter, setActiveFilter] = useState<MenuFilter>(defaultFilter)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    let result = items

    if (activeFilter !== "all") {
      result = result.filter((item) => item.categoryId === activeFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [items, activeFilter, searchQuery])

  const handleFilterChange = useCallback((filter: MenuFilter) => {
    setActiveFilter(filter)
    setSearchQuery("")
  }, [])

  return {
    activeFilter,
    searchQuery,
    filteredItems,
    setActiveFilter,
    setSearchQuery,
    handleFilterChange,
  }
}
