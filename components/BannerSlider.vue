<template>
  <ClientOnly>
    <div class="md: relative h-auto pt-[80px] md:h-screen md:pt-0">
      <!-- 背景圖 -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/images/banner_bg.jpg')"
      ></div>

      <!-- 白色透明遮罩 -->
      <div class="absolute inset-0 bg-white/70"></div>

      <!-- Swiper 輪播內容 -->
      <swiper-container
        class="relative z-10 h-full"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
      >
        <swiper-slide
          v-for="(slide, index) in banners"
          :key="`slide-${index}`"
          class="flex h-full items-center justify-center"
        >
          <div
            class="container relative z-20 mx-auto flex h-full flex-col-reverse items-center justify-between px-6 md:flex-row lg:px-12"
          >
            <!-- 文字區 -->
            <div
              class="space-y-4 pb-[100px] pt-[40px] text-center text-textPrimary md:p-0 md:text-left"
            >
              <h1 class="text-3xl font-bold md:text-4xl lg:text-5xl">
                {{ slide.title }}
              </h1>
              <h3 class="text-xl font-semibold text-colorPrimary md:text-2xl">
                {{ slide.subtitle }}
              </h3>
              <p class="text-base md:text-lg lg:text-xl">{{ slide.desc }}</p>
              <NuxtLink
                to="/"
                class="inline-block rounded bg-colorPrimary px-5 py-2 text-white hover:opacity-90"
              >
                立即購買
              </NuxtLink>
            </div>

            <!-- 圖片區 -->
            <div class="shake-0 flex">
              <div
                class="relative h-[350px] w-[350px] overflow-hidden rounded-full border-4 border-white shadow md:h-[380px] md:w-[380px] lg:h-[450px] lg:w-[450px]"
              >
                <NuxtImg
                  :src="slide.img"
                  alt="Banner Image"
                  class="h-full w-full object-cover"
                  quality="80"
                />
              </div>
            </div>
          </div>
        </swiper-slide>

        <div class="swiper-pagination absolute bottom-12 left-1/2 z-30 -translate-x-1/2" />
      </swiper-container>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const banners = [
  {
    img: '/images/slider_img_1.png',
    title: '花最少時間，買對毛孩好物',
    subtitle: '寵物食品 x 玩具 x 日用品',
    desc: '精選高評價商品，從挑選到下單超省時，讓你更有時間陪伴毛孩。'
  },
  {
    img: '/images/slider_img_2.png',
    title: '註冊會員現領優惠',
    subtitle: '立即購買省更多',
    desc: '加入會員享專屬折扣、生日禮、優惠通知，毛孩生活升級不多花錢。'
  },
  {
    img: '/images/slider_img_3.png',
    title: '輕鬆選對毛孩最愛',
    subtitle: '人氣熱銷商品推薦',
    desc: '精選天然糧食、益智玩具、舒壓配件，評價破表、毛孩最愛一次買齊。'
  }
]
</script>

<style scoped>
.swiper-pagination {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: red;
}
</style>
