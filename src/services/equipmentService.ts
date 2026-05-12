import apiFetch from './apiService'

const API_URL = import.meta.env.VITE_API_URL


export const equipmentService = {
    async getEquipments() {
        try {
            const response = await apiFetch(`${API_URL}/equipments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error('Error in getEquipments')
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error in getEquipments:', error)
            return []
        }
    },
}
