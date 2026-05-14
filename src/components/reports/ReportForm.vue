<template>
  <div>
    <form @submit.prevent>
      <div class="-mx-2.5 flex flex-wrap gap-y-5">

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Type <span class="text-red-500">*</span>
          </label>
          <div class="relative z-20 bg-transparent">
            <select
              v-model="report_request_type_id"
              :class="[
                'dark:bg-dark-900 z-20 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.report_request_type_id ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option :value="null" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">Select Type</option>
              <option
                v-for="type in reportTypes"
                :key="type.id"
                :value="type.id"
                class="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                {{ type.name }}
              </option>
            </select>
            <span class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400">
              <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <span class="text-red-500 text-sm">{{ errors.report_request_type_id }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Format <span class="text-red-500">*</span>
          </label>
          <div class="relative z-20 bg-transparent">
            <select
              v-model="format"
              :class="[
                'dark:bg-dark-900 z-20 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.format ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option value="csv"  class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">CSV</option>
              <option value="xlsx" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">Excel (.xlsx)</option>
              <option value="pdf"  class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">PDF</option>
            </select>
            <span class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400">
              <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <span class="text-red-500 text-sm">{{ errors.format }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Start Date <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <flat-pickr
              v-model="start_date"
              :config="flatpickrConfig"
              :class="[
                'dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.start_date ? 'border-red-500' : 'border-gray-300',
              ]"
              placeholder="Select start date"
            />
          </div>
          <span class="text-red-500 text-sm">{{ errors.start_date }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            End Date <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <flat-pickr
              v-model="end_date"
              :config="flatpickrConfig"
              :class="[
                'dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.end_date ? 'border-red-500' : 'border-gray-300',
              ]"
              placeholder="Select end date"
            />
          </div>
          <span class="text-red-500 text-sm">{{ errors.end_date }}</span>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { ReportRequest, ReportRequestType } from '@/utils/interfaces'
import { useReportStore } from '@/stores/reportStore'
import { flatpickrConfig, toApiDateString } from '@/utils/dateUtils'

const props = defineProps({
  reportRequest: {
    type: Object as () => ReportRequest | null,
    default: null,
  },
})

const reportStore = useReportStore()
const reportTypes = ref<ReportRequestType[]>([])

onMounted(async () => {
  if (reportStore.reportTypes.length === 0) {
    await reportStore.fetchReportTypes()
  }
  reportTypes.value = reportStore.reportTypes
})

const schema = yup.object({
  report_request_type_id: yup.number().required('Type is required').nullable(),
  format: yup.string().required('Format is required'),
  start_date: yup.string().required('Start date is required').nullable(),
  end_date: yup.string().required('End date is required').nullable(),
})

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.reportRequest?.id || null,
    report_request_type_id: props.reportRequest?.report_request_type_id || null,
    format: 'csv',
    start_date: props.reportRequest?.start_date || '',
    end_date: props.reportRequest?.end_date || '',
  },
})

const { value: id }                     = useField<number | null>('id')
const { value: report_request_type_id } = useField<number | null>('report_request_type_id')
const { value: format }                 = useField<string>('format')
const { value: start_date }             = useField<string | null>('start_date')
const { value: end_date }               = useField<string | null>('end_date')

watch(
  () => props.reportRequest,
  (request) => {
    if (request) {
      id.value                     = request.id || null
      report_request_type_id.value = request.report_request_type_id || null
      start_date.value             = request.start_date || ''
      end_date.value               = request.end_date || ''
    }
  },
  { immediate: true },
)

const validateForm = async () => await validate()

const getFormData = () => ({
  id: id.value,
  report_request_type_id: report_request_type_id.value,
  format: format.value,
  start_date: toApiDateString(start_date.value),
  end_date: toApiDateString(end_date.value),
})

defineExpose({ validate: validateForm, getFormData, errors })
</script>