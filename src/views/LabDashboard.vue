<template>
  <admin-layout>
    <div v-if="store.loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
    </div>

    <div v-else class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <dashboard-metrics />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <reservation-trend-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <equipment-by-category-chart />
      </div>

      <div class="col-span-12">
        <recent-activity />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DashboardMetrics from '@/components/dashboard/DashboardMetrics.vue'
import ReservationTrendChart from '@/components/dashboard/ReservationTrendChart.vue'
import EquipmentByCategoryChart from '@/components/dashboard/EquipmentByCategoryChart.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const store = useDashboardStore()

store.fetchDashboardData()
</script>
