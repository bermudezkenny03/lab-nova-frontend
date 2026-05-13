<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/10"
      >
        <svg
          class="fill-brand-500 dark:fill-brand-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208Z"
            fill=""
          />
        </svg>
      </div>
      <div class="mt-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Total Users</span>
        <h4 class="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ store.usersCount }}
        </h4>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-success-50 rounded-xl dark:bg-success-500/10"
      >
        <svg
          class="fill-success-500 dark:fill-success-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037Z"
            fill=""
          />
        </svg>
      </div>
      <div class="mt-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Total Equipment</span>
        <h4 class="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ store.equipmentCount }}
        </h4>
        <span class="text-xs text-success-500">{{ store.equipmentActive }} active</span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-warning-50 rounded-xl dark:bg-warning-500/10"
      >
        <svg
          class="fill-warning-500 dark:fill-warning-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM10.5 7.5C10.5 6.672 11.172 6 12 6C12.828 6 13.5 6.672 13.5 7.5V12.75C13.5 13.164 13.164 13.5 12.75 13.5H11.25C10.836 13.5 10.5 13.164 10.5 12.75V7.5ZM12 17.25C11.31 17.25 10.75 16.69 10.75 16C10.75 15.31 11.31 14.75 12 14.75C12.69 14.75 13.25 15.31 13.25 16C13.25 16.69 12.69 17.25 12 17.25Z"
            fill=""
          />
        </svg>
      </div>
      <div class="mt-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Reservations</span>
        <h4 class="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ store.reservationsCount }}
        </h4>
        <span class="text-xs text-warning-500">{{ store.reservationsPending }} pending</span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/10"
      >
        <svg
          class="fill-brand-500 dark:fill-brand-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.25 6C4.55964 6 4 6.55964 4 7.25V16.75C4 17.4404 4.55964 18 5.25 18H18.75C19.4404 18 20 17.4404 20 16.75V7.25C20 6.55964 19.4404 6 18.75 6H5.25ZM2.5 7.25C2.5 5.73122 3.73122 4.5 5.25 4.5H18.75C20.2688 4.5 21.5 5.73122 21.5 7.25V16.75C21.5 18.2688 20.2688 19.5 18.75 19.5H5.25C3.73122 19.5 2.5 18.2688 2.5 16.75V7.25ZM8.5 10.5C8.5 9.67157 9.17157 9 10 9H14C14.8284 9 15.5 9.67157 15.5 10.5C15.5 11.3284 14.8284 12 14 12H10C9.17157 12 8.5 11.3284 8.5 10.5Z"
            fill=""
          />
        </svg>
      </div>
      <div class="mt-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Reports</span>
        <h4 class="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ store.reportsCount }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

const store = useDashboardStore()
</script>
