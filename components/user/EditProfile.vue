<template>
  <UForm :state="state" :schema="schema" class="space-y-4" @submit="submit">
    <UiFormGroupInput v-model="state.name" name="name" label="暱稱" placeholder="請輸入暱稱" />
    <UiFormGroupInput
      v-model="state.phone"
      name="phone"
      label="電話號碼"
      type="phone"
      placeholder="請輸入電話號碼"
    />
    <UiFormGroupInput
      v-model="state.email"
      name="email"
      label="電子信箱"
      type="email"
      placeholder="請輸入電子信箱"
      :disabled="true"
      required
    />
    <div class="flex justify-end">
      <UiBaseButton
        text="儲存"
        type="submit"
        :is-loading="isLoading"
        :is-disabled="!state.name && !state.phone"
      />
    </div>
  </UForm>
</template>
<script setup lang="ts">
import { z } from 'zod'
import { useUserStore } from '@/store/user'
import type { User } from '@/types'

const supabase = useSupabaseClient()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { showError, showSuccess } = useAppToast()

const isLoading = ref(false)
const state = ref({
  name: '',
  email: '',
  phone: ''
})

const schema = z.object({
  name: z.string().min(2, '暱稱至少需 2 個字').optional().or(z.literal('')),
  email: z.string().email('請輸入有效的電子信箱'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true
        return /^[0-9+\-\s]*$/.test(val) && val.length === 10
      },
      {
        message: '電話號碼格式錯誤'
      }
    )
})

const setStateUser = (userData: User) => {
  state.value.name = userData.name || ''
  state.value.email = userData.email || ''
  state.value.phone = userData.phone || ''
}

onMounted(() => {
  if (!user.value) {
    getUserProfile()
  }
})

watch(
  user,
  (val) => {
    if (val) {
      setStateUser(val)
    }
  },
  { deep: true, immediate: true }
)

const submit = async () => {
  if (!user.value) {
    showError('請先重新登入')
    userStore.logout()
    return
  }

  const { name, phone } = state.value

  if (!name && !phone) return

  isLoading.value = true

  try {
    const { error } = await (supabase.from('users') as any)
      .update({ name, phone })
      .eq('id', user.value!.id)

    if (error) throw error

    await getUserProfile()

    showSuccess('使用者資料已更新')
  } catch (error) {
    showError('更新使用者資料失敗')
  } finally {
    isLoading.value = false
  }
}
</script>
