<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="My Profile">
        <div v-if="!isReady" class="flex justify-center items-center py-12">
          <Spinner />
        </div>
        <div v-if="isReady && user" class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <img
                  :src="user.gender_type_id === 1 ? '/images/user/man.png' : '/images/user/woman.png'"
                  :alt="user.name"
                />
              </div>
              <div class="order-3 xl:order-2">
                <h4 class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {{ user.name }} {{ user.last_name }}
                </h4>
                <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.role?.name }}</p>
                  <div class="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                </div>
              </div>
            </div>
            <button @click="isProfileInfoModal = true" class="edit-button">
              <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </ComponentCard>
    </div>

    <!-- Edit Profile Modal -->
    <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
      <template #body>
        <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <button @click="isProfileInfoModal = false" class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
            <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" fill="" />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Edit Personal Information</h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">Update your details to keep your profile up-to-date.</p>
          </div>
          <form class="flex flex-col" @submit.prevent="saveProfile">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div>
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Personal Information</h5>
                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">First Name</label>
                    <input v-model="formData.name" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Last Name</label>
                    <input v-model="formData.last_name" type="text" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Email Address</label>
                    <input v-model="formData.email" type="email" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Phone</label>
                    <input v-model="formData.phone" type="text" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Gender</label>
                    <select v-model="formData.gender_type_id" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                      <option :value="null">Select gender</option>
                      <option v-for="g in genderTypes" :key="g.id" :value="g.id">{{ g.name }}</option>
                    </select>
                  </div>
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Birthdate</label>
                    <input v-model="formData.birthdate" type="date" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Address</label>
                    <input v-model="formData.address" type="text" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                  <div class="col-span-2">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Addon Address</label>
                    <input v-model="formData.addon_address" type="text" class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button @click="isProfileInfoModal = false" type="button" class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">Close</button>
              <button type="submit" :disabled="submitting" class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 sm:w-auto">
                <span v-if="submitting" class="animate-spin mr-2">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.5" cx="10" cy="10" r="8.75" stroke="white" stroke-width="2.5" />
                  </svg>
                </span>
                {{ submitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>

    <ModalSuccess v-if="isSuccessModalOpen" :message="successMessage" @close="closeSuccessModal" />
    <ModalError v-if="isErrorModalOpen" :isHtml="true" :title="'Oops!'" :message="errorMessage" @close="closeErrorModal" />
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Modal from '@/components/profile/Modal.vue'
import ModalSuccess from '@/components/common/ModalSuccess.vue'
import ModalError from '@/components/common/ModalError.vue'
import Spinner from '@/components/common/Spinner.vue'
import { userService } from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

const currentPageTitle = ref('My Profile')
const authStore = useAuthStore()
const toastStore = useToastStore()
const isReady = ref(false)
const user = ref<any>(null)
const genderTypes = ref<any[]>([])
const isProfileInfoModal = ref(false)
const submitting = ref(false)
const isSuccessModalOpen = ref(false)
const successMessage = ref('')
const isErrorModalOpen = ref(false)
const errorMessage = ref('')

const formData = ref({
  name: '',
  last_name: '',
  email: '',
  phone: '',
  gender_type_id: null as number | null,
  birthdate: '',
  address: '',
  addon_address: '',
})

const loadUserData = async () => {
  try {
    isReady.value = false
    const response = await userService.getUserById(authStore.user!.id.toString())
    user.value = response.user
    const genderId = response.user.user_detail?.gender_type_id
    formData.value = {
      name: response.user.name,
      last_name: response.user.last_name,
      email: response.user.email,
      phone: response.user.phone || '',
      gender_type_id: genderId || null,
      birthdate: response.user.user_detail?.birthdate || '',
      address: response.user.user_detail?.address || '',
      addon_address: response.user.user_detail?.addon_address || '',
    }
  } catch (error) {
    console.error('Error loading user data:', error)
  } finally {
    isReady.value = true
  }
}

const loadGenderTypes = async () => {
  try {
    const response = await userService.getGeneralData()
    genderTypes.value = response.genderTypes || []
  } catch (error) {
    console.error('Error loading gender types:', error)
  }
}

const saveProfile = async () => {
  try {
    submitting.value = true
    const payload = {
      name: formData.value.name,
      last_name: formData.value.last_name,
      email: formData.value.email,
      phone: formData.value.phone,
      gender_type_id: formData.value.gender_type_id,
      birthdate: formData.value.birthdate || null,
      address: formData.value.address || null,
      addon_address: formData.value.addon_address || null,
    }

    await userService.updateUser(payload, user.value.id.toString())
    await authStore.fetchUser()
    isProfileInfoModal.value = false
    toastStore.success('Profile updated successfully!')
    await loadUserData()
  } catch (error: any) {
    let errorMsg = ''
    if (error.errors) {
      errorMsg = Object.values(error.errors).flat().join('<br>')
    } else {
      errorMsg = error.message || 'Error updating profile'
    }
    errorMessage.value = errorMsg
    isErrorModalOpen.value = true
  } finally {
    submitting.value = false
  }
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
}

const closeErrorModal = () => {
  isErrorModalOpen.value = false
}

onMounted(async () => {
  await loadGenderTypes()
  await loadUserData()
})
</script>
