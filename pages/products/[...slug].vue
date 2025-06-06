<template>
  <div>
    <LayoutBannerBreadcrumb :title="`${seoTitle.split('/').pop()}`" :links="breadcrumbLinks" />
    <section class="container flex py-[40px]">
      <div class="mr-5 hidden min-w-[200px] md:block">
        <UiAsideMenu />
      </div>
      <main class="w-full">
        <LayoutProductsFilterButton />
        <div class="mb-5 flex items-center gap-4 md:h-[36px]">
          <span v-if="!pending" class="text-sm text-colorBlack"
            >顯示 {{ products?.length }} 項結果，共 {{ total }} 項</span
          >
          <USelect
            v-model="sortOrder"
            class="ml-auto w-[150px] justify-end rounded-md border border-colorPrimary bg-white"
            variant="none"
            size="md"
            placeholder="排序方式"
            :options="[
              { label: '最新上架', value: 'newest' },
              { label: '價格由低到高', value: 'asc' },
              { label: '價格由高到低', value: 'desc' }
            ]"
          />
        </div>
        <template v-if="products.length > 0">
          <div class="mb-10 grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
            <UiProductCard
              v-for="item in products"
              :key="item.id"
              :product="item"
              class="animate-fadeInUp"
            />
          </div>
          <div class="flex justify-end">
            <UiBasePagination :total="total" :limit="limit" />
          </div>
        </template>
        <div v-if="pending" class="flex items-center justify-center">
          <UiLoadingSpinner styles="w-10 h-10 bg-colorPrimary" />
        </div>
        <div v-if="!pending && products?.length == 0" class="mb-10 text-colorBlack">
          無商品符合您的搜尋條件，請嘗試更改搜尋條件。
        </div>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const sortOrder = ref('newest')
const limit = ref(9)

const slug = (route.params.slug as string[] | undefined) ?? []
const { pet_type, category, subcategory } = useParsedParams(slug)

const seoTitle = computed(() => {
  const titleParts = []
  if (pet_type) titleParts.push(pet_type === '貓' ? '貓貓系列' : '狗狗系列')
  if (category) titleParts.push(category)
  if (subcategory) titleParts.push(subcategory)
  return titleParts.length > 0 ? `${titleParts.join('/')}` : '全館商品總覽'
})

usePageSeo({
  title: seoTitle.value
})

const breadcrumbLinks = computed(() => {
  const links = []

  const slug = route.params.slug as string[] | undefined
  const { pet_type, category, subcategory } = useParsedParams(slug ?? [])

  if (!slug) {
    links.push({ label: '全館商品總覽', to: '/products' })
  }

  if (pet_type === '貓') {
    links.push({ label: '貓貓系列' })
  } else if (pet_type === '狗') {
    links.push({ label: '狗狗系列' })
  }

  if (category) {
    links.push({ label: category as string })
  }

  if (subcategory) {
    links.push({ label: subcategory as string })
  }

  return links
})

const { pending, products, total } = useProducts({
  limit: limit.value
})

watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0 })
    sortOrder.value = (route.query.sort as string) || 'newest'
  },
  { flush: 'post' }
)

watch(
  () => sortOrder.value,
  (newSort) => {
    router.push({
      query: {
        ...route.query,
        sort: newSort
      }
    })
  }
)
</script>
