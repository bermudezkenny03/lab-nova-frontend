<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  >
    <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Activity</h3>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Type</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Title</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Time</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in store.recentActivity"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="py-3 whitespace-nowrap">
              <span
                :class="{
                  'rounded-full px-2 py-0.5 text-theme-xs font-medium': true,
                  'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-500':
                    item.type === 'reservation',
                  'bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-500':
                    item.type === 'report',
                }"
              >
                {{ item.type === 'reservation' ? 'Reservation' : 'Report' }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-700 text-theme-sm dark:text-white/90">{{ item.title }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ item.user }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span
                :class="{
                  'rounded-full px-2 py-0.5 text-theme-xs font-medium': true,
                  'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500':
                    item.status === 'approved' || item.status === 'completed',
                  'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500':
                    item.status === 'pending',
                  'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500':
                    item.status === 'rejected',
                }"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-xs dark:text-gray-400">{{ timeAgo(item.created_at) }}</p>
            </td>
          </tr>
          <tr v-if="store.recentActivity.length === 0">
            <td colspan="5" class="py-8 text-center text-gray-400 dark:text-gray-500">
              No recent activity
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'
import { timeAgo } from '@/utils/dateUtils'

const store = useDashboardStore()
</script>
