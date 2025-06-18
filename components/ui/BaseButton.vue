<template>
  <UButton
    variant="solid"
    :type="props.type"
    :class="[
      'flex items-center justify-center rounded-full bg-colorPrimary px-5 py-3 text-white hover:bg-colorPrimaryDark md:px-9 md:py-3',
      props.isLoading || props.isDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
    ]"
  >
    <UiLoadingSpinner v-if="props.isLoading && !props.isDisabled" styles="mr-1 h-5 w-5" />
    {{ props.text }}
  </UButton>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
    text?: string
    isLoading?: boolean
    isDisabled?: boolean
  }>(),
  {
    type: 'button',
    text: '',
    isLoading: false,
    isDisabled: false
  }
)
</script>
