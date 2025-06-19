<template>
  <div
    class="relative h-[180px] w-full overflow-hidden rounded-lg bg-cover bg-center px-[30px] py-[40px]"
    :style="{ backgroundImage: `url(${props.data.image})` }"
  >
    <NuxtLink :to="`/article/${props.data.name}`">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 w-[80%]">
        <h4 class="mb-1 text-white">{{ props.data.name }}</h4>
        <p class="line-clamp-2 text-sm text-white/80">{{ props.data.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import type { Article } from '@/types'

const props = defineProps<{
  data: Article
}>()
</script>
