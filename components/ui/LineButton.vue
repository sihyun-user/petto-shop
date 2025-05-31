<template>
  <UButton
    :type="props.type"
    :icon="props.icon"
    variant="ghost"
    class="flex items-center justify-center rounded-full border border-colorPrimary bg-white text-colorPrimary hover:bg-colorPrimary hover:text-white md:px-5 md:py-2"
  >
    {{ props.text }}
  </UButton>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
    icon?: string
    text?: string
  }>(),
  {
    type: 'button',
    text: '',
    icon: ''
  }
)
</script>
