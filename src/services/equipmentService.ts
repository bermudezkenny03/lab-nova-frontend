import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL

export const equipmentService = {
  async getGeneralData() {
    try {
      const response = await apiFetch(`${API_URL}/equipments/general-data`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getGeneralData')
      return await response.json()
    } catch (error) {
      console.error('Error in getGeneralData:', error)
      return { categories: [], statuses: [] }
    }
  },

  async getEquipments() {
    try {
      const response = await apiFetch(`${API_URL}/equipments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getEquipments')
      return await response.json()
    } catch (error) {
      console.error('Error in getEquipments:', error)
      return []
    }
  },

  async getEquipment(id: number) {
    try {
      const response = await apiFetch(`${API_URL}/equipments/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getEquipment')
      return await response.json()
    } catch (error) {
      console.error('Error in getEquipment:', error)
      return null
    }
  },

  async createEquipment(formData: FormData) {
    try {
      const response = await apiFetch(`${API_URL}/equipments`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Error in createEquipment')
      return await response.json()
    } catch (error) {
      console.error('Error in createEquipment:', error)
      return null
    }
  },

  async updateEquipment(id: number, formData: FormData) {
    try {
      formData.append('_method', 'PUT')
      const response = await apiFetch(`${API_URL}/equipments/${id}`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Error in updateEquipment')
      return await response.json()
    } catch (error) {
      console.error('Error in updateEquipment:', error)
      return null
    }
  },

  async deleteEquipment(id: number) {
    try {
      const response = await apiFetch(`${API_URL}/equipments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in deleteEquipment')
      return await response.json()
    } catch (error) {
      console.error('Error in deleteEquipment:', error)
      return null
    }
  },
}
