<template>
  <UButton
    :type="props.type"
    variant="solid"
    class="flex items-center justify-center rounded-full border border-colorPrimary bg-white text-colorPrimary hover:bg-colorPrimary hover:text-white md:px-5 md:py-2"
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
