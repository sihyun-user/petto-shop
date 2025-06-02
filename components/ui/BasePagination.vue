<template>
  <div class="flex justify-center">
    <UPagination
      v-model="page"
      :page-count="5"
      :total="items.length"
      :ui="{
        default: {
          size: 'md',
          activeButton: {
            class: 'bg-colorPrimary text-white hover:bg-colorPrimaryDark'
          },
          inactiveButton: {
            class: 'hover:bg-white text-colorBlack hover:text-colorPrimaryDark'
          },
          prevButton: {
            class: 'text-colorBlack bg-white'
          },
          nextButton: {
            class: 'text-colorBlack bg-white'
          }
        }
      }"
    />
  </div>
</template>
<script setup lang="ts">
const page = ref(1)
const items = ref(Array(50))
</script>
