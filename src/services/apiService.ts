import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

// A wrapper around the native fetch function to include authentication token and handle unauthorized responses
async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const authStore = useAuthStore()
  if (authStore.token) {
    if (!init) {
      init = {}
    }
    if (!init.headers) {
      init.headers = {}
    }
    ;(init.headers as Record<string, string>)['Authorization'] = `Bearer ${authStore.token}`
  }

  const response = await fetch(input, init)

  if (response.status === 401) {
    authStore.clearAuthData()
    router.push({ name: 'Signin' })
  }

  return response
}

export default apiFetch
