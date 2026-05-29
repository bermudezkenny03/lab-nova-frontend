<template>
  <form @submit.prevent>
    <div class="-mx-2.5 flex flex-wrap gap-y-5">
      <!-- Personal Info -->
      <div class="w-full px-2.5">
        <h4
          class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90"
        >
          Personal Info
        </h4>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          First Name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="name"
          type="text"
          placeholder="Enter first name"
          :class="[
            'dark:bg-dark-900 h-11 w-full rounded-lg border  bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
            errors.name ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <span class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Last Name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Enter last name"
          :class="[
            'dark:bg-dark-900 h-11 w-full rounded-lg border  bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
            errors.lastName ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <span class="text-red-500 text-sm">{{ errors.lastName }}</span>
      </div>

      <!-- Gender -->
      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Gender <span class="text-red-500">*</span>
        </label>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="genderTypeId"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border rounded-lg appearance-none dark:bg-dark-900 h-11 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{
              'text-gray-500 dark:text-gray-400': genderTypeId,
              'border-red-500': errors.genderTypeId,
              'border-gray-300': !errors.genderTypeId,
            }"
          >
            <option :value="null" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Select gender
            </option>
            <option
              v-for="g in genderTypes"
              :key="g.id"
              :value="g.id"
              class="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
            >
              {{ g.name }}
            </option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
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
        <span class="text-red-500 text-sm">{{ errors.genderTypeId }}</span>
      </div>

      <!-- Date Picker -->
      <div class="w-full px-2.5 md:w-1/2">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Date of Birth
          </label>
          <div class="relative">
            <flat-pickr
              v-model="birthDate"
              :config="flatpickrConfig"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Select date"
            />
            <span
              class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400"
            >
              <svg
                class="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.66659 1.5415C7.0808 1.5415 7.41658 1.87729 7.41658 2.2915V2.99984H12.5833V2.2915C12.5833 1.87729 12.919 1.5415 13.3333 1.5415C13.7475 1.5415 14.0833 1.87729 14.0833 2.2915V2.99984L15.4166 2.99984C16.5212 2.99984 17.4166 3.89527 17.4166 4.99984V7.49984V15.8332C17.4166 16.9377 16.5212 17.8332 15.4166 17.8332H4.58325C3.47868 17.8332 2.58325 16.9377 2.58325 15.8332V7.49984V4.99984C2.58325 3.89527 3.47868 2.99984 4.58325 2.99984L5.91659 2.99984V2.2915C5.91659 1.87729 6.25237 1.5415 6.66659 1.5415ZM6.66659 4.49984H4.58325C4.30711 4.49984 4.08325 4.7237 4.08325 4.99984V6.74984H15.9166V4.99984C15.9166 4.7237 15.6927 4.49984 15.4166 4.49984H13.3333H6.66659ZM15.9166 8.24984H4.08325V15.8332C4.08325 16.1093 4.30711 16.3332 4.58325 16.3332H15.4166C15.6927 16.3332 15.9166 16.1093 15.9166 15.8332V8.24984Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Phone <span class="text-red-500">*</span>
        </label>
        <input
          v-model="phone"
          type="text"
          placeholder="Enter phone"
          :class="[
            'dark:bg-dark-900 h-11 w-full rounded-lg border  bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
            errors.phone ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <span class="text-red-500 text-sm">{{ errors.phone }}</span>
      </div>

      <!-- Address Section -->
      <div class="w-full px-2.5">
        <h4
          class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90"
        >
          Address
        </h4>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Address
        </label>
        <input
          v-model="address"
          type="text"
          placeholder="Address"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>
      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Addon Address
        </label>
        <input
          v-model="addonAddress"
          type="text"
          placeholder="Apt, Suite, Bldg, etc"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <!-- Credential Section -->
      <div class="w-full px-2.5">
        <h4
          class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90"
        >
          Credentials
        </h4>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Email <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
            <svg
              class="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.0415 7.06206V14.375C3.0415 14.6511 3.26536 14.875 3.5415 14.875H16.4582C16.7343 14.875 16.9582 14.6511 16.9582 14.375V7.06245L11.1441 11.1168C10.4568 11.5961 9.54348 11.5961 8.85614 11.1168L3.0415 7.06206ZM16.9582 5.19262C16.9582 5.19341 16.9582 5.1942 16.9582 5.19498V5.20026C16.957 5.22216 16.9458 5.24239 16.9277 5.25501L10.2861 9.88638C10.1143 10.0062 9.88596 10.0062 9.71412 9.88638L3.0723 5.25485C3.05318 5.24151 3.04178 5.21967 3.04177 5.19636C3.04176 5.15695 3.0737 5.125 3.1131 5.125H16.8869C16.925 5.125 16.9562 5.15494 16.9582 5.19262ZM18.4582 5.21428V14.375C18.4582 15.4796 17.5627 16.375 16.4582 16.375H3.5415C2.43693 16.375 1.5415 15.4796 1.5415 14.375V5.19498C1.5415 5.1852 1.54169 5.17546 1.54206 5.16577C1.55834 4.31209 2.25546 3.625 3.1131 3.625H16.8869C17.7546 3.625 18.4582 4.32843 18.4583 5.19622C18.4583 5.20225 18.4582 5.20826 18.4582 5.21428Z"
                fill=""
              />
            </svg>
          </span>
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border rounded-lg dark:bg-dark-900 h-11 pl-11 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{
              'border-red-500': errors.email,
              'border-gray-300': !errors.email,
            }"
          />
        </div>
        <span class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>

      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
            <svg
              class="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6252 13.9582C10.6252 13.613 10.3453 13.3332 10.0002 13.3332C9.65498 13.3332 9.37516 13.613 9.37516 13.9582V15.2082C9.37516 15.5533 9.65498 15.8332 10.0002 15.8332C10.3453 15.8332 10.6252 15.5533 10.6252 15.2082V13.9582Z"
                fill="#667085"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0002 1.6665C7.58392 1.6665 5.62516 3.62526 5.62516 6.0415V7.604H4.5835C3.54796 7.604 2.7085 8.44347 2.7085 9.479V16.4578C2.7085 17.4933 3.54796 18.3328 4.5835 18.3328H15.4168C16.4524 18.3328 17.2918 17.4933 17.2918 16.4578V9.479C17.2918 8.44347 16.4524 7.604 15.4168 7.604H14.3752V6.0415C14.3752 3.62526 12.4164 1.6665 10.0002 1.6665ZM13.1252 6.0415V7.604H6.87516V6.0415C6.87516 4.31561 8.27427 2.9165 10.0002 2.9165C11.7261 2.9165 13.1252 4.31561 13.1252 6.0415ZM4.5835 8.854C4.23832 8.854 3.9585 9.13383 3.9585 9.479V16.4578C3.9585 16.8029 4.23832 17.0828 4.5835 17.0828H15.4168C15.762 17.0828 16.0418 16.8029 16.0418 16.4578V9.479C16.0418 9.13383 15.762 8.854 15.4168 8.854H4.5835Z"
                fill=""
              />
            </svg>
          </span>

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border rounded-lg dark:bg-dark-900 h-11 pl-11 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{
              'border-red-500': errors.password,
              'border-gray-300': !errors.password,
            }"
          />
        </div>
        <span class="text-red-500 text-sm">{{ errors.password }}</span>
      </div>
      <div class="w-full px-2.5 md:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Role <span class="text-red-500">*</span>
        </label>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="roleId"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border rounded-lg appearance-none dark:bg-dark-900 h-11 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{
              'text-gray-500 dark:text-gray-400': roleId,
              'border-red-500': errors.roleId,
              'border-gray-300': !errors.roleId,
            }"
          >
            <option value="" disabled selected>Select role</option>
            <option
              v-for="role in roles"
              :key="role.id"
              :value="role.id"
              class="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
            >
              {{ role.name }}
            </option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
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
        <span class="text-red-500 text-sm">{{ errors.roleId }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { userService } from '@/services/userService'
import { flatpickrConfig, toApiDateString } from '@/utils/dateUtils'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
})

const cities = ref<any>([])
const roles = ref<any>([])
const genderTypes = ref<any>([])
const loading = ref(false)

const schema = yup.object({
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  genderTypeId: yup.number().required('Gender is required').nullable(),
  phone: yup.string().required('Phone is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .nullable()
    .test('password-required', 'Password is required', function (value) {
      return props.user ? true : !!value
    }),
  roleId: yup.string().required('Role is required'),
})

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.user?.id || null,
    name: props.user?.name || '',
    lastName: props.user?.last_name || '',
    genderTypeId: props.user?.user_detail?.gender_type_id || null,
    birthDate: props.user?.user_detail?.birthdate || new Date(),
    phone: props.user?.phone || '',
    address: props.user?.user_detail?.address || '',
    addonAddress: props.user?.user_detail?.addon_address || '',
    email: props.user?.email || '',
    password: '',
    roleId: props.user?.role_id || '',
  },
})

const { value: id } = useField('id')
const { value: name } = useField('name')
const { value: lastName } = useField('lastName')
const { value: genderTypeId } = useField<number | null>('genderTypeId')
const { value: birthDate } = useField<Date>('birthDate')
const { value: phone } = useField('phone')
const { value: address } = useField('address')
const { value: addonAddress } = useField('addonAddress')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: roleId } = useField('roleId')

const validateForm = async () => {
  const isValid = await validate()
  return isValid
}

const getFormData = () => {
  const formattedBirthDate = toApiDateString(birthDate.value)


  const formData = {
    id: id.value,
    name: name.value,
    lastName: lastName.value,
    genderTypeId: genderTypeId.value,
    birthDate: formattedBirthDate,
    phone: phone.value,
    address: address.value,
    addonAddress: addonAddress.value,
    email: email.value,
    password: password.value,
    roleId: roleId.value,
  }

  return formData
}

const getGeneralData = async () => {
  try {
    loading.value = true
    const response = await userService.getGeneralData()
    roles.value = response.roles
    genderTypes.value = response.genderTypes || []
  } catch (error) {
    console.error('Error loading form data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getGeneralData()
})

defineExpose({
  validate: validateForm,
  getFormData,
  errors,
})
</script>
