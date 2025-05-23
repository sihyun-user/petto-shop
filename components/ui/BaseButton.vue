<template>
  <UButton
    :type="props.type"
    variant="solid"
    class="flex items-center justify-center rounded-full bg-colorPrimary px-5 py-3 text-white hover:bg-colorPrimaryDark md:px-9 md:py-3"
  >
    {{ props.text }}
  </UButton>
</template>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  text: {
    type: String,
    default: ''
  }
})
</script>
