<template>
  <UFormGroup :label="props.label" :name="props.name" :required="props.required">
    <UInput
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      class="rounded-md border border-colorGray bg-white text-colorBlack"
      variant="none"
      size="lg"
      @update:model-value="onChangeInput"
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
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const onChangeInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>
