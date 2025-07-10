import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.verifySession()
})
