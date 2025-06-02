<template>
  <div>
    <LayoutBannerBreadcrumb
      title="全館商品總覽"
      :links="[{ label: '貓貓系列' }, { label: '主食' }, { label: '罐頭' }]"
    />
    <section class="container flex py-[40px] md:py-[60px]">
      <div class="mr-5 hidden min-w-[200px] md:block">
        <UiAsideMenu />
      </div>
      <main>
        <LayoutProductsFilterButton />
        <div class="mb-5 flex items-center justify-between md:h-[36px]">
          <span class="text-sm text-colorBlack">顯示 20 項結果，共 62 項</span>
          <USelect
            class="ml-4 w-[150px] rounded-md border border-colorPrimary bg-white"
            variant="none"
            size="md"
            placeholder="排序方式"
            :options="[
              { label: '最新上架', value: 'newest' },
              { label: '價格由低到高', value: 'priceAsc' },
              { label: '價格由高到低', value: 'priceDesc' }
            ]"
          />
        </div>
        <div class="mb-8 grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
          <UiProductCard
            v-for="item in products.slice(0, 4)"
            :key="item.id"
            :product="item"
            class="animate-fadeInUp"
          />
        </div>
        <div class="flex justify-center">
          <UiBasePagination />
        </div>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types'
usePageSeo({
  title: '全館商品總覽'
})

const products = ref<Product[]>([
  {
    id: 1,
    name: '全齡貓無穀鮭魚雞肉凍乾（火雞+鮭魚）1.8公斤',
    price: 1200,
    specialPrice: 1000,
    category: '凍乾',
    image: '/images/product_img.png'
  },
  {
    id: 2,
    name: '低磷無穀雞肉貓糧',
    price: 1400,
    specialPrice: 900,
    category: '乾糧',
    image: '/images/product_img.png'
  },
  {
    id: 3,
    name: '全齡貓鱈魚凍乾箱購',
    price: 1400,
    category: '凍乾',
    image: '/images/product_img.png'
  },
  {
    id: 4,
    name: '貓用無膠鮮肉鮪魚罐頭',
    price: 150,
    category: '罐頭',
    image: '/images/product_img.png'
  },
  {
    id: 5,
    name: '全齡貓無穀鮭魚雞肉凍乾（火雞+鮭魚）1.8公斤',
    price: 1200,
    specialPrice: 1000,
    category: '罐頭',
    image: '/images/product_img.png'
  },
  {
    id: 6,
    name: '低磷無穀雞肉貓糧',
    price: 1400,
    specialPrice: 900,
    category: '乾糧',
    image: '/images/product_img.png'
  },
  {
    id: 7,
    name: '全齡貓鱈魚凍乾箱購',
    price: 1400,
    category: '罐頭',
    image: '/images/product_img.png'
  },
  {
    id: 8,
    name: '貓用無膠鮮肉鮪魚罐頭',
    price: 150,
    category: '罐頭',
    image: '/images/product_img.png'
  }
])
</script>
