<template>
    <div class="fixed top-[10px] right-4 z-[100000] space-y-3">
        <Notification v-for="toast in toastStore.toasts" :key="toast.id" :type="toast.type" :message="toast.message"
            @close="toastStore.remove(toast.id)" />
    </div>
</template>


<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore'
import Notification from '@/components/ui/notification/Notification.vue'

const toastStore = useToastStore()
</script>
