import { defineStore } from 'pinia'
import { ref } from 'vue'
import { equipmentService } from '@/services/equipmentService'
import type {
  CategoryOption,
  EquipmentStatusOption,
  EquipmentGeneralData,
  Equipment,
} from '@/utils/interfaces'

export const useEquipmentStore = defineStore('equipment', () => {
  const equipments = ref<Equipment[]>([])
  const categories = ref<CategoryOption[]>([])
  const statuses = ref<EquipmentStatusOption[]>([])
  const loadingGeneral = ref<boolean>(false)
  const loadingList = ref<boolean>(false)

  const fetchEquipments = async (): Promise<void> => {
    try {
      loadingList.value = true
      const response = await equipmentService.getEquipments()
      equipments.value = response.data ?? []
    } catch (error) {
      console.error('Error fetching equipments:', error)
    } finally {
      loadingList.value = false
    }
  }

  const deleteEquipment = async (id: number): Promise<boolean> => {
    try {
      const response = await equipmentService.deleteEquipment(id)
      if (response) {
        equipments.value = equipments.value.filter((eq) => eq.id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting equipment:', error)
      return false
    }
  }

  const deleteMultipleEquipments = async (ids: number[]): Promise<number> => {
    let successCount = 0
    for (const id of ids) {
      const result = await deleteEquipment(id)
      if (result) successCount++
    }
    return successCount
  }

  const fetchGeneralData = async (): Promise<void> => {
    try {
      loadingGeneral.value = true
      const response: EquipmentGeneralData = await equipmentService.getGeneralData()
      categories.value = response.categories ?? []
      statuses.value = response.statuses ?? []
    } catch (error) {
      console.error('Error fetching general data:', error)
    } finally {
      loadingGeneral.value = false
    }
  }

  return {
    equipments,
    categories,
    statuses,
    loadingGeneral,
    loadingList,
    fetchEquipments,
    deleteEquipment,
    deleteMultipleEquipments,
    fetchGeneralData,
  }
})
