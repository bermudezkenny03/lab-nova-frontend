<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Reservations">
        <ReservationDataTable
          :reservations="reservationStore.reservations"
          :loading="reservationStore.loadingList"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ReservationDataTable from '@/components/reservations/ReservationDatatable.vue'
import { useReservationStore } from '@/stores/reservationStore'

const currentPageTitle = ref('Reservations')
const reservationStore = useReservationStore()

onMounted(async () => {
  await reservationStore.fetchReservations()
})
</script>
