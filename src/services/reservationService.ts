import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL

export const reservationService = {
  async getReservations() {
    try {
      const response = await apiFetch(`${API_URL}/reservations`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getReservations')
      return await response.json()
    } catch (error) {
      console.error('Error in getReservations:', error)
      return { data: [] }
    }
  },

  async getReservation(id: number) {
    try {
      const response = await apiFetch(`${API_URL}/reservations/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getReservation')
      return await response.json()
    } catch (error) {
      console.error('Error in getReservation:', error)
      return null
    }
  },

  async getGeneralData() {
    try {
      const response = await apiFetch(`${API_URL}/reservations/general-data`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getGeneralData')
      return await response.json()
    } catch (error) {
      console.error('Error in getGeneralData:', error)
      return { data: { users: [], equipments: [], statuses: [] } }
    }
  },

  async createReservation(payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error creating reservation')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createReservation:', error)
      throw error
    }
  },

  async updateReservation(id: number, payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error updating reservation')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in updateReservation:', error)
      throw error
    }
  },

  async deleteReservation(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in deleteReservation')
      return await response.json()
    } catch (error) {
      console.error('Error in deleteReservation:', error)
      throw error
    }
  },

  async approveReservation(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/reservations/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error approving reservation')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in approveReservation:', error)
      throw error
    }
  },

  async rejectReservation(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/reservations/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error rejecting reservation')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in rejectReservation:', error)
      throw error
    }
  },
}
