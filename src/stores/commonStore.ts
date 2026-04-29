import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore(
  'commonStore',
  () => {
    const deleting = ref(false)
    const saving = ref(false)
    const uploading = ref(false)
    const filtering = ref(false)

    return {
      deleting,
      saving,
      uploading,
      filtering,
    }
  },
  {
    persist: true,
  },
)
