<template>
  <div
    class="relative flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-all dark:border-gray-700 dark:bg-gray-900"
    :class="[
      isDragOver ? 'border-brand-500 bg-brand-50 dark:border-brand-800 dark:bg-brand-500/5' : '',
      error ? 'border-red-500' : '',
    ]"
    @click="triggerFileInput"
    @drop.prevent="handleDrop"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :multiple="multiple"
      :accept="accept"
      @change="handleFileSelect"
    />

    <div v-if="allImages.length === 0" class="flex flex-col items-center justify-center text-center py-10">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800"
      >
        <svg
          class="h-6 w-6 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
          />
        </svg>
      </div>
      <p class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        <span class="text-brand-500">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs text-gray-400 dark:text-gray-500">
        {{ hint }}
      </p>
    </div>

    <div v-else class="w-full p-4">
      <div class="mb-3 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ allImages.length }} image{{ allImages.length > 1 ? 's' : '' }}
        </p>
        <button
          type="button"
          @click.stop="triggerFileInput"
          class="text-xs font-medium text-brand-500 hover:text-brand-600"
        >
          + Add more
        </button>
      </div>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(item, index) in allImages"
          :key="item.id"
          class="group relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
        >
          <img
            :src="item.url"
            :alt="item.name"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <button
              type="button"
              @click.stop="removeImage(index)"
              class="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <span
            v-if="item.isNew"
            class="absolute bottom-0 left-0 right-0 bg-brand-500 px-1 py-0.5 text-[10px] font-medium text-white text-center"
          >
            New
          </span>
        </div>
      </div>
    </div>

    <p v-if="error" class="absolute bottom-2 left-4 text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface ImageItem {
  id: string
  url: string
  name: string
  isNew: boolean
  file?: File
}

interface ExistingImage {
  id: number
  url: string
  image_name?: string
}

const props = defineProps({
  modelValue: {
    type: Array as () => File[],
    default: () => [],
  },
  existingImages: {
    type: Array as () => ExistingImage[],
    default: () => [],
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxFiles: {
    type: Number,
    default: 10,
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },
  hint: {
    type: String,
    default: 'PNG, JPG, WEBP up to 10MB',
  },
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  'remove-existing': [id: number]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const newFiles = ref<ImageItem[]>([])
const isDragOver = ref(false)
const error = ref<string | null>(null)

const allImages = computed<ImageItem[]>(() => {
  const existing = props.existingImages.map((img) => ({
    id: `existing-${img.id}`,
    url: img.url,
    name: img.image_name || 'Image',
    isNew: false,
  }))
  return [...existing, ...newFiles.value]
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  processFiles(files)
  input.value = ''
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer?.files || [])
  processFiles(files)
}

const processFiles = (files: File[]) => {
  error.value = null

  const imageFiles = files.filter((f) => f.type.startsWith('image/'))

  if (imageFiles.length === 0) {
    error.value = 'Only image files are allowed'
    return
  }

  if (allImages.value.length + imageFiles.length > props.maxFiles) {
    error.value = `Maximum ${props.maxFiles} files allowed`
    return
  }

  for (const file of imageFiles) {
    if (file.size > props.maxSize) {
      error.value = `${file.name} exceeds the maximum size of ${formatSize(props.maxSize)}`
      continue
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      newFiles.value.push({
        id: `new-${Date.now()}-${Math.random()}`,
        url: e.target?.result as string,
        name: file.name,
        isNew: true,
        file,
      })
      emitFiles()
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = (index: number) => {
  const item = allImages.value[index]
  if (!item.isNew && item.id.startsWith('existing-')) {
    const existingId = parseInt(item.id.replace('existing-', ''))
    emit('remove-existing', existingId)
  } else {
    newFiles.value = newFiles.value.filter((f) => f.id !== item.id)
    emitFiles()
  }
}

const emitFiles = () => {
  emit('update:modelValue', newFiles.value.map((f) => f.file!).filter(Boolean))
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

defineExpose({
  clearFiles: () => {
    newFiles.value = []
    emitFiles()
  },
  getFiles: () => newFiles.value.map((f) => f.file!).filter(Boolean),
  error,
})
</script>
