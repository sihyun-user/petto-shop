<template>
  <UFormGroup :label="props.label" :name="props.name" :required="props.required">
    <UInput
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :type="props.type"
      class="rounded-md border border-colorGray bg-white text-colorBlack"
      variant="none"
      size="lg"
      @update:model-value="onChangeInput"
    />
  </UFormGroup>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    name: string
    placeholder: string
    required?: boolean
    type?: string
  }>(),
  {
    modelValue: '',
    label: '',
    name: '',
    placeholder: '',
    required: false,
    type: 'text'
  }
)

const onChangeInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>
