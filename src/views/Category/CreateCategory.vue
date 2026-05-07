<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Create category">
        <CategoryForm ref="categoryFormRef" />

        <div class="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="redirectToHome"
            class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            :disabled="submitting"
            type="button"
            @click="submitForm"
            class="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50"
          >
            {{ submitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import CategoryForm from '@/components/category/CategoryForm.vue'
import router from '@/router'
import { categorieService } from '@/services/categorieService'
import { useToastStore } from '@/stores/toastStore'
import type { CategoryPayload } from '@/utils/interfaces'

const currentPageTitle = ref('Create category')
const categoryFormRef = ref<InstanceType<typeof CategoryForm> | null>(null)
const submitting = ref(false)

const toast = useToastStore()

const submitForm = async () => {
  if (!categoryFormRef.value) return

  const validation = await categoryFormRef.value.validate()

  if (!validation.valid) {
    toast.warning('Please check the form fields.')
    return
  }

  try {
    submitting.value = true

    const categoryData = categoryFormRef.value.getFormData()

    const payload: CategoryPayload = {
      name: categoryData.name,
      description: categoryData.description,
      status: categoryData.status,
    }

    const response = await categorieService.createCategory(payload)

    toast.success(response.message || 'Category created successfully!')

    redirectToHome()
  } catch (error: any) {
    let errorMsg = 'Error creating category'

    if (error?.errors) {
      const validationMessages = Object.values(error.errors).flat().join('\n')
      errorMsg = error.message ? `${error.message}\n${validationMessages}` : validationMessages
    } else if (error?.message) {
      errorMsg = error.message
    }

    toast.error(errorMsg)
    console.error('Error creating category:', error)
  } finally {
    submitting.value = false
  }
}

const redirectToHome = () => {
  router.push({ name: 'Categories' })
}
</script>
