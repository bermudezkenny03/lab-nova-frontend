import apiFetch from './apiService'
const API_URL = import.meta.env.VITE_API_URL

export const reportService = {
  async getReportRequests() {
    try {
      const response = await apiFetch(`${API_URL}/report-requests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getReportRequests')
      return await response.json()
    } catch (error) {
      console.error('Error in getReportRequests:', error)
      return { data: [] }
    }
  },

  async getReportRequestGeneralData() {
    try {
      const response = await apiFetch(`${API_URL}/report-requests/general-data`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getReportRequestGeneralData')
      return await response.json()
    } catch (error) {
      console.error('Error in getReportRequestGeneralData:', error)
      return { data: { types: [] } }
    }
  },

  async getReportRequest(id: number) {
    try {
      const response = await apiFetch(`${API_URL}/report-requests/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in getReportRequest')
      return await response.json()
    } catch (error) {
      console.error('Error in getReportRequest:', error)
      return null
    }
  },

  async createReportRequest(payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/report-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error creating report request')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createReportRequest:', error)
      throw error
    }
  },

  async deleteReportRequest(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/report-requests/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Error in deleteReportRequest')
      return await response.json()
    } catch (error) {
      console.error('Error in deleteReportRequest:', error)
      throw error
    }
  },

  async generateReport(id: number, format: string = 'csv') {
    try {
      const response = await apiFetch(`${API_URL}/report-requests/${id}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error generating report')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in generateReport:', error)
      throw error
    }
  },
}
