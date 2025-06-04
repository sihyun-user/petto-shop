<template>
  <div>
    <LayoutBannerBreadcrumb title="關於我們" :links="[{ label: '關於我們' }]" />
    <section class="container pt-[40px]">
      <div class="w-full rounded border border-colorGray bg-colorGrayLight p-4">
        <UForm
          class="mx-auto my-8 max-w-4xl space-y-4"
          :state="state"
          :schema="schema"
          @submit="submit"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UiFormGroupInput
              v-model="state.subject"
              name="subject"
              label="主旨"
              placeholder="請輸入主旨"
              required
            />
            <UiFormGroupInput
              v-model="state.name"
              name="name"
              label="姓名"
              placeholder="請輸入姓名"
              required
            />
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UiFormGroupInput
              v-model="state.email"
              name="email"
              label="電子信箱"
              placeholder="請輸入電子郵件"
              required
            />
            <UiFormGroupInput
              v-model="state.phone"
              name="phone"
              label="電話"
              placeholder="請輸入電話"
            />
          </div>
          <UFormGroup label="內容" name="message" required>
            <UTextarea
              v-model="state.message"
              placeholder="請輸入您的問題或建議"
              class="rounded-md border border-colorGray bg-white text-colorBlack"
              variant="none"
              :rows="12"
            />
          </UFormGroup>
          <UiBaseButton text="送出" type="submit" :is-loading="isLoading" />
        </UForm>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { z } from 'zod'

usePageSeo({
  title: '聯絡我們'
})
const { showSuccess, showError } = useAppToast()

const state = ref({
  subject: '',
  name: '',
  email: '',
  phone: '',
  message: ''
})
const isLoading = ref(false)

const schema = z.object({
  subject: z.string().min(2, '主旨為必填項目'),
  name: z.string().min(2, '姓名為必填項目'),
  email: z.string().email('請輸入有效的電子郵件地址'),
  phone: z.string().optional(),
  message: z.string().min(10, '內容至少需要10個字')
})

const submit = () => {
  const result = schema.safeParse(state.value)

  isLoading.value = true

  if (!result.success) {
    showError('請檢查輸入的資料是否正確')
    return
  }

  showSuccess('感謝您的聯絡，我們會盡快回覆您！')

  isLoading.value = false
}
</script>
