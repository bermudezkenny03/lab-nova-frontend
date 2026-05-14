<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Report Requests">
        <ReportDataTable
          :reportRequests="reportStore.reportRequests"
          :loading="reportStore.loadingList"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ReportDataTable from '@/components/reports/ReportDatatable.vue'
import { useReportStore } from '@/stores/reportStore'

const currentPageTitle = ref('Report Requests')
const reportStore = useReportStore()

onMounted(async () => {
  await Promise.all([reportStore.fetchReportRequests(), reportStore.fetchReportTypes()])
})
</script>
