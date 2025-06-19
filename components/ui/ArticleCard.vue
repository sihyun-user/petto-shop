<template>
  <div class="flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white shadow">
    <NuxtLink :to="`/article/${props.article.name}`" class="h-[200px] w-full overflow-hidden">
      <NuxtImg
        :src="props.article.image"
        height="200"
        class="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        alt="文章圖片"
      />
    </NuxtLink>

    <div class="flex flex-1 flex-col p-3 md:p-4">
      <NuxtLink :to="`/article/${props.article.name}`" class="mb-2 inline-block">
        <div class="text-sm text-colorBlack">{{ formattedDate }}</div>
        <h3 class="line-clamp-2 font-bold text-colorBlack hover:text-colorPrimaryDark">
          {{ props.article.name }}
        </h3>
      </NuxtLink>
      <div class="flex flex-1 flex-col justify-between space-y-2">
        <div class="line-clamp-3">{{ props.article.description }}</div>
        <NuxtLink :to="`/article/${props.article.name}`" class="w-fit">
          <UiLineButton
            icon="i-heroicons:arrow-long-right-solid"
            text="閱讀更多"
            styles="flex-row-reverse"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import type { Article } from '@/types'

const props = defineProps<{
  article: Article
}>()

const formattedDate = computed(() => {
  if (!props.article.created_at) return null
  return format(parseISO(props.article.created_at), 'yyyy.MM.dd')
})
</script>
