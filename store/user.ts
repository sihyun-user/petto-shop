import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>(null)

    const setUser = (newUser: User | null) => {
      user.value = newUser
    }

    const resetUser = () => {
      user.value = null
    }

    return {
      user,
      setUser,
      resetUser
    }
  },
  {
    persist: true
  }
)
