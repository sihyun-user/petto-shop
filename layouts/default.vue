<template>
  <div>
    <BaseHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'petto-shop 寵物食品、玩具與用品，讓你的寵物更快樂',
  description:
    '探索 petto-shop 提供的各式寵物食品、玩具和用品，為你的愛寵挑選最好的產品，讓牠們更健康、快樂！',
  ogTitle: 'petto-shop 寵物食品、玩具與用品，讓你的寵物更快樂',
  ogDescription:
    '探索 petto-shop 提供的各式寵物食品、玩具和用品，為你的愛寵挑選最好的產品，讓牠們更健康、快樂！',
  ogImage: 'https://fakeimg.pl/250x100/',
  ogUrl: 'https://yourdomain.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'petto-shop 寵物食品、玩具與用品，讓你的寵物更快樂',
  twitterDescription:
    '探索 petto-shop 提供的各式寵物食品、玩具和用品，為你的愛寵挑選最好的產品，讓牠們更健康、快樂！',
  twitterImage: 'https://fakeimg.pl/250x100/'
})

useHead({
  titleTemplate: '%s | petto-shop 寵物食品、玩具與用品，讓你的寵物更快樂'
})
</script>
<style>
body {
  font-family: 'Helvetica Neue', 'PingFang TC', 'Heiti TC', '微軟正黑體', sans-serif;
}
</style>
