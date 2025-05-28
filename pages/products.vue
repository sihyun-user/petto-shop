<template>
  <div>
    <div class="relative">
      <NuxtImg
        src="images/banner_bg_2.jpg"
        height="450"
        class="h-[150px] w-full object-cover md:h-[350px]"
      />
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="center-absolute flex flex-col items-center justify-center space-y-1 md:space-y-2">
        <h1 class="text-nowrap text-white">| 全館商品總覽 |</h1>
        <span class="text-white">貓貓系列/主食/罐頭</span>
      </div>
    </div>
    <section class="container flex py-[40px] md:py-[60px]">
      <aside class="mr-5 hidden min-w-[200px] md:block">
        <UForm class="mb-5" :state="state">
          <UFormGroup name="search" class="relative">
            <UInput
              v-model="state.search"
              variant="none"
              placeholder="搜尋商品..."
              class="rounded-md border border-colorPrimary bg-white text-colorBlack"
              size="md"
            />
            <UButton
              icon="i-lucide-search"
              type="submit"
              color="black"
              variant="solid"
              size="md"
              class="absolute right-0 top-0 h-full rounded-none rounded-r-md bg-colorPrimary px-3 hover:bg-colorPrimaryDark"
            >
            </UButton>
          </UFormGroup>
        </UForm>
        <div class="flex flex-col space-y-4 text-sm">
          <NuxtLink to="/products" class="font-semibold text-colorBlack">商品分類</NuxtLink>
          <ul class="flex flex-col space-y-4 text-sm">
            <!-- 狗狗系列 -->
            <li>
              <div class="block border-b border-colorGray pb-2 text-colorBlack">狗狗系列</div>
              <ul class="mt-2 space-y-4">
                <!-- 主食 -->
                <li>
                  <NuxtLink
                    to="/products?category=貓主食"
                    class="block pl-4 text-colorBlack hover:text-colorPrimary"
                  >
                    主食
                  </NuxtLink>
                  <ul class="mt-2 space-y-2 pl-8">
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓乾糧"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        乾糧
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓罐頭"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        罐頭
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <!-- 零食 -->
                <li>
                  <NuxtLink
                    to="/products?category=貓主食"
                    class="block pl-4 text-colorBlack hover:text-colorPrimary"
                  >
                    零食
                  </NuxtLink>
                  <ul class="mt-2 space-y-2 pl-8">
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓乾糧"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        凍乾
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓罐頭"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        潔牙骨
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓凍乾"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        點心
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- 貓貓系列 -->
            <li>
              <div class="block border-b border-colorGray pb-2 text-colorBlack">貓貓系列</div>
              <ul class="mt-2 space-y-4">
                <!-- 主食 -->
                <li>
                  <NuxtLink
                    to="/products?category=貓主食"
                    class="block pl-4 text-colorBlack hover:text-colorPrimary"
                  >
                    主食
                  </NuxtLink>
                  <ul class="mt-2 space-y-2 pl-8">
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓乾糧"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        乾糧
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓罐頭"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        罐頭
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <!-- 零食 -->
                <li>
                  <NuxtLink
                    to="/products?category=貓主食"
                    class="block pl-4 text-colorBlack hover:text-colorPrimary"
                  >
                    零食
                  </NuxtLink>
                  <ul class="mt-2 space-y-2 pl-8">
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓乾糧"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        凍乾
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓罐頭"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        潔牙餅
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/products?subcategory=貓凍乾"
                        class="text-colorGrayDark hover:text-colorPrimary"
                      >
                        點心
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- 其他主分類 -->
            <li>
              <NuxtLink
                to="/products?category=毛孩用品"
                class="block border-b border-colorGray pb-2 text-colorBlack hover:text-colorPrimary"
              >
                毛孩用品
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products?category=玩具"
                class="block border-b border-colorGray pb-2 text-colorBlack hover:text-colorPrimary"
              >
                玩具
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
      <main>
        <div class="mb-5 flex justify-center md:hidden">
          <div
            class="flex cursor-pointer items-center space-x-1 leading-none text-colorGrayDark hover:text-colorPrimaryDark"
          >
            <UIcon name="heroicons:list-bullet-16-solid" size="20" />
            <span>篩選</span>
          </div>
        </div>
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
        <div class="grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
          <UiProductCard
            v-for="item in products.slice(0, 4)"
            :key="item.id"
            :product="item"
            class="animate-fadeInUp"
          />
        </div>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types'
useSeoMeta({
  title: '全館商品總覽'
})

const state = ref({
  search: ''
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
