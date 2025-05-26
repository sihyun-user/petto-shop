<template>
  <div
    class="relative h-[180px] w-full overflow-hidden rounded-lg bg-cover bg-center px-[30px] py-[65px]"
    :style="{ backgroundImage: `url(${props.data.image})` }"
  >
    <NuxtLink to="/">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="relative z-10 w-[60%] text-white">
        <h4 class="line-clamp-1">{{ props.data.title }}</h4>
        <p class="line-clamp-2">{{ props.data.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  data: {
    title: string
    description: string
    image: string
  }
}>()
</script>
