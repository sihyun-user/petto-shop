<template>
  <section class="container py-[40px]">
    <div class="rounded-lg rounded-b-none border border-b-0 border-colorGray bg-colorGrayLight">
      <UTable
        :columns="columns"
        :rows="rows"
        :ui="{
          th: { color: 'text-colorBlack', base: 'border-b border-colorRed' },
          td: { color: 'text-colorBlack', base: 'border-b border-colorRed' }
        }"
      >
        <template #image-data="{ row }">
          <NuxtImg :src="row.image" :alt="row.name" class="h-16 w-20 rounded object-cover" />
        </template>
        <template #numbers-data="{ row }">
          <UiSelectNumbers v-model="row.numbers" />
        </template>
        <template #delete-data="{ row }">
          <UIcon
            name="heroicons:x-mark-16-solid"
            class="h-6 w-6 cursor-pointer hover:text-colorRed"
            @click="() => console.log('Delete', row.name)"
          />
        </template>
      </UTable>
    </div>
    <div class="rounded-lg rounded-t-none border border-colorGray bg-colorGrayLight">
      <div class="flex items-center justify-between p-4">
        <p class="text-colorBlack">總計</p>
        <p class="text-2xl font-bold text-colorBlack">$1336</p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const columns = [
  { key: 'image', label: '圖片' },
  { key: 'name', label: '商品' },
  { key: 'price', label: '價格' },
  { key: 'numbers', label: '數量' },
  { key: 'total', label: '總計' },
  { key: 'delete' }
]

const rows = [
  {
    image: '/images/products/pet.jpg',
    name: 'Lindsay Walton',
    price: 668,
    numbers: 3,
    total: 668
  },
  {
    image: '/images/products/pet.jpg',
    name: 'Lindsay Walton',
    price: 668,
    numbers: 1,
    total: 668
  }
]
</script>
