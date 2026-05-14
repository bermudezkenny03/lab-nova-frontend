<template>
  <div class="overflow-hidden">
    <div
      class="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-200 rounded-b-none rounded-xl dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <Button
          v-if="selectedItems.length > 0"
          size="sm"
          variant="danger-outline"
          :startIcon="TrashIcon"
          @click="openDeleteMultipleModal"
        >
          Delete ({{ selectedItems.length }})
        </Button>
        <span class="text-gray-500 dark:text-gray-400">Show</span>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="perPage"
            class="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{ 'text-gray-500 dark:text-gray-400': perPage !== '' }"
          >
            <option value="10" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">10</option>
            <option value="8"  class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">8</option>
            <option value="5"  class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">5</option>
          </select>
          <span class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2 dark:text-gray-400">
            <svg class="stroke-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165" stroke="" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <span class="text-gray-500 dark:text-gray-400">entries</span>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <button class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" fill=""/>
            </svg>
          </button>
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
        </div>
        <Button @click="redirectToCreate" size="sm" variant="primary" :startIcon="PlusIcon">
          New
        </Button>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto">
      <div v-if="props.loading" class="w-full min-w-full flex justify-center">
        <Spinner />
      </div>
      <table v-if="!props.loading" class="w-full min-w-full">
        <thead>
          <tr>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <div class="flex items-center justify-between w-full cursor-pointer" @click="sortBy('id')">
                <div class="flex items-center gap-3">
                  <div>
                    <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                      <span class="relative">
                        <input type="checkbox" class="sr-only" v-model="selectAll" @change="toggleSelectAll" />
                        <span
                          :class="selectAll ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                          class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]"
                        >
                          <span :class="selectAll ? '' : 'opacity-0'">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">ID</p>
                </div>
                <span class="flex flex-col gap-0.5"><SortIcon /></span>
              </div>
            </th>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <div class="flex items-center justify-between w-full cursor-pointer" @click="sortBy('report_request_type.name')">
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Type</p>
                <span class="flex flex-col gap-0.5"><SortIcon /></span>
              </div>
            </th>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <div class="flex items-center justify-between w-full cursor-pointer" @click="sortBy('user.name')">
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">User</p>
                <span class="flex flex-col gap-0.5"><SortIcon /></span>
              </div>
            </th>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <div class="flex items-center justify-between w-full cursor-pointer" @click="sortBy('start_date')">
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Date Range</p>
                <span class="flex flex-col gap-0.5"><SortIcon /></span>
              </div>
            </th>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <div class="flex items-center justify-between w-full cursor-pointer" @click="sortBy('report_request_status.name')">
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Status</p>
                <span class="flex flex-col gap-0.5"><SortIcon /></span>
              </div>
            </th>
            <th class="px-4 py-3 text-left border border-gray-100 dark:border-gray-800">
              <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="request in paginatedData"
            :key="request.id"
            :class="{ 'bg-gray-50 dark:bg-gray-900': request.selected }"
          >
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <div class="flex gap-3">
                <div class="mt-1">
                  <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                    <span class="relative">
                      <input type="checkbox" class="sr-only" v-model="request.selected" @change="updateSelectAll" />
                      <span
                        :class="request.selected ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                        class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]"
                      >
                        <span :class="request.selected ? '' : 'opacity-0'">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <p class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ request.id }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ request.report_request_type?.name }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ request.user?.name }} {{ request.user?.last_name }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">
                {{ formatDateShort(request.start_date) }} - {{ formatDateShort(request.end_date) }}
              </p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <span
                :class="{
                  'bg-warning-50 dark:bg-warning-500/15 text-warning-700 dark:text-warning-500':
                    request.report_request_status?.slug === 'pending' || request.report_request_status?.slug === 'processing',
                  'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500':
                    request.report_request_status?.slug === 'completed',
                  'bg-error-50 dark:bg-error-500/15 text-error-700 dark:text-error-500':
                    request.report_request_status?.slug === 'failed',
                }"
                class="rounded-full px-2 py-0.5 text-theme-xs font-medium"
              >
                {{ request.report_request_status?.name }}
              </span>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-gray-800">
              <div class="flex items-center w-full gap-2">
                <Tooltip
                  v-if="request.report_request_status?.slug === 'pending' || request.report_request_status?.slug === 'failed'"
                  content="Generate Report"
                  position="top"
                >
                  <button
                    @click="generateReportItem(request)"
                    class="text-gray-500 hover:text-success-500 dark:text-gray-400 dark:hover:text-success-500"
                  >
                    <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 2.5C5.80558 2.5 2 6.30558 2 11C2 15.6944 5.80558 19.5 10.5 19.5C15.1944 19.5 19 15.6944 19 11C19 6.30558 15.1944 2.5 10.5 2.5ZM10.5 4C12.0469 4 13.4766 4.50781 14.625 5.375L10.5 9.5L6.375 5.375C7.52344 4.50781 8.95312 4 10.5 4ZM4.625 6.875L8.75 11L4.625 15.125C4.21875 13.9766 4 12.75 4 11.5C4 10.25 4.21875 9.02344 4.625 7.875L4.625 6.875ZM16.375 6.875C16.7812 8.02344 17 9.25 17 10.5C17 11.75 16.7812 12.9766 16.375 14.125L12.25 10L16.375 5.875L16.375 6.875ZM10.5 12.5L14.625 16.625C13.4766 17.4922 12.0469 18 10.5 18C8.95312 18 7.52344 17.4922 6.375 16.625L10.5 12.5Z" fill=""/>
                    </svg>
                  </button>
                </Tooltip>
                
                 <a
                  v-if="request.reports && request.reports.length > 0"
                  :href="request.reports[0].file_path"
                  target="_blank"
                  class="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
                >
                  <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3.5C10.5 2.94772 10.9477 2.5 11.5 2.5H15.5C16.0523 2.5 16.5 2.94772 16.5 3.5V7.5C16.5 8.05228 16.0523 8.5 15.5 8.5H11.5C10.9477 8.5 10.5 8.05228 10.5 7.5V3.5ZM12 4V7H15V4H12ZM4.5 6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H8.5C9.05228 5.5 9.5 5.94772 9.5 6.5V17.5C9.5 18.0523 9.05228 18.5 8.5 18.5H5.5C4.94772 18.5 4.5 18.0523 4.5 17.5V6.5ZM6 7V17H8V7H6ZM11.5 10.5C10.9477 10.5 10.5 10.9477 10.5 11.5V17.5C10.5 18.0523 10.9477 18.5 11.5 18.5H15.5C16.0523 18.5 16.5 18.0523 16.5 17.5V11.5C16.5 10.9477 16.0523 10.5 15.5 10.5H11.5ZM12 12H15V17H12V12Z" fill=""/>
                  </svg>
                </a>
                <Tooltip content="Delete" position="top">
                  <button
                    @click="openDeleteModal(request)"
                    class="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                  >
                    <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.04142 4.29199C7.04142 3.04935 8.04878 2.04199 9.29142 2.04199H11.7081C12.9507 2.04199 13.9581 3.04935 13.9581 4.29199V4.54199H16.1252H17.166C17.5802 4.54199 17.916 4.87778 17.916 5.29199C17.916 5.70621 17.5802 6.04199 17.166 6.04199H16.8752V8.74687V13.7469V16.7087C16.8752 17.9513 15.8678 18.9587 14.6252 18.9587H6.37516C5.13252 18.9587 4.12516 17.9513 4.12516 16.7087V13.7469V8.74687V6.04199H3.8335C3.41928 6.04199 3.0835 5.70621 3.0835 5.29199C3.0835 4.87778 3.41928 4.54199 3.8335 4.54199H4.87516H7.04142V4.29199ZM15.3752 13.7469V8.74687V6.04199H13.9581H13.2081H7.79142H7.04142H5.62516V8.74687V13.7469V16.7087C5.62516 17.1229 5.96095 17.4587 6.37516 17.4587H14.6252C15.0394 17.4587 15.3752 17.1229 15.3752 16.7087V13.7469ZM8.54142 4.54199H12.4581V4.29199C12.4581 3.87778 12.1223 3.54199 11.7081 3.54199H9.29142C8.87721 3.54199 8.54142 3.87778 8.54142 4.29199V4.54199ZM8.8335 8.50033C9.24771 8.50033 9.5835 8.83611 9.5835 9.25033V14.2503C9.5835 14.6645 9.24771 15.0003 8.8335 15.0003C8.41928 15.0003 8.0835 14.6645 8.0835 14.2503V9.25033C8.0835 8.83611 8.41928 8.50033 8.8335 8.50033ZM12.9168 9.25033C12.9168 8.83611 12.581 8.50033 12.1668 8.50033C11.7526 8.50033 11.4168 8.83611 11.4168 9.25033V14.2503C11.4168 14.6645 11.7526 15.0003 12.1668 15.0003C12.581 15.0003 12.9168 14.6645 12.9168 14.2503V9.25033Z" fill=""/>
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-gray-800">
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <p class="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
          Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
        </p>
        <div class="flex items-center justify-center gap-0.5 pt-3 xl:justify-end xl:pt-0">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Previous
          </button>
          <button
            @click="goToPage(1)"
            :class="currentPage === 1 ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >1</button>
          <span v-if="currentPage > 3" class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">...</span>
          <button
            v-for="page in pagesAroundCurrent"
            :key="page"
            @click="goToPage(page)"
            :class="currentPage === page ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >{{ page }}</button>
          <span v-if="currentPage < totalPages - 2" class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">...</span>
          <button
            v-if="totalPages > 1"
            @click="goToPage(totalPages)"
            :class="currentPage === totalPages ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >{{ totalPages }}</button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <ModalWarning
    v-if="isWarningModalOpen"
    :message="warningMessage"
    @close="closeWarningModal"
    @delete="selectedItems.length > 0 ? deleteMultipleItems() : deleteItem()"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTable } from '@/utils/useTable'
import Button from '@/components/ui/Button.vue'
import { useToastStore } from '@/stores/toastStore'
import { useCommonStore } from '@/stores/commonStore'
import { useReportStore } from '@/stores/reportStore'
import Spinner from '@/components/common/Spinner.vue'
import { SortIcon, PlusIcon, TrashIcon } from '@/icons'
import Tooltip from '@/components/ui/Tooltip.vue'
import ModalWarning from '@/components/common/ModalWarning.vue'
import type { ReportRequest } from '@/utils/interfaces'
import { formatDateShort } from '@/utils/dateUtils'

const props = defineProps<{
  reportRequests: ReportRequest[]
  loading: boolean
}>()

const {
  search, currentPage, perPage, selectAll,
  paginatedData, totalEntries, startEntry, endEntry,
  totalPages, pagesAroundCurrent,
  goToPage, nextPage, prevPage, sortBy,
  toggleSelectAll, updateSelectAll, selectedItems, updateData,
} = useTable([], {
  searchFields: ['id', 'report_request_type.name', 'user.name', 'start_date', 'end_date', 'report_request_status.name'],
  defaultSortColumn: 'id',
  defaultSortDirection: 'desc',
  perPage: 10,
})

const router        = useRouter()
const toastStore    = useToastStore()
const commonStore   = useCommonStore()
const reportStore   = useReportStore()

const warningMessage        = ref('')
const selectedItemToDelete  = ref<any>(null)
const isWarningModalOpen    = ref(false)

const redirectToCreate = () => router.push({ name: 'createReportRequest' })

const openDeleteModal = (request: any) => {
  selectedItemToDelete.value = request
  isWarningModalOpen.value   = true
  warningMessage.value       = `Are you sure you want to delete report request #${request.id}?`
}

const openDeleteMultipleModal = () => {
  isWarningModalOpen.value = true
  warningMessage.value     = `Are you sure you want to delete these ${selectedItems.value.length} report requests?`
}

const closeWarningModal = () => { isWarningModalOpen.value = false }

const deleteMultipleItems = async () => {
  try {
    commonStore.deleting    = true
    const itemsToDelete     = selectedItems.value
    const idsToDelete       = itemsToDelete.map((item: any) => item.id)
    const successCount      = await reportStore.deleteMultipleReportRequests(idsToDelete)
    closeWarningModal()
    if (successCount === itemsToDelete.length) {
      toastStore.success('All report requests deleted successfully!')
    } else if (successCount > 0) {
      toastStore.error(`${successCount} out of ${itemsToDelete.length} report requests deleted successfully.`)
    } else {
      toastStore.error('Failed to delete report requests. Please try again.')
    }
  } catch (error) {
    console.error('Error deleting report requests:', error)
  } finally {
    commonStore.deleting = false
  }
}

const deleteItem = async () => {
  try {
    commonStore.deleting = true
    const success        = await reportStore.deleteReportRequest(selectedItemToDelete.value.id)
    closeWarningModal()
    if (success) {
      toastStore.success('Report request deleted successfully!')
    } else {
      toastStore.error('Failed to delete report request. Please try again.')
    }
  } catch (error) {
    console.error('Error deleting report request:', error)
  } finally {
    commonStore.deleting = false
  }
}

const generateReportItem = async (request: any) => {
  try {
    commonStore.deleting     = true
    const existingFile       = request.reports?.[0]?.file_name ?? ''
    const format             = existingFile.endsWith('.xlsx')
      ? 'xlsx'
      : existingFile.endsWith('.pdf')
        ? 'pdf'
        : 'csv'

    await reportStore.generateReportRequest(request.id, format)
    toastStore.success('Report generated successfully!')
    await reportStore.fetchReportRequests()
  } catch (error: any) {
    toastStore.error(error.message || 'Failed to generate report.')
  } finally {
    commonStore.deleting = false
  }
}

watch(
  () => props.reportRequests,
  (newRequests) => { updateData(newRequests) },
  { immediate: true },
)
</script>