<template>
  <UIcon :name="'i-svg-spinners:180-ring-with-bg'" :class="props.styles" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isLoading?: boolean
    styles?: string
  }>(),
  {
    styles: undefined
  }
)
</script>
