<template>
  <div class="flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white shadow">
    <NuxtLink to="/">
      <NuxtImg
        :src="props.product.image"
        height="200"
        class="h-[200px] w-full object-cover"
        alt="商品圖片"
      />
    </NuxtLink>

    <div class="flex flex-1 flex-col justify-between p-3 md:p-4">
      <NuxtLink to="/" class="mb-2 inline-block">
        <h3 class="line-clamp-2 text-textPrimary">{{ props.product.name }}</h3>
      </NuxtLink>
      <div class="flex flex-col space-y-2">
        <div>
          <div v-if="props.product.specialPrice" class="text-sm text-textGary line-through">
            ${{ props.product.specialPrice }}
          </div>
          <div class="text-xl font-bold text-colorRed">${{ props.product.price }}</div>
        </div>
        <UiBaseButton :text="'加入購物車'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()
</script>
