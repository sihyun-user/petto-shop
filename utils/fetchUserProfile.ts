const fetchUserProfile = async () => {
  const supabase = useSupabaseClient()

  const { data: authUser, error: authError } = await supabase.auth.getUser()

  if (authError || !authUser?.user) throw authError

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.user.id)
    .maybeSingle()

  if (profileError || !profile) throw profileError

  return profile
}

export default fetchUserProfile
