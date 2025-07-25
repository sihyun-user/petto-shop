<template>
  <section v-if="article" class="container py-[40px]">
    <NuxtImg
      :src="article.image"
      class="mb-8 h-[150px] w-full object-cover md:h-[400px]"
      :alt="article.name"
    />
    <div class="mb-1">{{ formattedDate }}</div>
    <article v-dompurify-html="article.content"></article>
  </section>
</template>
<script setup lang="ts">
import { format } from 'date-fns'
import type { Article } from '@/types'

const route = useRoute()
const supbase = useSupabaseClient()

const { data: article } = await useAsyncData<Article | null>('article', async () => {
  const { data, error } = await supbase
    .from('articles')
    .select('*')
    .eq('name', route.params.slug)
    .single()

  if (error) return null

  usePageSeo({
    title: (data as Article).name,
    description: (data as Article).description,
    image: (data as Article).image
  })

  return data
})

const formattedDate = computed(() => {
  if (!article.value) return null
  return format(article.value.created_at, 'yyyy/MM/dd')
})
</script>
