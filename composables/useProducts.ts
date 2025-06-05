import type { Product } from '@/types'

export const useProducts = ({ limit = 10 }: { limit?: number }) => {
  const supabase = useSupabaseClient()
  const route = useRoute()

  const page = computed(() => Number(route.query.page) || 1)
  const from = computed(() => (page.value - 1) * limit)
  const to = computed(() => from.value + limit - 1)

  const { data, pending, refresh } = useAsyncData('products', async () => {
    const { pet_type, category, subcategory, sort } = route.query

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(from.value, to.value)

    if (pet_type) query = query.eq('pet_type', pet_type as string)
    if (category) query = query.eq('category', category as string)
    if (subcategory) query = query.eq('subcategory', subcategory as string)

    if (sort === 'asc') {
      query = query.order('price', { ascending: true })
    } else if (sort === 'desc') {
      query = query.order('price', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    const { data, error, count } = await query

    if (error) throw createError({ statusCode: 500, statusMessage: '無法取得商品資料' })

    return {
      products: data as Product[],
      total: count ?? 0
    }
  })

  const products = computed(() => data.value?.products || [])
  const total = computed(() => data.value?.total || 0)

  return {
    refresh,
    pending,
    products,
    total
  }
}
