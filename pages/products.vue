<template>
  <div>
    <LayoutBannerBreadcrumb title="全館商品總覽" :links="breadcrumbLinks" />
    <section class="container flex py-[40px]">
      <div class="mr-5 hidden min-w-[200px] md:block">
        <UiAsideMenu />
      </div>
      <main class="w-full">
        <LayoutProductsFilterButton />
        <div class="mb-5 flex items-center justify-between md:h-[36px]">
          <span class="text-sm text-colorBlack"
            >顯示 {{ (products && products.length) || 0 }} 項結果，共 {{ total || 0 }} 項</span
          >
          <USelect
            v-model="sortOrder"
            class="ml-4 w-[150px] rounded-md border border-colorPrimary bg-white"
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
        <template v-if="products && products.length > 0">
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
        <div v-else class="mb-10 text-colorBlack">無商品符合您的搜尋條件，請嘗試更改搜尋條件。</div>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
usePageSeo({
  title: '全館商品總覽'
})

const route = useRoute()
const router = useRouter()
const sortOrder = ref('newest')
const limit = ref(9)

const breadcrumbLinks = computed(() => {
  const links = []

  const { pet_type, category, subcategory } = route.query

  if (pet_type === 'cat') {
    links.push({ label: '貓貓系列' })
  } else if (pet_type === 'dog') {
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

const { products, total, refresh } = useProducts({
  limit: limit.value
})

watch(
  [() => route.fullPath],
  () => {
    refresh()
  },
  { immediate: true }
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
  },
  { immediate: true }
)
</script>
