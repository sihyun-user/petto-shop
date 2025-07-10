<template>
  <section class="container pb-[125px] pt-[40px]">
    <main class="mx-auto flex max-w-4xl flex-col justify-between gap-8 md:flex-row">
      <div class="flex-1">
        <h2 class="mb-3 text-colorBlack">登入</h2>
        <div class="rounded-lg border border-colorGray bg-colorGrayLight p-4">
          <UForm
            class="mx-auto max-w-4xl space-y-4"
            :state="loginState"
            :schema="loginSchema"
            @submit="loginSubmit"
          >
            <UiFormGroupInput
              v-model="loginState.email"
              name="email"
              label="電子信箱"
              placeholder="請輸入電子信箱"
              required
            />
            <UiFormGroupInput
              v-model="loginState.password"
              name="password"
              label="密碼"
              type="password"
              placeholder="請輸入密碼"
              required
            />
            <div class="flex justify-end">
              <UiBaseButton
                text="送出"
                type="submit"
                :is-loading="isLoginLoading"
                :is-disabled="isRegisterLoading"
              />
            </div>
          </UForm>
        </div>
      </div>
      <div class="flex-1">
        <h2 class="mb-3 text-colorBlack">註冊</h2>
        <div class="rounded-lg border border-colorGray bg-colorGrayLight p-4">
          <UForm
            class="mx-auto max-w-4xl space-y-4"
            :state="registerState"
            :schema="registerSchema"
            @submit="registerSubmit"
          >
            <UiFormGroupInput
              v-model="registerState.email"
              name="email"
              label="電子信箱"
              placeholder="請輸入電子信箱"
              required
            />
            <UiFormGroupInput
              v-model="registerState.password"
              name="password"
              label="密碼"
              type="password"
              placeholder="請輸入密碼"
              required
            />
            <UiFormGroupInput
              v-model="registerState.confirmPassword"
              name="confirmPassword"
              label="確認密碼"
              type="password"
              placeholder="請輸入確認密碼"
              required
            />
            <div class="flex justify-end">
              <UiBaseButton
                text="送出"
                type="submit"
                :is-loading="isRegisterLoading"
                :is-disabled="isLoginLoading"
              />
            </div>
          </UForm>
        </div>
      </div>
    </main>
  </section>
</template>
<script setup lang="ts">
import { z } from 'zod'
import { getErrorMessage } from '@/utils/error'

definePageMeta({
  middleware: ['guest']
})

usePageSeo({
  title: '我的帳號'
})

const supabase = useSupabaseClient()
const { showSuccess, showError } = useAppToast()

// login
const initialLoginState = {
  email: '',
  password: ''
}
const isLoginLoading = ref(false)
const loginState = ref({
  ...initialLoginState
})

const loginSchema = z.object({
  email: z.string().email('請輸入有效的電子信箱'),
  password: z.string().min(6, '密碼至少需要6個字元')
})

const loginSubmit = async () => {
  isLoginLoading.value = true

  try {
    const { email, password } = loginState.value

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const errorMessage = getErrorMessage(error)
      showError(`登入失敗，${errorMessage}`)
      return
    }

    showSuccess('登入成功！歡迎回來')

    await getUserProfile()
    navigateTo('/')
  } catch (error) {
    showError('登入發生錯誤，請稍後再試')
  } finally {
    isLoginLoading.value = false
  }
}

// register
const initialRegisterState = {
  email: '',
  password: '',
  confirmPassword: ''
}
const isRegisterLoading = ref(false)
const registerState = ref({
  ...initialRegisterState
})

const registerSchema = z
  .object({
    email: z.string().email('請輸入有效的電子信箱'),
    password: z.string().min(6, '密碼至少需要6個字元'),
    confirmPassword: z.string().min(6, '確認密碼至少需要6個字元')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword']
  })

const registerSubmit = async () => {
  isRegisterLoading.value = true

  try {
    const { email, password } = registerState.value

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      const errorMessage = getErrorMessage(error)
      showError(`註冊失敗，${errorMessage}`)
    } else {
      showSuccess('註冊成功！請重新登入')
      resetForm()
    }
  } catch (error) {
    showError('註冊時發生錯誤，請稍後再試')
  } finally {
    isRegisterLoading.value = false
  }
}

const resetForm = () => {
  Object.assign(loginState.value, initialLoginState)
  Object.assign(registerState.value, initialRegisterState)
}
</script>
