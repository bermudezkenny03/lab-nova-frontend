<template>
  <div>
    <form @submit.prevent>
      <div class="-mx-2.5 flex flex-wrap gap-y-5">
        <!-- Name -->
        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Name <span class="text-red-500">*</span>
          </label>

          <input
            v-model="name"
            type="text"
            placeholder="Enter category name"
            :class="[
              'dark:bg-dark-900 h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.name ? 'border-red-500' : 'border-gray-300',
            ]"
          />

          <span class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <!-- Status -->
        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Status <span class="text-red-500">*</span>
          </label>

          <div class="relative z-20 bg-transparent">
            <select
              v-model="status"
              :class="[
                'dark:bg-dark-900 z-20 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                errors.status ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option :value="true" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Active
              </option>
              <option :value="false" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Inactive
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

          <span class="text-red-500 text-sm">{{ errors.status }}</span>
        </div>

        <!-- Description -->
        <div class="w-full px-2.5">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Description
          </label>

          <textarea
            v-model="description"
            placeholder="Enter description"
            rows="6"
            :class="[
              'dark:bg-dark-900 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.description ? 'border-red-500' : 'border-gray-300',
            ]"
          ></textarea>

          <span class="text-red-500 text-sm">{{ errors.description }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { Category } from '@/utils/interfaces'

const props = defineProps({
  category: {
    type: Object as () => Category | null,
    default: null,
  },
})

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name must be less than 100 characters'),

  description: yup.string().nullable(),
  
  status: yup.boolean().required('Status is required'),
})

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.category?.id || null,
    name: props.category?.name || '',
    description: props.category?.description || '',
    status: props.category?.status !== undefined ? Boolean(props.category.status) : true,
  },
})

const { value: id } = useField<number | null>('id')
const { value: name } = useField<string>('name')
const { value: description } = useField<string | null>('description')
const { value: status } = useField<boolean>('status')

watch(
  () => props.category,
  (category) => {
    if (category) {
      id.value = category.id || null
      name.value = category.name || ''
      description.value = category.description || ''
      status.value = Boolean(category.status)
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
    name: name.value,
    description: description.value,
    status: status.value,
  }
}

defineExpose({
  validate: validateForm,
  getFormData,
  errors,
})
</script>