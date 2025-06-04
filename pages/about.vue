<template>
  <div>
    <LayoutBannerBreadcrumb title="聯絡我們" :links="[{ label: '聯絡我們' }]" />
    <section class="container flex flex-col-reverse gap-4 py-[60px] md:flex-row md:gap-6">
      <div>
        <h4 class="text-colorPrimaryDark">關於 Petto Shop</h4>
        <h2 class="text-colorBlack">用心守護毛孩健康的每一天</h2>
        <p class="pt-5 text-colorBlack">
          Petto Shop
          是一間專為毛小孩打造的專業寵物保健商城，嚴選國內外優質品牌，提供多元的寵物食品與保健品選擇。無論是預防狗狗白內障、加強關節保養、改善腸胃、強化免疫系統，或是呵護眼耳與口腔健康，我們都希望成為每一位飼主最安心的選擇。
          我們相信，毛孩不只是寵物，而是家人。
        </p>
        <p class="pt-5 text-colorBlack">
          Petto Shop
          堅持產品來源透明、安全有效，並持續關注最新的動物營養趨勢，讓每位毛孩都能享有最適合的照護與營養補充。
          除了提供產品，我們也定期更新照護知識與優惠活動，陪伴您一起打造毛孩健康、快樂的生活日常。
        </p>
      </div>
      <NuxtImg
        src="images/banner_bg_2.jpg"
        height="450"
        class="h-[200px] w-full rounded-lg object-cover md:h-[300px]"
      />
    </section>
    <section class="bg-colorPrimaryLight">
      <div class="container py-[60px]">
        <div class="mb-7 space-y-1 text-center">
          <h4 class="text-colorPrimaryDark">為什麼選擇我們</h4>
          <h2 class="text-colorBlack">專業挑選、品質保證，給毛孩最安心的照護</h2>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <UiAboutBoxCard
            title="專業保健"
            description="我們用心挑選每一項保健商品，堅持高品質與安全標準，幫助您維持健康、提升生活品質。"
            svg-icon="SvgAboutBoxHealth"
          />
          <UiAboutBoxCard
            title="趣味玩具"
            description="精選多款寵物玩具，讓毛孩在玩樂中釋放精力、提升互動，陪牠開心每一天。"
            svg-icon="SvgAboutBoxDog"
          />
          <UiAboutBoxCard
            title="洗護用品"
            description="專為寵物設計的洗護用品，溫和不刺激，有效潔淨、呵護毛孩每一寸肌膚。"
            svg-icon="SvgAboutBoxBath"
          />
          <UiAboutBoxCard
            title="認證店面"
            description="嚴格把關，贏得多方評鑑肯定，致力提供最佳購物體驗。"
            svg-icon="SvgAboutBoxMedal"
          />
        </div>
      </div>
    </section>
    <section>
      <UiBaseButton text="播放影片" @click="isOpen = true"></UiBaseButton>

      <UModal v-model="isOpen" size="lg">
        <div class="relative h-0 pb-[56%]">
          <iframe
            class="absolute left-0 top-0 h-full w-full"
            src="https://www.youtube.com/embed/F3zw1Gvn4Mk?autoplay=1"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="YouTube video player"
          ></iframe>
        </div>
      </UModal>
    </section>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)
</script>
