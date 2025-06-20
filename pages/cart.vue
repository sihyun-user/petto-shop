<template>
  <section class="container min-h-screen py-[40px]">
    <main v-if="productData" class="mx-auto max-w-3xl">
      <h3 class="mb-4 text-colorBlack">購物車</h3>
      <div class="rounded-lg border border-colorGray bg-colorGrayLight">
        <UTable
          row-key="id"
          :columns="columns"
          :rows="productData"
          :empty-state="{
            icon: 'i-heroicons-shopping-cart-solid',
            label: '您的購物車裡還沒有任何商品。'
          }"
          :ui="{
            th: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
            td: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
            emptyState: {
              icon: 'w-10 h-10 text-colorGrayDark'
            }
          }"
        >
          <template #image-data="{ row }">
            <NuxtImg
              :src="row.images[0]"
              :alt="row.name"
              class="h-16 w-20 min-w-20 rounded object-cover"
            />
          </template>
          <template #price-data="{ row }"> ${{ row.discount ?? row.price }} </template>
          <template #quantity-data="{ row }">
            <UiUpdateQuantity
              :key="row.id"
              :model-value="row.quantity"
              @update:model-value="(val) => handleUpdateQuantity(row.id, row.name, val)"
            />
          </template>
          <template #total-data="{ row }">
            ${{ row.discount ? row.discount * row.quantity : row.price * row.quantity }}
          </template>
          <template #delete-data="{ row }">
            <UIcon
              name="heroicons:x-mark-16-solid"
              class="h-6 w-6 cursor-pointer hover:text-colorRed"
              @click="() => handleRemoveItem(row.id, row.name)"
            />
          </template>
        </UTable>
        <div v-if="productData.length > 0">
          <div class="flex items-center justify-between border-b border-colorGray p-4">
            <p class="text-sm text-colorBlack md:text-base">運送方式</p>
            <p class="text-sm text-colorBlack md:text-base">常溫宅配 (免運費)</p>
          </div>
          <div class="flex items-center justify-between p-4">
            <p class="text-sm text-colorBlack md:text-base">總計</p>
            <p class="text-xl font-bold text-colorBlack md:text-2xl">NT${{ totalPrice }}</p>
          </div>
        </div>
      </div>
      <div v-if="productData && productData.length > 0" class="mt-8 flex justify-end">
        <UiBaseButton text="前往結帳" @click="goCheckout" />
      </div>
    </main>
    <UiPageSpinner v-if="isLoading" />
  </section>
</template>
<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'

usePageSeo({
  title: '購物車'
})

const columns = [
  { key: 'image', label: '圖片' },
  { key: 'name', label: '商品' },
  { key: 'price', label: '價格' },
  { key: 'quantity', label: '數量' },
  { key: 'total', label: '小計' },
  { key: 'delete' }
]

const cartStore = useCartStore()
const userStore = useUserStore()
const { showRemoveCartSuccess } = useAppToast()

const { isLoading, productData, totalPrice } = useGetCart()

const handleUpdateQuantity = (id: string, name: string, quantity: number) => {
  cartStore.setUpdateQuantity({ id, name, quantity })
}

const handleRemoveItem = (id: string, name: string) => {
  cartStore.removeItem(id)
  showRemoveCartSuccess(name)
}

const goCheckout = () => {
  if (!userStore.user) {
    navigateTo('/my-account')
  } else {
    navigateTo('/checkout')
  }
}
</script>
