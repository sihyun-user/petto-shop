<template>
  <aside>
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
      <NuxtLink to="/products" class="font-bold text-colorBlack">商品分類</NuxtLink>
      <ul class="flex flex-col space-y-4 text-sm">
        <!-- 狗狗系列 -->
        <li>
          <div class="block border-b border-colorGray pb-2 font-medium text-colorBlack">
            狗狗系列
          </div>
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
          <div class="block border-b border-colorGray pb-2 font-medium text-colorBlack">
            貓貓系列
          </div>
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
            class="block border-b border-colorGray pb-2 font-medium text-colorBlack hover:text-colorPrimary"
          >
            毛孩用品
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/products?category=玩具"
            class="block border-b border-colorGray pb-2 font-medium text-colorBlack hover:text-colorPrimary"
          >
            玩具
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
const state = ref({
  search: ''
})
</script>
