<template>
  <div class="sliderWrapper">
    <Swiper
      :loop="true"
      :modules="modules"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="swiper"
    >
      <SwiperSlide v-for="(slide, index) in banners" :key="`slide-${index}`">
        <div
          class="container relative z-20 flex flex-col-reverse items-center justify-between md:flex-row"
        >
          <!-- 文字區 -->
          <div
            class="space-y-4 pb-[50px] pt-[30px] text-center text-colorBlack md:py-0 md:pr-5 md:text-left"
          >
            <h1 class="text-3xl font-bold md:text-4xl lg:text-5xl">
              {{ slide.title }}
            </h1>
            <h3 class="text-xl font-semibold text-colorPrimary md:text-2xl">
              {{ slide.subtitle }}
            </h3>
            <p class="text-base md:text-lg lg:text-xl">{{ slide.desc }}</p>
            <NuxtLink to="/" class="inline-block">
              <UiBaseButton text="立即購買" />
            </NuxtLink>
          </div>

          <!-- 圖片區 -->
          <div class="relative">
            <div
              class="h-[300px] w-[300px] rounded-full bg-colorPrimary lg:h-[400px] lg:w-[400px]"
            ></div>

            <div class="absolute -top-12 left-0 z-10 flex w-[350px] lg:w-[450px]">
              <NuxtImg :src="slide.img" alt="Banner Image" quality="80" class="" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination, Autoplay]

const banners = [
  {
    img: '/images/slider_img_1.png',
    title: '毛孩生活好物推薦',
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

<style scoped lang="scss">
.swiper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 0;

  @media (min-width: 768px) {
    padding-top: 80px;
    padding-bottom: 100px;
  }
}
.sliderWrapper {
  :global(.swiper-pagination-bullet) {
    width: 8px;
    height: 8px;

    border-radius: 40px;
    background: #967d6c;
  }
}
</style>
