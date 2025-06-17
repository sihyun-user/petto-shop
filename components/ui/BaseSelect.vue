<template>
  <USelect
    :model-value="props.modelValue"
    :options="props.options"
    :placeholder="props.placeholder"
    :ui="{
      wrapper: 'rounded-md border border-colorGray bg-white text-colorBlack'
    }"
    variant="none"
    size="lg"
    @update:model-value="onUpdateValue"
  />
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string
  options: any[]
  placeholder?: string
}>()

const onUpdateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
