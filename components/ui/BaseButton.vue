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
const props = withDefaults(
  defineProps<{
    type?: string
    text?: string
  }>(),
  {
    type: 'button',
    text: ''
  }
)
</script>
