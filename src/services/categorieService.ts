import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL

export const categorieService = {
  async getCategories() {
    try {
      const response = await apiFetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Error in getCategories')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getCategories:', error)
      return []
    }
  },

  async getCategory(id: number) {
    try {
      const response = await apiFetch(`${API_URL}/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Error in getCategory')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getCategory:', error)
      return null
    }
  },

  async createCategory(payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error creating category')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createCategory:', error)
      throw error
    }
  },

  async updateCategory(id: number, payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error updating category')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in updateCategory:', error)
      throw error
    }
  },

  async deleteCategory(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error in deleteCategory')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in deleteCategory:', error)
      throw error
    }
  },
}
