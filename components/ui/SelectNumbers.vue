<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      class="h-[40px] w-[40px] rounded-none bg-colorSecondary hover:bg-colorPrimary"
      @click="changeQuantity('subtract')"
    >
      <UIcon name="i-heroicons:minus-16-solid" class="text-white" />
    </UButton>
    <UInput
      v-model="quantity"
      variant="none"
      class="h-[40px] w-[55px] border-y border-colorPrimary bg-white text-colorBlack"
      size="lg"
      type="number"
      @change="onChangeInput"
    />
    <UButton
      variant="ghost"
      class="h-[40px] w-[40px] rounded-none bg-colorPrimary hover:bg-colorPrimaryDark"
      @click="changeQuantity('add')"
    >
      <UIcon name="i-heroicons:plus-16-solid" class="text-white" />
    </UButton>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: number
}>()

const quantity = ref(props.modelValue || 0)

const changeQuantity = (type: 'add' | 'subtract' = 'add') => {
  if (type === 'add') {
    quantity.value += 1
  } else if (type === 'subtract' && quantity.value > 0) {
    quantity.value -= 1
  }
}

const onChangeInput = () => {
  emit('update:modelValue', quantity.value)
}
</script>
