import type { Product } from '@/types'

export const useProducts = ({
  limit = 10,
  categoryParam = undefined
}: {
  limit?: number
  categoryParam?: Ref<string | undefined>
}) => {
  const supabase = useSupabaseClient()
  const route = useRoute()

  const page = computed(() => Number(route.query.page) || 1)
  const from = computed(() => (page.value - 1) * limit)
  const to = computed(() => from.value + limit - 1)

  const queryKey = computed(() => {
    const { pet_type, category, subcategory, sort, page } = route.query
    return [
      'products',
      pet_type || '',
      category || '',
      subcategory || '',
      sort || '',
      page || '',
      limit,
      categoryParam?.value
    ].join('-')
  })

  const { data, pending, refresh } = useAsyncData(
    queryKey,
    async () => {
      const { pet_type, category, subcategory, sort } = route.query

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .range(from.value, to.value)

      const categoryToUse = categoryParam?.value ?? (category as string | undefined)
      if (categoryToUse) query = query.eq('category', categoryToUse)

      if (pet_type) query = query.eq('pet_type', pet_type as string)
      if (subcategory) query = query.eq('subcategory', subcategory as string)

      if (sort === 'asc') {
        query = query.order('price', { ascending: true })
      } else if (sort === 'desc') {
        query = query.order('price', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data, error, count } = await query

      if (error) {
        showError('發生錯誤，請稍後再試！')
        return { products: [], total: 0 }
      }

      return {
        products: data as Product[],
        total: count ?? 0
      }
    },
    {
      server: true,
      lazy: false
    }
  )

  const products = computed(() => data.value?.products ?? [])
  const total = computed(() => data.value?.total ?? 0)

  return {
    refresh,
    pending,
    products,
    total
  }
}
