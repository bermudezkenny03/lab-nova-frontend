import apiFetch from '@/services/apiService'

const API_URL = import.meta.env.VITE_API_URL

// Auth service to handle all authentication-related API calls
export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Login failed')
    }

    const data = await response.json()
    return data
  },

  // Logout the user by invalidating the token
  async logout(): Promise<void> {
    const response = await apiFetch(`${API_URL}/logout`, {
      method: 'POST',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Logout failed')
    }
  },

  async getMe() {
    const response = await apiFetch(`${API_URL}/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch user')
    }

    return await response.json()
  },
}
