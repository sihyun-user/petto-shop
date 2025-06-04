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

  return {
    showSuccess,
    showError
  }
}
