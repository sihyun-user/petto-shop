import { defineStore } from 'pinia'
import type { CartItem } from '@/types'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([])
    const { showRemoveCartSuccess } = useAppToast()

    const cartAmount = computed(() => {
      return cartItems.value.reduce((amount, item) => amount + item.quantity, 0)
    })

    const addItem = ({ id, quantity }: { id: string; quantity: number }) => {
      const data = cartItems.value.find((item) => item.id === id)
      if (data) {
        data.quantity += quantity
      } else {
        cartItems.value.push({ id, quantity })
      }
    }

    const removeItem = (id: string) => {
      cartItems.value = cartItems.value.filter((item) => item.id !== id)
    }

    const clearCart = () => {
      cartItems.value = []
    }

    const setUpdateQuantity = ({
      id,
      name,
      quantity
    }: {
      id: string
      name: string
      quantity: number
    }) => {
      if (quantity === 0) {
        removeItem(id)
        showRemoveCartSuccess(name)
      } else {
        const item = cartItems.value.find((item) => item.id === id)
        if (item) item.quantity = quantity
      }
    }

    return {
      cartItems,
      cartAmount,
      addItem,
      removeItem,
      clearCart,
      setUpdateQuantity
    }
  },
  {
    persist: true
  }
)
