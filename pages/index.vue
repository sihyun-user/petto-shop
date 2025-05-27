<template>
  <div>
    <LayoutBannerSlider />
    <section>
      <SvgWaveBackground />
      <div class="bg-colorPrimaryLight">
        <div class="container pb-[60px]">
          <div class="mb-7 space-y-1 text-center">
            <h4 class="text-textSecondary">毛孩最愛口味</h4>
            <h2 class="text-textPrimary">人氣寵糧熱銷推薦</h2>
          </div>
          <div class="mb-4 flex justify-center space-x-2">
            <UiLineButton
              v-for="category in categories"
              :key="category"
              :text="category"
              :class="{ 'bg-colorPrimary text-white': activeCategory === category }"
              @click="activeCategory = category"
            />
          </div>
          <div class="grid-template-areas">
            <UiProductCard
              v-for="item in filteredProducts"
              :key="item.id"
              :product="item"
              class="animate-fadeInUp"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-textSecondary">專為毛孩設計的玩具</h4>
          <h2 class="text-textPrimary">專為毛孩打造，咬咬最對味</h2>
        </div>
        <div class="grid-template-areas">
          <UiProductCard
            v-for="item in filteredProducts.slice(0, 4)"
            :key="item.id"
            :product="item"
            class="animate-fadeInUp"
          />
        </div>
      </div>
    </section>
    <section class="bg-colorPrimaryLight">
      <div class="container py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-textSecondary">開箱測評</h4>
          <h2 class="text-textPrimary">寵物達人實測，選出最愛好物</h2>
        </div>
        <LayoutBoxSlider />
      </div>
    </section>
    <section>
      <div class="container py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-textSecondary">毛孩專欄</h4>
          <h2 class="text-textPrimary">成為最懂毛孩的好主人</h2>
        </div>
        <div class="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <UiArticleCard
            v-for="item in articles.slice(0, 4)"
            :key="item.id"
            :article="item"
            class="animate-fadeInUp"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types'

const categories = ['所有商品', '乾糧', '罐頭', '凍乾']
const activeCategory = ref('所有商品')

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

const filteredProducts = computed(() => {
  if (activeCategory.value === '所有商品') return products.value
  return products.value.filter((p) => p.category === activeCategory.value)
})

const articles = ref([
  {
    id: 1,
    name: '如何選擇適合的貓糧？',
    image: '/images/unboxing_1.jpg',
    author: 'petlover23',
    description:
      '選擇適合的貓糧對於貓咪的健康至關重要。本文將介紹如何根據貓咪的年齡、體型和健康狀況選擇合適的貓糧。',
    date: '2025-03-20T00:00:00Z'
  },
  {
    id: 2,
    name: '挑選狗狗飼料的5個重點',
    image: '/images/unboxing_3.jpg',
    author: '大冰奶',
    description:
      '狗狗的營養需求與貓咪不同，挑選飼料時應注意成分、年齡適配與過敏原。這篇文章將帶你了解如何為毛孩挑選最適合的狗糧。',
    date: '2025-03-21T00:00:00Z'
  },
  {
    id: 3,
    name: '貓狗共養注意事項',
    image: '/images/unboxing_4.jpg',
    author: 'saservroice_1444',
    description:
      '同時飼養貓與狗是一件幸福但也充滿挑戰的事。本文將介紹如何建立和平共處的生活環境，並提供日常管理小撇步。',
    date: '2025-03-22T00:00:00Z'
  },
  {
    id: 4,
    name: '貓咪日常護理指南',
    image: '/images/unboxing_5.jpg',
    author: '薄荷貓貓',
    description:
      '貓咪的日常護理包括飲食、清潔和健康檢查等。本文將提供一些實用的護理技巧，幫助你更好地照顧你的毛孩。',
    date: '2025-03-23T00:00:00Z'
  }
])
</script>
