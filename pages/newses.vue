<template>
  <div>
    <LayoutBannerBreadcrumb title="最新消息" :links="[{ label: '最新消息' }]" />
    <section class="container py-[40px]">
      <main class="mx-auto max-w-3xl space-y-6">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="rounded-2xl border border-colorGray bg-white p-6 shadow-md"
        >
          <h2 class="mb-2 font-bold text-colorBlack">{{ news.title }}</h2>
          <p class="mb-4 text-sm text-colorGrayDark">{{ news.date }}</p>
          <div class="whitespace-pre-line text-base text-colorBlack">
            {{ news.content }}
          </div>
        </div>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
usePageSeo({
  title: '最新消息'
})

const newsList = ref([
  {
    title: '七夕寵物好禮限時特賣開跑！',
    date: '2025/07/28',
    content: `七夕將至，給毛孩一份浪漫的禮物吧！全館指定商品享 85 折優惠，滿千再贈品牌零食一包。
優惠期間：7/28 至 8/7，數量有限，送完為止！`
  },
  {
    title: '新品上市：原創貓咪插畫系列胸背帶',
    date: '2025/07/24',
    content: `本月推出「薄巧貓原創設計」插畫胸背帶系列，選用透氣網布與高彈力束繩，兼具舒適與造型。
S/M/L 三種尺寸可選，適合不同體型的貓主子，快來為毛孩挑一件夏日新裝吧！`
  },
  {
    title: '配送異動公告',
    date: '2025/07/21',
    content: `因應中南部豪雨影響，黑貓宅急便與超商取貨物流，部分地區配送可能延誤 1～2 個工作天。
造成不便敬請見諒，我們將密切追蹤物流動態，並盡快協助處理您的訂單。`
  }
])
</script>
