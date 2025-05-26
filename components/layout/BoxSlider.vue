<template>
  <div class="sliderWrapper">
    <Swiper
      class="swiper"
      :modules="[Pagination, Navigation, Virtual]"
      :navigation="{ nextEl: nextElRef, prevEl: prevElRef }"
      :slides-per-view="1"
      :space-between="16"
      :loop="false"
      :breakpoints="{
        0: { slidesPerView: 1, slidesPerGroup: 1 },
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1200: { slidesPerView: 3, slidesPerGroup: 3 }
      }"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(card, index) in cards" :key="index">
        <UiBoxCard :data="card" />
      </SwiperSlide>
    </Swiper>
    <div v-show="!isAtStart" ref="prevElRef" class="swiper-button swiper-button-prev">
      <UIcon name="heroicons:arrow-left-16-solid" class="text-white" size="24" />
    </div>
    <div v-show="!isAtEnd" ref="nextElRef" class="swiper-button swiper-button-next">
      <UIcon name="heroicons:arrow-right-16-solid" class="text-white" size="24" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Virtual } from 'swiper/modules'
import 'swiper/css'

const nextElRef = ref<HTMLElement | null>(null)
const prevElRef = ref<HTMLElement | null>(null)
const isAtEnd = ref(false)
const isAtStart = ref(true)

const cards = ref([
  {
    title: '天然礦砂開箱',
    description: '低粉塵、不刺鼻，凝結力中上，鏟屎官友善度不錯！適合初入坑的貓奴。',
    image: '/images/unboxing_1.jpg'
  },
  {
    title: '狗狗潔牙零食開箱',
    description: '口味多元，適口性高，小型犬咀嚼剛剛好，還能幫助潔牙保健，毛爸媽推薦度高！',
    image: '/images/unboxing_2.jpg'
  },
  {
    title: '狗狗智能餵食機開箱',
    description: '定時定量控制 App 操作簡單，出門上班也能遠端照顧毛孩，便利度滿分！',
    image: '/images/unboxing_3.jpg'
  },
  {
    title: '貓咪逗貓棒實測',
    description: '開箱超人氣羽毛逗貓棒，彈性好、聲音誘人，完全激起主子的狩獵魂！',
    image: '/images/unboxing_4.jpg'
  },
  {
    title: '原木貓抓板開箱',
    description: '質感木製抓板，拆封就有淡淡木頭香，紋理清晰、貓咪超愛抓，放客廳也很好看。',
    image: '/images/unboxing_5.jpg'
  },
  {
    title: '除臭豆腐砂體驗',
    description: '淡綠茶香味清新自然，吸水快且不易崩，清潔起來輕鬆省事，貓咪也很買單！',
    image: '/images/unboxing_6.jpg'
  }
])

const onSlideChange = (swiper: any) => {
  isAtEnd.value = swiper.isEnd
  isAtStart.value = swiper.isBeginning
}
</script>
<style scoped lang="scss">
.sliderWrapper {
  position: relative;
}

.swiper-button {
  width: 38px;
  height: 38px;
  background: #967d6c;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all linear 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  i {
    color: #fff;
  }

  &-next {
    right: -10px;
  }

  &-prev {
    left: -10px;
  }
}
</style>
