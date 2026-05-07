<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium gap-2 rounded-lg transition',
      sizeClasses[size],
      variantClasses[variant],
      className,
      { 'cursor-not-allowed opacity-50': disabled || loading },
    ]"
    @click="onClick"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="flex items-center animate-spin">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.5" cx="10" cy="10" r="8.75" stroke="currentColor" stroke-width="2.5" />
        <mask id="path-2-inside-1_3755_26472" fill="white">
          <path
            d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
          />
        </mask>
        <path
          d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
          stroke="currentColor"
          stroke-width="4"
          mask="url(#path-2-inside-1_3755_26472)"
        />
      </svg>
    </span>
    <span v-else-if="startIcon" class="flex items-center">
      <component :is="startIcon" />
    </span>
    <slot></slot>
    <span v-if="endIcon && !loading" class="flex items-center">
      <component :is="endIcon" />
    </span>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  size?: 'xs' | 'sm' | 'md'
  variant?:
    | 'primary'
    | 'outline'
    | 'success'
    | 'success-outline'
    | 'warning-outline'
    | 'danger-outline'
    | 'orange-outline'
    | 'primary-outline'
  startIcon?: object
  endIcon?: object
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'primary',
  className: '',
  disabled: false,
  loading: false,
})

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-4 py-3 text-sm',
  md: 'px-5 py-3.5 text-sm',
}

const variantClasses = {
  primary: 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300',
  'primary-outline':
    'bg-white text-brand-600 ring-1 ring-inset ring-brand-500 hover:bg-brand-50 dark:bg-gray-900 dark:text-brand-400 dark:ring-brand-700 dark:hover:bg-brand-900/20',
  outline:
    'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
  success:
    'border bg-green-600 text-white shadow-theme-xs hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600',
  'success-outline':
    'bg-white text-green-600 ring-1 ring-inset ring-green-500 hover:bg-green-50 dark:bg-gray-900 dark:text-green-400 dark:ring-green-700 dark:hover:bg-green-900/20',
  'warning-outline':
    'bg-white text-yellow-600 ring-1 ring-inset ring-yellow-400 hover:bg-yellow-50 dark:bg-gray-900 dark:text-yellow-400 dark:ring-yellow-600 dark:hover:bg-yellow-900/20',
  'orange-outline':
    'bg-white text-orange-600 ring-1 ring-inset ring-orange-500 hover:bg-orange-50 dark:bg-gray-900 dark:text-orange-400 dark:ring-orange-700 dark:hover:bg-orange-900/20',
  'danger-outline':
    'bg-white text-red-600 ring-1 ring-inset ring-red-500 hover:bg-red-50 dark:bg-gray-900 dark:text-red-400 dark:ring-red-700 dark:hover:bg-red-900/20',
}

const onClick = () => {
  if (!props.disabled && !props.loading && props.onClick) {
    props.onClick()
  }
}
</script>
