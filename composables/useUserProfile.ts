import { useUserStore } from '@/store/user'
import fetchUserProfile from '@/utils/fetchUserProfile'

export const getUserProfile = async () => {
  const userStore = useUserStore()
  const { showError } = useAppToast()

  try {
    const profile = await fetchUserProfile()

    userStore.setUser(profile)

    return profile
  } catch (error) {
    showError('取得使用者資料失敗')
  }
}
