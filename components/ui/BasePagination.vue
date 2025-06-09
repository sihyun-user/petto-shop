<template>
  <div class="flex justify-center">
    <UPagination
      v-model="page"
      :page-count="limit"
      :total="props.total"
      :to="getPageLink"
      :ui="{
        default: {
          size: 'md',
          activeButton: {
            class: 'bg-colorPrimary text-white hover:bg-colorPrimaryDark'
          },
          inactiveButton: {
            class: 'hover:bg-white text-colorBlack hover:text-colorPrimaryDark'
          },
          prevButton: {
            class: 'text-colorBlack bg-white'
          },
          nextButton: {
            class: 'text-colorBlack bg-white'
          }
        }
      }"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    total: number
    limit?: number
  }>(),
  {
    total: 0,
    limit: 10
  }
)

const route = useRoute()

const page = ref(Number(route.query.page) || 1)

const getPageLink = (page: number) => {
  return {
    path: route?.path ?? '/',
    query: {
      ...route.query,
      page
    }
  }
}
</script>
