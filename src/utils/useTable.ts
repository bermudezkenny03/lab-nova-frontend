import { ref, computed } from 'vue'

export function useTable(initialData = [], options = {}) {
  const data: any = ref(initialData)

  const search = ref('')
  const searchFields = options.searchFields || ['name']

  const sortColumn = ref(options.defaultSortColumn || 'name')
  const sortDirection = ref(options.defaultSortDirection || 'asc')

  const currentPage = ref(1)
  const perPage = ref(options.perPage || 10)

  const selectAll = ref(false)

  const filteredData = computed(() => {
    if (!search.value) return data.value

    const searchLower = search.value.toLowerCase()

    if (options.customFilter && typeof options.customFilter === 'function') {
      return options.customFilter(data.value, searchLower)
    }

    return data.value.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field]
        return fieldValue && String(fieldValue).toLowerCase().includes(searchLower)
      })
    })
  })

  const sortedAndFilteredData = computed(() => {
    const dataToSort = filteredData.value

    if (options.customSort && typeof options.customSort === 'function') {
      return options.customSort(dataToSort, sortColumn.value, sortDirection.value)
    }

    return [...dataToSort].sort((a, b) => {
      const modifier = sortDirection.value === 'asc' ? 1 : -1

      const aValue = a[sortColumn.value]
      const bValue = b[sortColumn.value]

      if (aValue === undefined || aValue === null) return 1 * modifier
      if (bValue === undefined || bValue === null) return -1 * modifier

      if (aValue < bValue) return -1 * modifier
      if (aValue > bValue) return 1 * modifier
      return 0
    })
  })

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return sortedAndFilteredData.value.slice(start, end)
  })

  const totalEntries = computed(() => filteredData.value.length)

  const startEntry = computed(() => {
    if (totalEntries.value === 0) return 0
    return (currentPage.value - 1) * perPage.value + 1
  })

  const endEntry = computed(() => {
    const end = currentPage.value * perPage.value
    return end > totalEntries.value ? totalEntries.value : end
  })

  const totalPages = computed(() => Math.ceil(totalEntries.value / perPage.value))

  const pagesAroundCurrent = computed(() => {
    const pages = []
    const startPage = Math.max(2, currentPage.value - 2)
    const endPage = Math.min(totalPages.value - 1, currentPage.value + 2)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  })

  const selectedItems = computed(() => {
    return data.value.filter((item) => item.selected)
  })

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const sortBy = (column) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortDirection.value = 'asc'
      sortColumn.value = column
    }
  }

  const toggleSelectAll = () => {
    data.value.forEach((item) => (item.selected = selectAll.value))
  }

  const updateSelectAll = () => {
    selectAll.value = data.value.length > 0 && data.value.every((item) => item.selected)
  }

  const updateData = (newData) => {
    data.value = newData
    currentPage.value = 1
  }

  const resetFilters = () => {
    search.value = ''
    currentPage.value = 1
    sortColumn.value = options.defaultSortColumn || 'name'
    sortDirection.value = options.defaultSortDirection || 'asc'
  }

  return {
    // State
    data,
    search,
    sortColumn,
    sortDirection,
    currentPage,
    perPage,
    selectAll,

    // Computed
    filteredData,
    sortedAndFilteredData,
    paginatedData,
    totalEntries,
    startEntry,
    endEntry,
    totalPages,
    pagesAroundCurrent,
    selectedItems,

    // Methods
    goToPage,
    nextPage,
    prevPage,
    sortBy,
    toggleSelectAll,
    updateSelectAll,
    updateData,
    resetFilters,
  }
}
