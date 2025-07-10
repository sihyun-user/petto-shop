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
import { useUserStore } from '@/store/user'

const colorMode = useColorMode()

onMounted(() => {
  colorMode.preference = 'light'
  const userStore = useUserStore()
  userStore.verifySession()
})
</script>
