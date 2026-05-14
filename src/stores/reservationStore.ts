import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reservationService } from '@/services/reservationService'
import type { Reservation } from '@/utils/interfaces'

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<Reservation[]>([])
  const loadingList = ref<boolean>(false)

  const fetchReservations = async (): Promise<void> => {
    try {
      loadingList.value = true
      const response = await reservationService.getReservations()
      reservations.value = response.data ?? []
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      loadingList.value = false
    }
  }

  const deleteReservation = async (id: number): Promise<boolean> => {
    try {
      const response = await reservationService.deleteReservation(id.toString())
      if (response) {
        reservations.value = reservations.value.filter((res) => res.id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting reservation:', error)
      return false
    }
  }

  const approveReservation = async (id: number): Promise<boolean> => {
    try {
      const response = await reservationService.approveReservation(id.toString())
      if (response) {
        reservations.value = reservations.value.map((res) =>
          res.id === id ? response.reservation : res
        )
        return true
      }
      return false
    } catch (error) {
      console.error('Error approving reservation:', error)
      return false
    }
  }

  const rejectReservation = async (id: number): Promise<boolean> => {
    try {
      const response = await reservationService.rejectReservation(id.toString())
      if (response) {
        reservations.value = reservations.value.map((res) =>
          res.id === id ? response.reservation : res
        )
        return true
      }
      return false
    } catch (error) {
      console.error('Error rejecting reservation:', error)
      return false
    }
  }

  const deleteMultipleReservations = async (ids: number[]): Promise<number> => {
    let successCount = 0
    for (const id of ids) {
      const result = await deleteReservation(id)
      if (result) successCount++
    }
    return successCount
  }

  return {
    reservations,
    loadingList,
    fetchReservations,
    deleteReservation,
    approveReservation,
    rejectReservation,
    deleteMultipleReservations,
  }
})
