import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await apiFetch(`${API_URL}/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getDashboardData')
      return await response.json()
    } catch (error) {
      console.error('Error in getDashboardData:', error)
      return null
    }
  },
}
