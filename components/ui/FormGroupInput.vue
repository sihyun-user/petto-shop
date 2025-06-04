<template>
  <UFormGroup :label="props.label" :name="props.name" :required="props.required">
    <UInput
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      class="rounded-md bg-white text-colorBlack"
      variant="none"
      size="lg"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </UFormGroup>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '請輸入您的電子郵件'
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>
