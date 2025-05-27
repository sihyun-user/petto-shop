<template>
  <div class="flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white shadow">
    <NuxtLink to="/" class="h-[200px] w-full overflow-hidden">
      <NuxtImg
        :src="props.article.image"
        height="200"
        class="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        alt="文章圖片"
      />
    </NuxtLink>

    <div class="flex flex-1 flex-col justify-between p-3 md:p-4">
      <NuxtLink to="/" class="mb-2 inline-block">
        <div class="text-sm text-textPrimary">
          {{ format(new Date(props.article.date), 'yyyy.MM.dd') }}
        </div>
        <h3 class="line-clamp-2 font-bold text-textPrimary hover:text-textSecondary">
          {{ props.article.name }}
        </h3>
      </NuxtLink>
      <div class="flex flex-col space-y-2">
        <div class="line-clamp-3">{{ props.article.description }}</div>
        <UiLineButton
          icon="i-heroicons:arrow-long-right-solid"
          text="閱讀更多"
          class="w-fit flex-row-reverse"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atricle } from '~/types'
import { format } from 'date-fns'

const props = defineProps<{
  article: Atricle
}>()
</script>
