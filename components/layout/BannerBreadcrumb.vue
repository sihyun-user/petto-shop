<template>
  <div class="relative">
    <NuxtImg
      src="images/banner_bg_2.jpg"
      height="450"
      class="h-[150px] w-full object-cover md:h-[350px]"
    />
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="center-absolute flex flex-col items-center justify-center space-y-1 md:space-y-2">
      <h1 class="text-nowrap text-white">| {{ props.title }} |</h1>
      <UBreadcrumb
        divider="/"
        :links="props.links"
        :ui="{
          li: 'text-white',
          active: 'text-white'
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  links: { label: string }[]
}>()
</script>
