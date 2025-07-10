import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  const supabase = useSupabaseClient()

  if (userStore.user) {
    return navigateTo('/')
  }

  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    return navigateTo('/')
  }
})
