import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types'

export const useGetCart = () => {
  const supabase = useSupabaseClient()
  const cartStore = useCartStore()
  const { cartItems } = storeToRefs(cartStore)

  const fetchData = ref<Product[] | null>(null)
  const isLoading = ref(false)

  onMounted(async () => {
    if (!fetchData.value) {
      isLoading.value = true

      try {
        const cartIds = cartItems.value.map((item) => item.id)

        const { data, error } = await supabase.from('products').select('*').in('id', cartIds)

        if (error) {
          throw new Error('發生錯誤，請稍後再試！')
        }

        fetchData.value = data as Product[]
      } catch (error) {
        showError('發生錯誤，請稍後再試！')
      } finally {
        isLoading.value = false
      }
    }
  })

  const productData = computed(() => {
    if (!fetchData.value) return null

    const cartIds = cartItems.value.map((item) => item.id)

    return fetchData.value
      .filter((product) => cartIds.includes(product.id))
      .map((product: Product) => {
        const cartItem = cartItems.value.find((item) => item.id === product.id)
        return {
          ...product,
          quantity: cartItem?.quantity ?? 1
        }
      })
  })

  const totalPrice = computed(() => {
    return (
      productData.value?.reduce((total, item) => {
        const price = item.discount ? item.discount : item.price
        return total + price * item.quantity
      }, 0) ?? 0
    )
  })

  return {
    productData,
    isLoading,
    totalPrice
  }
}
