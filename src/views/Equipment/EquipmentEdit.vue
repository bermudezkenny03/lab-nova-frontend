<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div v-if="!isReady" class="flex justify-center items-center h-[calc(100vh-200px)]">
      <Spinner />
    </div>

    <div v-if="isReady" class="space-y-5 sm:space-y-6">
      <ComponentCard title="Edit equipment">
        <EquipmentForm
          ref="equipmentFormRef"
          :equipment="equipment"
          :categories="equipmentStore.categories"
          :equipment-statuses="equipmentStore.statuses"
        />

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
            {{ submitting ? 'Saving...' : 'Update' }}
          </button>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import EquipmentForm from '@/components/equipment/EquipmentForm.vue'
import Spinner from '@/components/common/Spinner.vue'
import router from '@/router'
import { equipmentService } from '@/services/equipmentService'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useToastStore } from '@/stores/toastStore'
import type { Equipment } from '@/utils/interfaces'

const route = useRoute()
const toast = useToastStore()
const equipmentStore = useEquipmentStore()

const currentPageTitle = ref('Edit equipment')
const equipmentFormRef = ref<InstanceType<typeof EquipmentForm> | null>(null)
const equipment = ref<Equipment | null>(null)
const isReady = ref(false)
const submitting = ref(false)

const getEquipment = async () => {
  try {
    const id = Number(route.params.id)

    if (!id) {
      toast.error('Invalid equipment ID')
      redirectToHome()
      return
    }

    const response = await equipmentService.getEquipment(id)

    if (!response?.equipment) {
      toast.error('Equipment not found')
      redirectToHome()
      return
    }

    equipment.value = response.equipment
    currentPageTitle.value = `Edit equipment: ${response.equipment.name}`
  } catch (error: any) {
    toast.error(error?.message || 'Error loading equipment')
    console.error('Error loading equipment:', error)
    redirectToHome()
  }
}

const submitForm = async () => {
  if (!equipmentFormRef.value || !equipment.value) return

  const validation = await equipmentFormRef.value.validate()

  if (!validation.valid) {
    toast.warning('Please check the form fields.')
    return
  }

  try {
    submitting.value = true

    const formData = equipmentFormRef.value.getFormData()
    const response = await equipmentService.updateEquipment(equipment.value.id, formData)

    toast.success(response?.message || 'Equipment updated successfully!')
    await equipmentStore.fetchEquipments()
    redirectToHome()
  } catch (error: any) {
    let errorMsg = 'Error updating equipment'

    if (error?.errors) {
      const validationMessages = Object.values(error.errors).flat().join('\n')
      errorMsg = error.message ? `${error.message}\n${validationMessages}` : validationMessages
    } else if (error?.message) {
      errorMsg = error.message
    }

    toast.error(errorMsg)
    console.error('Error updating equipment:', error)
  } finally {
    submitting.value = false
  }
}

const redirectToHome = () => {
  router.push({ name: 'equipment' })
}

onMounted(async () => {
  isReady.value = false
  await Promise.all([equipmentStore.fetchGeneralData(), getEquipment()])
  isReady.value = true
})
</script>
