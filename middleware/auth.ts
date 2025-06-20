import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  const supabase = useSupabaseClient()

  if (userStore.user) return

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    userStore.logout()
    return navigateTo('/my-account')
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle()

  if (profileError || !profile) {
    userStore.logout()
    return navigateTo('/my-account')
  }

  userStore.setUser(profile)
})
