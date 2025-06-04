<template>
  <UButton
    :type="props.type"
    variant="solid"
    :class="[
      'flex items-center justify-center rounded-full bg-colorPrimary px-5 py-3 text-white hover:bg-colorPrimaryDark md:px-9 md:py-3',
      props.isLoading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
    ]"
  >
    <UIcon v-if="isLoading" name="i-svg-spinners:180-ring-with-bg" class="mr-1 h-5 w-5"></UIcon>
    {{ props.text }}
  </UButton>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
    text?: string
    isLoading?: boolean
  }>(),
  {
    type: 'button',
    text: '',
    isLoading: false
  }
)
</script>
