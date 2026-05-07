<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Category Details">
        <CategoryDataTable />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import CategoryDataTable from '@/components/category/CategoryDataTable.vue'

const currentPageTitle = ref('Categories')
</script>
