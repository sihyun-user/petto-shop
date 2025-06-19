<template>
  <div>
    <LayoutBannerSlider />
    <section>
      <SvgWaveBackground />
      <div class="bg-colorPrimaryLight">
        <div class="container pb-[60px]">
          <div class="mb-7 space-y-1 text-center">
            <h4 class="text-colorPrimaryDark">毛孩最愛口味</h4>
            <h2 class="text-colorBlack">人氣寵糧熱銷推薦</h2>
          </div>
          <div class="mb-4 flex justify-center space-x-2">
            <UiLineButton
              v-for="category in categories"
              :key="category"
              :text="category"
              :class="{ 'bg-colorPrimary text-white': activeCategory === category }"
              @click="handleCategoryChange(category)"
            />
          </div>
          <div class="grid-template-areas">
            <UiProductCard
              v-for="item in categoryProducts"
              :key="item.id"
              :product="item"
              class="animate-fadeInUp"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container py-[40px] md:py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-colorPrimaryDark">專為毛孩設計的玩具</h4>
          <h2 class="text-colorBlack">專為毛孩打造，咬咬最對味</h2>
        </div>
        <div class="grid-template-areas">
          <UiProductCard
            v-for="item in toyProducts"
            :key="item.id"
            :product="item"
            class="animate-fadeInUp"
          />
        </div>
      </div>
    </section>
    <section class="bg-colorPrimaryLight">
      <div class="container py-[40px] md:py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-colorPrimaryDark">開箱測評</h4>
          <h2 class="text-colorBlack">寵物達人實測，選出最愛好物</h2>
        </div>
        <LayoutBoxSlider :articles="articles?.slice(0, 4)" />
      </div>
    </section>
    <section>
      <div class="container py-[40px] md:py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-colorPrimaryDark">毛孩專欄</h4>
          <h2 class="text-colorBlack">成為最懂毛孩的好主人</h2>
        </div>
        <div class="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <UiArticleCard
            v-for="item in articles?.slice(4, 8)"
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
useSeoMeta({
  title: '首頁'
})

const supbase = useSupabaseClient()
const categories = ['所有商品', '主食', '零食', '生活用品']
const activeCategory = ref('所有商品')
const toycategory = ref('玩具')

const { data: articles } = await useAsyncData(
  'articles',
  async () => {
    const { data, error } = await supbase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      showError('無法載入文章列表，請稍後再試')
      return []
    }

    return data
  },
  {
    server: false
  }
)

const categoryParam = computed(() => {
  return activeCategory.value === '所有商品' ? undefined : activeCategory.value
})

const { products: categoryProducts } = useProducts({
  limit: 8,
  categoryParam
})

const { products: toyProducts } = useProducts({
  limit: 4,
  categoryParam: toycategory
})

const handleCategoryChange = (category: string) => {
  activeCategory.value = category
}
</script>
