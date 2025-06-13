<template>
  <section class="container min-h-screen py-[40px]">
    <main v-if="productData" class="mx-auto max-w-3xl">
      <div class="rounded-lg rounded-b-none border border-b-0 border-colorGray bg-colorGrayLight">
        <UTable
          :columns="columns"
          :rows="productData"
          :ui="{
            th: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
            td: { color: 'text-colorBlack', base: 'border-b border-colorGray' }
          }"
        >
          <template #image-data="{ row }">
            <NuxtImg
              :src="row.images[0]"
              :alt="row.name"
              class="h-16 w-20 min-w-20 rounded object-cover"
            />
          </template>
          <template #price-data="{ row }">
            {{ row.discount ?? row.price }}
          </template>
          <template #numbers-data="{ row }">
            <UiSelectNumbers
              :model-value="row.quantity"
              @update:model-value="(val) => handleUpdateQuantity(row.id, val)"
            />
          </template>
          <template #total-data="{ row }">
            {{ row.discount ? row.discount * row.quantity : row.price * row.quantity }}
          </template>
          <template #delete-data="{ row }">
            <UIcon
              name="heroicons:x-mark-16-solid"
              class="h-6 w-6 cursor-pointer hover:text-colorRed"
              @click="() => removeItem(row.id)"
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
    </main>
    <UiPageSpinner v-else />
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types'

const columns = [
  { key: 'image', label: '圖片' },
  { key: 'name', label: '商品' },
  { key: 'price', label: '價格' },
  { key: 'numbers', label: '數量' },
  { key: 'total', label: '總計' },
  { key: 'delete' }
]

const supabase = useSupabaseClient()
const cartStroe = useCartStore()
const { updateQuantity, removeItem } = cartStroe
const { cartItems } = storeToRefs(cartStroe)

const productIds = computed(() => cartItems.value.map((item) => item.id))

const { data } = await useAsyncData(
  'cart',
  async () => {
    if (productIds.value.length === 0) return []

    const { data, error } = await supabase.from('products').select('*').in('id', productIds.value)

    if (error) {
      showError('發生錯誤，請稍後再試！')
      return []
    }
    return data
  },
  {
    server: false
  }
)

const productData = computed(() => {
  if (!data.value) return null

  return data.value.map((product: Product) => {
    const cartItem = cartItems.value.find((item) => item.id === product.id)
    return {
      ...product,
      quantity: cartItem?.quantity ?? 1
    }
  })
})

const handleUpdateQuantity = (id: string, quantity: number) => {
  if (quantity === 0) {
    removeItem(id)
  } else {
    updateQuantity({ id, quantity })
  }
}
</script>
