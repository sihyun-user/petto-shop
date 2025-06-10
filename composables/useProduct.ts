import type { Product } from '@/types'

export const useProduct = (slug: string) => {
  const supabase = useSupabaseClient()

  const { data, pending, error } = useAsyncData<Product | null>(
    `product-${slug}`,
    async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (error || !data) return null

      return data
    },
    {
      server: true,
      lazy: !slug
    }
  )

  return { data, pending, error }
}
