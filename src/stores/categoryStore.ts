import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categorieService } from '@/services/categorieService'
import type { Category } from '@/utils/interfaces'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loadingList = ref<boolean>(false)

  const fetchCategories = async (): Promise<void> => {
    try {
      loadingList.value = true
      const response = await categorieService.getCategories()
      categories.value = response.data ?? []
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      loadingList.value = false
    }
  }

  const deleteCategory = async (id: number): Promise<boolean> => {
    try {
      const response = await categorieService.deleteCategory(id.toString())
      if (response) {
        categories.value = categories.value.filter((cat) => cat.id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting category:', error)
      return false
    }
  }

  const deleteMultipleCategories = async (ids: number[]): Promise<number> => {
    let successCount = 0
    for (const id of ids) {
      const result = await deleteCategory(id)
      if (result) successCount++
    }
    return successCount
  }

  return {
    categories,
    loadingList,
    fetchCategories,
    deleteCategory,
    deleteMultipleCategories,
  }
})
