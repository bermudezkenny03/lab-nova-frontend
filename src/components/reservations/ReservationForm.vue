<template>
  <div>
    <form @submit.prevent>
      <div class="-mx-2.5 flex flex-wrap gap-y-5">
        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            User <span class="text-red-500">*</span>
          </label>
          <div class="relative z-20 bg-transparent">
            <select
              v-model="user_id"
              :disabled="!props.reservation && authStore.user?.role?.name?.toLowerCase() === 'student'"
              :class="[
                'dark:bg-dark-900 z-20 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.user_id ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option :value="null" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Select User
              </option>
              <option
                v-for="user in users"
                :key="user.id"
                :value="user.id"
                class="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                {{ user.name }} {{ user.last_name }}
              </option>
            </select>
            <span
              class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
            >
              <svg
                class="stroke-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <span class="text-red-500 text-sm">{{ errors.user_id }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Equipment <span class="text-red-500">*</span>
          </label>
          <div class="relative z-20 bg-transparent">
            <select
              v-model="equipment_id"
              :class="[
                'dark:bg-dark-900 z-20 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.equipment_id ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option :value="null" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Select Equipment
              </option>
              <option
                v-for="eq in equipments"
                :key="eq.id"
                :value="eq.id"
                class="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                {{ eq.name }}
              </option>
            </select>
            <span
              class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
            >
              <svg
                class="stroke-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <span class="text-red-500 text-sm">{{ errors.equipment_id }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Start Time <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <flat-pickr
              v-model="start_time"
              :config="flatpickrTimeConfig"
              :class="[
                'dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.start_time ? 'border-red-500' : 'border-gray-300',
              ]"
              placeholder="Select start date and time"
            />
          </div>
          <span class="text-red-500 text-sm">{{ errors.start_time }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            End Time <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <flat-pickr
              v-model="end_time"
              :config="flatpickrTimeConfig"
              :class="[
                'dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.end_time ? 'border-red-500' : 'border-gray-300',
              ]"
              placeholder="Select end date and time"
            />
          </div>
          <span class="text-red-500 text-sm">{{ errors.end_time }}</span>
        </div>

        <div class="w-full px-2.5">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Notes
          </label>
          <textarea
            v-model="notes"
            placeholder="Enter notes"
            rows="4"
            :class="[
              'dark:bg-dark-900 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.notes ? 'border-red-500' : 'border-gray-300',
            ]"
          ></textarea>
          <span class="text-red-500 text-sm">{{ errors.notes }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { reservationService } from '@/services/reservationService'
import { useAuthStore } from '@/stores/authStore'
import type { Reservation } from '@/utils/interfaces'
import { flatpickrTimeConfig, toApiDateTimeString, parseAPIDate } from '@/utils/dateUtils'

const authStore = useAuthStore()

const props = defineProps({
  reservation: {
    type: Object as () => Reservation | null,
    default: null,
  },
})

const users = ref<any[]>([])
const equipments = ref<any[]>([])

const loadGeneralData = async () => {
  try {
    const response = await reservationService.getGeneralData()
    if (response.data) {
      users.value = response.data.users || []
      equipments.value = response.data.equipments || []
    }
  } catch (error) {
    console.error('Error loading general data:', error)
  }
}

onMounted(async () => {
  await loadGeneralData()
  if (!props.reservation && authStore.user) {
    const isStudent = authStore.user.role?.name?.toLowerCase() === 'student'
    if (isStudent) {
      user_id.value = Number(authStore.user.id)
    }
  }
})

const schema = yup.object({
  user_id: yup.number().required('User is required').nullable(),
  equipment_id: yup.number().required('Equipment is required').nullable(),
  start_time: yup.string().required('Start time is required'),
  end_time: yup.string().required('End time is required'),
  notes: yup.string().nullable(),
})

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.reservation?.id || null,
    user_id: props.reservation?.user_id || null,
    equipment_id: props.reservation?.equipment_id || null,
    start_time: props.reservation?.start_time ? parseAPIDate(props.reservation.start_time) : null,
    end_time: props.reservation?.end_time ? parseAPIDate(props.reservation.end_time) : null,
    notes: props.reservation?.notes || '',
  },
})

const { value: id } = useField<number | null>('id')
const { value: user_id } = useField<number | null>('user_id')
const { value: equipment_id } = useField<number | null>('equipment_id')
const { value: start_time } = useField<Date | string | null>('start_time')
const { value: end_time } = useField<Date | string | null>('end_time')
const { value: notes } = useField<string | null>('notes')

watch(
  () => props.reservation,
  (reservation) => {
    if (reservation) {
      id.value = reservation.id || null
      user_id.value = reservation.user_id || null
      equipment_id.value = reservation.equipment_id || null
      start_time.value = reservation.start_time ? parseAPIDate(reservation.start_time) : null
      end_time.value = reservation.end_time ? parseAPIDate(reservation.end_time) : null
      notes.value = reservation.notes || ''
    }
  },
  { immediate: true },
)

const validateForm = async () => {
  const result = await validate()
  return result
}

const getFormData = () => {
  return {
    id: id.value,
    user_id: user_id.value,
    equipment_id: equipment_id.value,
    start_time: toApiDateTimeString(start_time.value) || '',
    end_time: toApiDateTimeString(end_time.value) || '',
    notes: notes.value,
  }
}

defineExpose({
  validate: validateForm,
  getFormData,
  errors,
})
</script>
