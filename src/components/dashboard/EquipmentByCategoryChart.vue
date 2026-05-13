<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Equipment by Category</h3>
    </div>

    <div class="flex flex-col items-center gap-6 mt-4 lg:flex-row">
      <div class="w-full max-w-[280px]">
        <VueApexCharts type="donut" height="280" :options="chartOptions" :series="series" />
      </div>

      <div class="flex-1 space-y-3">
        <div
          v-for="(item, index) in store.equipmentByCategory"
          :key="index"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <span
              class="block w-3 h-3 rounded-full"
              :style="{ backgroundColor: colors[index % colors.length] }"
            ></span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ item.name }}</span>
          </div>
          <span class="text-sm font-medium text-gray-800 dark:text-white/90">{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useDashboardStore } from '@/stores/dashboardStore'

const store = useDashboardStore()

const colors = ['#465FFF', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

const series = computed(() => store.equipmentByCategory.map((item) => item.count))

const chartOptions = computed(() => ({
  colors: colors,
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
  },
  labels: store.equipmentByCategory.map((item) => item.name),
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            color: '#1D2939',
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 600,
            color: '#1D2939',
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '14px',
            color: '#667085',
            formatter: () =>
              String(store.equipmentByCategory.reduce((sum, item) => sum + item.count, 0)),
          },
        },
      },
    },
  },
}))
</script>
