<template>
  <section class="container min-h-screen py-[40px]">
    <main v-if="productData" class="mx-auto max-w-3xl">
      <h3 class="mb-4 text-colorBlack">結帳</h3>
      <UForm
        ref="formRef"
        class="mx-auto max-w-4xl space-y-8"
        :state="state"
        :schema="schema"
        @error="onError"
        @submit="onSubmit"
      >
        <div class="w-full space-y-4 rounded border border-colorGray bg-colorGrayLight p-4">
          <h4 class="-mx-4 border-b border-colorGray px-4 pb-2 text-colorBlack">帳單資訊</h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UiFormGroupInput
              v-model="state.lastName"
              name="lastName"
              label="名字"
              placeholder="請輸入名字"
              required
            />
            <UiFormGroupInput
              v-model="state.firstName"
              name="firstName"
              label="姓氏"
              placeholder="請輸入姓氏"
              required
            />
          </div>
          <UFormGroup label="縣/市" name="city" required>
            <UiBaseSelect v-model="state.city" :options="cityOptions" placeholder="請選擇縣/市" />
          </UFormGroup>
          <UFormGroup label="鄉鎮市" name="area" required>
            <UiBaseSelect v-model="state.area" :options="areaOptions" placeholder="請選擇縣/市" />
          </UFormGroup>
          <UiFormGroupInput
            v-model="state.address"
            name="address"
            label="地址"
            placeholder="請輸入地址"
            required
          />
          <UiFormGroupInput
            v-model="state.phone"
            name="phone"
            label="電話"
            type="tel"
            placeholder="請輸入電話"
            required
          />
          <UiFormGroupInput
            v-model="state.email"
            name="email"
            label="電子信箱"
            placeholder="請輸入電子信箱"
            required
          />
        </div>
        <div class="w-full rounded border border-colorGray bg-colorGrayLight p-4">
          <h4 class="-mx-4 border-b border-colorGray px-4 pb-2 text-colorBlack">您的訂單</h4>
          <UTable
            :columns="columns"
            :rows="productData"
            :empty-state="{
              icon: 'i-heroicons-shopping-cart-solid',
              label: '您的購物車裡還沒有任何商品。'
            }"
            :ui="{
              th: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
              td: { color: 'text-colorBlack', base: 'border-b border-colorGray' }
            }"
          >
            <template #image-data="{ row }">
              <NuxtImg
                :src="row.images[0]"
                :alt="row.name"
                class="h-16 w-20 min-w-20 rounded object-cover"
              />
            </template>
            <template #price-data="{ row }"> ${{ row.discount ?? row.price }} </template>
            <template #total-data="{ row }">
              ${{ row.discount ? row.discount * row.quantity : row.price * row.quantity }}
            </template>
          </UTable>
          <div class="flex items-center justify-between p-4">
            <p class="text-sm text-colorBlack md:text-base">總計</p>
            <p class="text-xl font-bold text-colorBlack md:text-2xl">NT${{ totalPrice }}</p>
          </div>
          <div class="flex items-center justify-between border-t border-colorGray p-4">
            <p class="text-sm text-colorBlack md:text-base">運送方式</p>
            <p class="text-sm text-colorBlack md:text-base">常溫宅配 (免運費)</p>
          </div>
          <div class="flex items-center justify-between border-t border-colorGray p-4">
            <p class="text-sm text-colorBlack md:text-base">付款方式</p>
            <p class="text-sm text-colorBlack md:text-base">綠界信用卡</p>
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-4">
          <NuxtLink to="/cart">
            <UiLineButton text="返回購物車" styles="md:px-9 md:py-3" />
          </NuxtLink>
          <UiBaseButton text="信用卡結帳" type="submit" :is-loading="isLoading" />
        </div>
      </UForm>
    </main>
    <UiPageSpinner v-if="isProductLoading" />
  </section>
</template>
<script setup lang="ts">
import { z } from 'zod'
import type { FormErrorEvent } from '#ui/types'
import { twCities } from '@/utils/twCities'

usePageSeo({
  title: '結帳'
})

const columns = [
  { key: 'image', label: '圖片' },
  { key: 'name', label: '商品' },
  { key: 'price', label: '價格' },
  { key: 'quantity', label: '數量' },
  { key: 'total', label: '總計' }
]

const state = ref({
  lastName: '',
  firstName: '',
  address: '',
  city: '臺北市',
  area: '',
  email: '',
  phone: ''
})
const isLoading = ref(false)

const { isLoading: isProductLoading, productData, totalPrice } = useGetCart()

const schema = z.object({
  lastName: z.string().min(1, '名字為必填項目'),
  firstName: z.string().min(1, '姓氏為必填項目'),
  address: z.string().min(5, '地址為必填項目'),
  email: z.string().email('請輸入有效的電子信箱'),
  city: z.string().min(1, '縣/市為必填項目'),
  area: z.string().min(1, '鄉鎮市為必填項目'),
  phone: z
    .string()
    .min(10, '電話號碼為必填項目')
    .regex(/^[0-9+\-\s]*$/, '電話號碼格式錯誤')
})

const cityOptions = computed(() => twCities.map((city) => city.name))

const areaOptions = computed(() => {
  const selectedCity = twCities.find((city) => city.name === state.value.city)
  if (!selectedCity) return []
  return selectedCity.districts.map((d) => d.name)
})

watch(
  () => state.value.city,
  () => {
    state.value.area = ''
  }
)

const formRef = ref<HTMLFormElement | null>(null)

const onError = (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id)

  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => {
    element?.focus()
  }, 300)
}

const onSubmit = () => {}
</script>
