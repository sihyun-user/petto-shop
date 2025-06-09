import type { Product } from '@/types'

export const useProducts = ({
  limit = 10,
  categoryParam = undefined,
  route
}: {
  limit?: number
  categoryParam?: Ref<string | undefined>
  route?: ReturnType<typeof useRoute>
}) => {
  const supabase = useSupabaseClient()

  const page = computed(() => Number(route?.query.page) || 1)
  const from = computed(() => (page.value - 1) * limit)
  const to = computed(() => from.value + limit - 1)

  const queryKey = computed(() => {
    const slug = route?.params.slug as string[] | undefined
    const { pet_type, category, subcategory } = useParsedParams(slug ?? [])
    const sort = route?.query?.sort
    const page = route?.query?.page

    return [
      'products',
      pet_type,
      category,
      subcategory,
      sort,
      page,
      limit,
      categoryParam?.value
    ].join('-')
  })

  const { data, pending, refresh } = useAsyncData(
    queryKey,
    async () => {
      const slug = route?.params.slug as string[] | undefined
      const { pet_type, category, subcategory } = useParsedParams(slug ?? [])
      const sort = route?.query?.sort

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
