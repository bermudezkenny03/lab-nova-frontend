<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div v-if="!isReady" class="flex justify-center items-center h-[calc(100vh-200px)]">
      <Spinner />
    </div>

    <div v-if="isReady" class="space-y-5 sm:space-y-6">
      <ComponentCard title="Edit reservation">
        <ReservationForm ref="reservationFormRef" :reservation="reservation" />

        <div class="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="redirectToHome"
            class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            :disabled="submitting"
            type="button"
            @click="submitForm"
            class="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50"
          >
            {{ submitting ? 'Saving...' : 'Update' }}
          </button>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ReservationForm from '@/components/reservations/ReservationForm.vue'
import Spinner from '@/components/common/Spinner.vue'
import router from '@/router'
import { reservationService } from '@/services/reservationService'
import { useReservationStore } from '@/stores/reservationStore'
import { useToastStore } from '@/stores/toastStore'
import type { Reservation, ReservationPayload } from '@/utils/interfaces'

const route = useRoute()
const toast = useToastStore()
const reservationStore = useReservationStore()

const currentPageTitle = ref('Edit reservation')
const reservationFormRef = ref<InstanceType<typeof ReservationForm> | null>(null)

const reservation = ref<Reservation | null>(null)
const isReady = ref(false)
const submitting = ref(false)

const getReservation = async () => {
  try {
    isReady.value = false

    const id = Number(route.params.id)

    if (!id) {
      toast.error('Invalid reservation ID')
      redirectToHome()
      return
    }

    const response = await reservationService.getReservation(id)

    reservation.value = response.reservation
    currentPageTitle.value = `Edit reservation #${response.reservation.id}`
  } catch (error: any) {
    let errorMsg = 'Error loading reservation'

    if (error?.message) {
      errorMsg = error.message
    }

    toast.error(errorMsg)
    console.error('Error loading reservation:', error)

    redirectToHome()
  } finally {
    isReady.value = true
  }
}

const submitForm = async () => {
  if (!reservationFormRef.value || !reservation.value) return

  const validation = await reservationFormRef.value.validate()

  if (!validation.valid) {
    toast.warning('Please check the form fields.')
    return
  }

  try {
    submitting.value = true

    const reservationData = reservationFormRef.value.getFormData()

    const payload: ReservationPayload = {
      user_id: reservationData.user_id!,
      equipment_id: reservationData.equipment_id!,
      start_time: reservationData.start_time,
      end_time: reservationData.end_time,
      notes: reservationData.notes,
    }

    const response = await reservationService.updateReservation(reservation.value.id, payload)

    toast.success(response.message || 'Reservation updated successfully!')
    await reservationStore.fetchReservations()
    redirectToHome()
  } catch (error: any) {
    let errorMsg = 'Error updating reservation'

    if (error?.errors) {
      const validationMessages = Object.values(error.errors).flat().join('\n')
      errorMsg = error.message ? `${error.message}\n${validationMessages}` : validationMessages
    } else if (error?.message) {
      errorMsg = error.message
    }

    toast.error(errorMsg)
    console.error('Error updating reservation:', error)
  } finally {
    submitting.value = false
  }
}

const redirectToHome = () => {
  router.push({ name: 'Reservations' })
}

onMounted(async () => {
  await getReservation()
})
</script>
