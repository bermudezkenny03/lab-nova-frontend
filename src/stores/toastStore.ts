import { defineStore } from 'pinia'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface Toast {
  id: number
  type: ToastType
  message: string
  timeout?: number
}

let counter = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),

  actions: {
    show(type: ToastType, message: string, timeout = 4000) {
      const id = ++counter

      this.toasts.push({ id, type, message, timeout })

      if (timeout > 0) {
        setTimeout(() => this.remove(id), timeout)
      }
    },

    remove(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },

    success(message: string, timeout?: number) {
      this.show('success', message, timeout)
    },

    info(message: string, timeout?: number) {
      this.show('info', message, timeout)
    },

    warning(message: string, timeout?: number) {
      this.show('warning', message, timeout)
    },

    error(message: string, timeout?: number) {
      this.show('error', message, timeout)
    },
  },
})
