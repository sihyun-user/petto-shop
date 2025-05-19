<template>
  <UButton
    :type="props.type"
    variant="solid"
    class="rounded-full bg-colorPrimary px-9 py-3 text-white hover:bg-colorPrimaryDark"
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
