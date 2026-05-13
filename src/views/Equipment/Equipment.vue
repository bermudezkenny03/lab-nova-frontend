<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Equipment Details">
        <EquipmentDataTable
          :equipments="equipmentStore.equipments"
          :loading="equipmentStore.loadingList"
          @refresh="equipmentStore.fetchEquipments()"
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
import EquipmentDataTable from '@/components/equipment/EquipmentDataTable.vue'
import { useEquipmentStore } from '@/stores/equipmentStore'

const currentPageTitle = ref('Equipments')
const equipmentStore = useEquipmentStore()

onMounted(async () => {
  await equipmentStore.fetchEquipments()
})
</script>
