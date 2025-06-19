<template>
  <section class="container min-h-screen py-[40px]">
    <main class="mx-auto max-w-3xl">
      <h3 class="mb-4 text-colorBlack">我的帳戶</h3>
      <UTabs
        :items="items"
        :ui="{
          list: {
            base: 'border border-colorGray',
            height: 'h-12',
            background: 'bg-colorGrayLight',
            tab: {
              height: 'h-10',
              inactive: 'text-colorGrayDark',
              active: 'text-colorPrimary',
              font: 'font-semibold',
              size: 'text-base',
              icon: 'w-5 h-5'
            }
          }
        }"
      >
        <template #item="{ item }">
          <div class="mt-5 rounded-lg border border-colorGray bg-colorGrayLight p-4">
            <div v-if="item.key === 'profile'" class="space-y-3">
              <UForm :state="state" :schema="schema" class="space-y-4">
                <UiFormGroupInput
                  v-model="state.name"
                  name="name"
                  label="暱稱"
                  placeholder="請輸入暱稱"
                />
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
                  <UiBaseButton text="儲存" type="submit" :is-loading="false" />
                </div>
              </UForm>
            </div>
            <div v-else-if="item.key === 'orders'" class="space-y-3"></div>
          </div>
        </template>
      </UTabs>
    </main>
  </section>
</template>
<script setup lang="ts">
import { z } from 'zod'
import { useUserStore } from '@/store/user'
import type { User } from '@/types'

usePageSeo({
  title: '我的帳戶'
})

const items = [
  {
    key: 'profile',
    label: '個人資訊',
    icon: 'heroicons:user-circle-16-solid',
    content: '個人資訊'
  },
  {
    key: 'orders',
    label: '我的訂單',
    icon: 'i-heroicons:clipboard-document-check',
    content: '我的訂單'
  }
]

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

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
    .regex(/^[0-9+\-\s]*$/, '電話號碼格式錯誤')
    .min(10, '電話號碼長度不足')
    .optional()
    .or(z.literal(''))
})

onMounted(() => {
  if (!user.value) {
    getUserProfile()
  }
})

watch(user, (val) => {
  if (val) {
    setStateUser(val)
  }
})

const setStateUser = (userData: User) => {
  state.value.name = userData.name || ''
  state.value.email = userData.email || ''
  state.value.phone = userData.phone || ''
}
</script>
