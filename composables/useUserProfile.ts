import { useUserStore } from '@/store/user'
const supabase = useSupabaseClient()

export const getUserProfile = async () => {
  const userStore = useUserStore()

  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) return null

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .maybeSingle()

  if (error) return null

  userStore.setUser(data)

  return data
}
