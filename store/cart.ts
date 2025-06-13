import { defineStore } from 'pinia'
import type { CartItem } from '@/types'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([])

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

    const updateQuantity = ({ id, quantity }: { id: string; quantity: number }) => {
      const item = cartItems.value.find((item) => item.id === id)
      if (item) item.quantity = quantity
    }

    return {
      cartItems,
      addItem,
      removeItem,
      clearCart,
      updateQuantity
    }
  },
  {
    persist: true
  }
)
