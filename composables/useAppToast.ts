export const useAppToast = () => {
  const toast = useToast()

  const showSuccess = (message: string) => {
    toast.add({
      title: '成功',
      description: message,
      color: 'green',
      icon: 'i-heroicons-check-circle'
    })
  }

  const showError = (message: string) => {
    toast.add({
      title: '錯誤',
      description: message,
      color: 'red',
      icon: 'i-heroicons-exclamation-circle'
    })
  }

  const addProductSuccess = (name: string) => {
    toast.add({
      title: '已加入購物車',
      description: `商品 ${name} 已成功加入購物車！`,
      color: 'green',
      icon: 'heroicons:check-circle-20-solid'
    })
  }

  const removeProductSuccess = (name: string) => {
    toast.add({
      title: '已移除商品',
      description: `商品 ${name} 已成功從購物車中移除！`,
      color: 'yellow',
      icon: 'heroicons:trash-20-solid'
    })
  }

  return {
    showSuccess,
    showError,
    addProductSuccess,
    removeProductSuccess
  }
}
