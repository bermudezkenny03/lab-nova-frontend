import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL

// User service to handle all user-related API calls
export const userService = {
  async getUsers() {
    try {
      const response = await apiFetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error in getUsers')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getUsers:', error)
      return []
    }
  },

  // Fetch general data for users (e.g., roles, departments)
  async getGeneralData() {
    try {
      const response = await apiFetch(`${API_URL}/users/general-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error in getGeneralData')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getGeneralData:', error)
      return []
    }
  },

  // Create a new user with the provided payload
  async createUser(payload: object) {
    try {
      const response = await apiFetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error creating user')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createUser:', error)
      throw error
    }
  },

  // Fetch a user by their ID
  async getUserById(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error in getUserById')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getUserById:', error)
      return []
    }
  },

  // Update an existing user with the provided payload and ID
  async updateUser(payload: object, id: string) {
    try {
      const response = await apiFetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'Error updating user')
        ;(error as any).errors = data.errors || null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in updateUser:', error)
      throw error
    }
  },

  // Delete a user by their ID
  async deleteUser(id: string) {
    try {
      const response = await apiFetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error in deleteUser')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in deleteUser:', error)
      throw error
    }
  },
}
