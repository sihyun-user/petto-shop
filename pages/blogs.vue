<template>
  <div>
    <LayoutBannerBreadcrumb title="寵物專欄" :links="[{ label: '寵物專欄' }]" />
    <section class="container py-[40px]">
      <div class="mb-10 grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
        <template v-for="article in articles" :key="article.id">
          <UiArticleCard :article="article" />
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const supbase = useSupabaseClient()
const { showError } = useAppToast()

usePageSeo({
  title: '寵物專欄'
})

const { data: articles } = useAsyncData('articles', async () => {
  const { data, error } = await supbase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    showError('無法載入文章列表，請稍後再試')
    return []
  }

  return data
})
</script>
