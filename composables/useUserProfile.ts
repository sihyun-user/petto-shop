import { useUserStore } from '@/store/user'

export const getUserProfile = async () => {
  const supabase = useSupabaseClient()
  const userStore = useUserStore()

  const { showError } = useAppToast()

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) throw error

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profileError || !profile) throw profileError

    userStore.setUser(profile)

    return data
  } catch (error) {
    showError('取得使用者資料失敗')
  }
}
