<template>
  <div>
    <LayoutBaseHeader />
    <section class="container min-h-screen py-[40px]">
      <main class="mx-auto max-w-3xl">
        <UTabs
          :items="items"
          :selected="selectedIndex"
          :ui="{
            list: {
              base: 'border border-colorGray mb-4',
              height: 'h-12',
              background: 'bg-colorGrayLight',
              tab: {
                height: 'h-10',
                inactive: 'text-colorGrayDark',
                active: 'text-colorPrimary',
                font: 'font-semibold',
                size: 'text-base',
                icon: 'w-5 h-5'
              }
            }
          }"
          @change="onChange"
        />
        <NuxtPage />
      </main>
    </section>
    <LayoutBaseFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const items = [
  {
    key: 'profile',
    label: '個人資訊',
    icon: 'heroicons:user-circle-16-solid',
    path: ''
  },
  {
    key: 'orders',
    label: '我的訂單',
    icon: 'heroicons:clipboard-document-list-20-solid',
    path: '/orders'
  }
]

const selectedIndex = ref(0)

const updateSelectedIndex = (path: string) => {
  const index = items.findIndex((i) => path.endsWith(i.path))
  selectedIndex.value = index === -1 ? 0 : index
}
const onChange = (index: number) => {
  selectedIndex.value = index
  const userId = route.params.userId
  const path = items[index].path
  router.push(`/user/${userId}${path}`)
}

updateSelectedIndex(route.path)

watch(
  () => route.path,
  (newPath) => {
    updateSelectedIndex(newPath)
  }
)
</script>
