<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications
      :ui="{
        position: ''
      }"
      class="top-center-notification"
    />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

onMounted(() => {
  colorMode.preference = 'light'
})
</script>
