import { defineStore } from 'pinia'
import type { User } from '@/types'

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

    return {
      user,
      isLogin,
      setUser,
      logout
    }
  },
  {
    persist: true
  }
)
