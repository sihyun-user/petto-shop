<template>
  <URadioGroup
    v-model="selected"
    :options="props.options"
    :ui-radio="{
      label: 'cursor-pointer',
      wrapper: 'py-2'
    }"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
}>()

const selected = ref(props.modelValue)

watch(selected, (val) => {
  emit('update:modelValue', val)
})

watch(
  () => props.modelValue,
  (val) => {
    if (val !== selected.value) {
      selected.value = val
    }
  }
)
</script>
