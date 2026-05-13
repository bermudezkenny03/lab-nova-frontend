<template>
  <div>
    <form @submit.prevent>
      <div class="-mx-2.5 flex flex-wrap gap-y-5">
        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter equipment name"
            :class="[
              'dark:bg-dark-900 h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.name ? 'border-red-500' : 'border-gray-300',
            ]"
          />
          <span class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Category
          </label>
          <div class="relative z-20">
            <select
              v-model="category_id"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              :class="[
                errors.category_id ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option value="" disabled>Select Category</option>
              <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
                class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {{ cat.name }}
              </option>
            </select>
            <span
              class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
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
          <span class="text-red-500 text-sm">{{ errors.category_id }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Status <span class="text-red-500">*</span>
          </label>
          <div class="relative z-20">
            <select
              v-model="equipment_status_id"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              :class="[
                errors.equipment_status_id ? 'border-red-500' : 'border-gray-300',
              ]"
            >
              <option value="" disabled>Select Status</option>
              <option
                v-for="status in equipmentStatuses"
                :key="status.id"
                :value="status.id"
                class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {{ status.name }}
              </option>
            </select>
            <span
              class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
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
          <span class="text-red-500 text-sm">{{ errors.equipment_status_id }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Stock
          </label>
          <input
            v-model="stock"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            :class="[
              'dark:bg-dark-900 h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.stock ? 'border-red-500' : 'border-gray-300',
            ]"
          />
          <span class="text-red-500 text-sm">{{ errors.stock }}</span>
        </div>

        <div class="w-full px-2.5 xl:w-1/2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Active
          </label>
          <div class="flex items-center h-11">
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="is_active" type="checkbox" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-brand-500/10 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-500"
              ></div>
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-400">
                {{ is_active ? 'Yes' : 'No' }}
              </span>
            </label>
          </div>
        </div>

        <div class="w-full px-2.5">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Description
          </label>
          <textarea
            v-model="description"
            placeholder="Enter description"
            rows="4"
            :class="[
              'dark:bg-dark-900 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
              errors.description ? 'border-red-500' : 'border-gray-300',
            ]"
          ></textarea>
          <span class="text-red-500 text-sm">{{ errors.description }}</span>
        </div>

        <div class="w-full px-2.5">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Images <span v-if="!isEditMode" class="text-red-500">*</span>
          </label>
          <ImageUploader
            ref="imageUploaderRef"
            v-model="imageFiles"
            :existing-images="existingImages"
            accept="image/jpg,image/jpeg,image/png,image/webp"
            hint="PNG, JPG, WEBP up to 10MB"
            @remove-existing="handleRemoveExisting"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import ImageUploader from '@/components/forms/FormElements/ImageUploader.vue'
import type { Equipment, CategoryOption, EquipmentStatusOption } from '@/utils/interfaces'

const props = defineProps({
  equipment: {
    type: Object as () => Equipment | null,
    default: null,
  },
  categories: {
    type: Array as () => CategoryOption[],
    default: () => [],
  },
  equipmentStatuses: {
    type: Array as () => EquipmentStatusOption[],
    default: () => [],
  },
})

const isEditMode = !!props.equipment

const schema = yup.object({
  name: yup.string().required('Name is required').max(150, 'Name must be less than 150 characters'),
  category_id: yup.number().nullable(),
  equipment_status_id: yup.number().nullable().required('Status is required'),
  stock: yup
    .number()
    .nullable()
    .min(0, 'Stock must be 0 or more')
    .integer('Stock must be a whole number'),
  is_active: yup.boolean(),
  description: yup.string().nullable(),
})

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.equipment?.id ?? null,
    name: props.equipment?.name ?? '',
    category_id: props.equipment?.category_id ?? null,
    equipment_status_id: props.equipment?.equipment_status_id ?? null,
    stock: props.equipment?.stock ?? null,
    is_active: props.equipment?.is_active !== undefined ? props.equipment.is_active : true,
    description: props.equipment?.description ?? '',
  },
})

const { value: id } = useField<number | null>('id')
const { value: name } = useField<string>('name')
const { value: category_id } = useField<number | null>('category_id')
const { value: equipment_status_id } = useField<number | null>('equipment_status_id')
const { value: stock } = useField<number | null>('stock')
const { value: is_active } = useField<boolean>('is_active')
const { value: description } = useField<string | null>('description')

const imageUploaderRef = ref<InstanceType<typeof ImageUploader> | null>(null)
const imageFiles = ref<File[]>([])
const existingImages = ref<any[]>([])
const removedImageIds = ref<number[]>([])

const handleRemoveExisting = (id: number) => {
  removedImageIds.value.push(id)
  existingImages.value = existingImages.value.filter((img) => img.id !== id)
}

watch(
  () => props.equipment,
  (eq) => {
    if (eq) {
      id.value = eq.id ?? null
      name.value = eq.name ?? ''
      category_id.value = eq.category_id ?? null
      equipment_status_id.value = eq.equipment_status_id ?? null
      stock.value = eq.stock ?? null
      is_active.value = eq.is_active ?? true
      description.value = eq.description ?? ''
      imageFiles.value = []
      existingImages.value = eq.images?.map((img) => ({
        id: img.id,
        url: img.url,
        image_name: img.image_name,
      })) || []
      removedImageIds.value = []
      imageUploaderRef.value?.clearFiles()
    }
  },
  { immediate: true },
)

const validateForm = async () => {
  const result = await validate()

  const files = imageUploaderRef.value?.getFiles() || []
  const hasImages = files.length > 0 || existingImages.value.length > 0
  
  if (!isEditMode && files.length === 0) {
    return { valid: false }
  }

  if (isEditMode && !hasImages && removedImageIds.value.length === 0) {
    return { valid: false }
  }

  return result
}

const getFormData = (): FormData => {
  const formData = new FormData()

  formData.append('name', name.value ?? '')

  if (category_id.value !== null && category_id.value !== undefined) {
    formData.append('category_id', String(category_id.value))
  }

  if (equipment_status_id.value !== null && equipment_status_id.value !== undefined) {
    formData.append('equipment_status_id', String(equipment_status_id.value))
  }

  if (stock.value !== null && stock.value !== undefined) {
    formData.append('stock', String(stock.value))
  }

  formData.append('is_active', is_active.value ? '1' : '0')

  if (description.value) {
    formData.append('description', description.value)
  }

  const files = imageUploaderRef.value?.getFiles() || []
  files.forEach((file) => {
    formData.append('equipment_images[]', file)
  })

  removedImageIds.value.forEach((id) => {
    formData.append('removed_images[]', String(id))
  })

  return formData
}

defineExpose({
  validate: validateForm,
  getFormData,
  errors,
})
</script>
