<template>
  <div class="relative">
    <NuxtImg
      src="https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//other.jpg"
      height="450"
      class="h-[150px] w-full object-cover md:h-[350px]"
      alt="Banner Image"
    />
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="center-absolute flex flex-col items-center justify-center space-y-1 md:space-y-2">
      <h1 class="text-nowrap text-white">| {{ props.title }} |</h1>
      <UBreadcrumb
        divider="/"
        :links="[{ label: '首頁', to: '/' }, ...props.links]"
        :ui="{
          li: 'text-white',
          active: 'text-white',
          inactive: 'hover:text-white'
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
