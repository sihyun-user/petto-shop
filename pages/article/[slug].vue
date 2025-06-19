<template>
  <section v-if="article">
    <NuxtImage
      :src="article.image"
      width="1920"
      height="400"
      class="h-[400px] w-full object-cover"
    />
  </section>
</template>
<script setup lang="ts">
const route = useRoute()
const supbase = useSupabaseClient()

const { showError } = useAppToast()

const { data: article } = await useAsyncData('article', async () => {
  const { data, error } = await supbase
    .from('articles')
    .select('*')
    .eq('title', route.params.slug)
    .single()

  if (error) {
    showError('無法載入文章，請稍後再試')
    return null
  }

  return data
})
</script>
