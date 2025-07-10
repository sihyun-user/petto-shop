import { defineStore } from 'pinia'
import type { User } from '@/types'
import fetchUserProfile from '@/utils/fetchUserProfile'

export const useUserStore = defineStore(
  'user',
  () => {
    const supabase = useSupabaseClient()

    const user = ref<User | null>(null)
    const isLogin = computed(() => !!user.value)

    const setUser = (newUser: User | null) => {
      user.value = newUser
    }

    const logout = async () => {
      await supabase.auth.signOut()
      user.value = null
      navigateTo('/my-account')
    }

    const verifySession = async () => {
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData?.session) {
        await supabase.auth.signOut()
        user.value = null
        return
      }

      const {
        data: { user: authUser }
      } = await supabase.auth.getUser()

      if (!authUser) {
        await supabase.auth.signOut()
        user.value = null
        return
      }

      const profile = await fetchUserProfile()

      user.value = profile
    }

    return {
      user,
      isLogin,
      setUser,
      logout,
      verifySession
    }
  },
  {
    persist: true
  }
)
