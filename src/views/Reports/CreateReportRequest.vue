<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Create report request">
        <ReportForm ref="reportFormRef" />

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
import ReportForm from '@/components/reports/ReportForm.vue'
import router from '@/router'
import { reportService } from '@/services/reportService'
import { useReportStore } from '@/stores/reportStore'
import { useToastStore } from '@/stores/toastStore'
import { useAuthStore } from '@/stores/authStore'
import type { ReportRequestPayload } from '@/utils/interfaces'

const currentPageTitle = ref('Create report request')
const reportFormRef = ref<InstanceType<typeof ReportForm> | null>(null)
const submitting = ref(false)

const toast = useToastStore()
const reportStore = useReportStore()
const authStore = useAuthStore()

const submitForm = async () => {
  if (!reportFormRef.value) return

  const validation = await reportFormRef.value.validate()

  if (!validation.valid) {
    toast.warning('Please check the form fields.')
    return
  }

  try {
    submitting.value = true

    const reportData = reportFormRef.value.getFormData()

    const payload: ReportRequestPayload = {
      user_id: Number(authStore.user?.id),
      report_request_type_id: reportData.report_request_type_id!,
      start_date: reportData.start_date!,
      end_date: reportData.end_date!,
    }

    const response = await reportService.createReportRequest(payload)

    toast.success(response.message || 'Report request created successfully!')
    await reportStore.fetchReportRequests()
    redirectToHome()
  } catch (error: any) {
    let errorMsg = 'Error creating report request'

    if (error?.errors) {
      const validationMessages = Object.values(error.errors).flat().join('\n')
      errorMsg = error.message ? `${error.message}\n${validationMessages}` : validationMessages
    } else if (error?.message) {
      errorMsg = error.message
    }

    toast.error(errorMsg)
    console.error('Error creating report request:', error)
  } finally {
    submitting.value = false
  }
}

const redirectToHome = () => {
  router.push({ name: 'ReportRequests' })
}
</script>
