<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div v-if="!isReady" class="flex justify-center items-center h-[calc(100vh-200px)]">
      <Spinner />
    </div>
    <div v-if="isReady" class="space-y-5 sm:space-y-6">
      <ComponentCard title="Edit user">
        <FormUser :user="userSelected" ref="formUserRef" />

        <div class="flex items-center gap-3 mt-5">
          <button
            :disabled="submitting"
            type="button"
            @click="submitForm"
            class="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
          >
            <span v-if="submitting" class="animate-spin">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle opacity="0.5" cx="10" cy="10" r="8.75" stroke="white" stroke-width="2.5" />
                <mask id="path-2-inside-1_3755_26472" fill="white">
                  <path
                    d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
                  />
                </mask>
                <path
                  d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
                  stroke="white"
                  stroke-width="4"
                  mask="url(#path-2-inside-1_3755_26472)"
                />
              </svg>
            </span>
            {{ submitting ? 'Updating...' : 'Save Changes' }}
          </button>

          <button
            type="button"
            @click="redirectToHome"
            class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>

  <ModalSuccess v-if="isSuccessModalOpen" :message="successMessage" @close="closeSuccessModal" />
  <ModalError
    v-if="isErrorModalOpen"
    :isHtml="true"
    :title="'Ooops!'"
    :message="errorMessage"
    @close="closeErrorModal"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import FormUser from '@/components/users/UserForm.vue'
import ModalSuccess from '@/components/common/ModalSuccess.vue'
import ModalError from '@/components/common/ModalError.vue'
import router from '@/router'
import { userService } from '@/services/userService'
import { useRoute } from 'vue-router'
import Spinner from '@/components/common/Spinner.vue'

const route = useRoute()
const currentPageTitle = ref('Edit user')
const formUserRef = ref<InstanceType<typeof FormUser> | null>(null)
const submitting = ref(false)
const isSuccessModalOpen = ref(false)
const successMessage = ref('Success!')
const isErrorModalOpen = ref(false)
const errorMessage = ref('')
const isReady = ref(true)
const userSelected = ref<any>(null)

const openSuccessModal = (message: string = 'Success!') => {
  successMessage.value = message
  isSuccessModalOpen.value = true
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  redirectToHome()
}

const openErrorModal = (message: string) => {
  errorMessage.value = message.replace(/\n/g, '<br>')
  isErrorModalOpen.value = true
}

const closeErrorModal = () => {
  isErrorModalOpen.value = false
}

const submitForm = async () => {
  if (!formUserRef.value) return

  const isValid = await formUserRef.value.validate()

  if (!isValid.valid) {
    console.log('Form validation failed')
    return
  }
  try {
    submitting.value = true
    const userData = formUserRef.value.getFormData() as {
      name: string
      lastName: string
      email: string
      phone: string
      password?: string
      roleId: string | number
      genderTypeId: number | null
      birthDate: string | null
      address: string
      addonAddress: string
    }
    const password = userData.password?.trim()

    const payload = {
      name: userData.name,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      ...(password ? { password } : {}),
      status: true,
      role_id: userData.roleId,

      gender_type_id: userData.genderTypeId,
      birthdate: userData.birthDate,
      address: userData.address,
      addon_address: userData.addonAddress,
    }

    const response = await userService.updateUser(payload, userSelected.value.id)

    openSuccessModal(response.message || 'Created successfully!')
  } catch (error: any) {
    let errorMsg = ''

    if (error.errors) {
      if (error.message) {
        errorMsg += `${error.message}\n`
      }
      const validationMessages = Object.values(error.errors).flat().join('\n')
      errorMsg += validationMessages
    } else if (error.message) {
      errorMsg = error.message
    }

    openErrorModal(errorMsg)
    console.error('Error during submission:', error)
  } finally {
    submitting.value = false
  }
}

const redirectToHome = () => {
  router.push({ name: 'Users' })
}

onMounted(async () => {
  try {
    isReady.value = false
    const id = route.params.id
    if (id) {
      const response = await userService.getUserById(id.toString())
      userSelected.value = response.user
    }
  } catch (error) {
    console.error('Error loading form data:', error)
  } finally {
    isReady.value = true
  }
})
</script>
