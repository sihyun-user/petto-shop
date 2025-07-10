<template>
  <section class="container min-h-screen py-[40px]">
    <main v-if="order" class="mx-auto max-w-3xl">
      <template v-if="order.status === 1">
        <h2 class="flex items-center justify-center gap-2 font-bold text-colorBlack">
          <UIcon name="heroicons:check-circle-16-solid" class="text-green-500" />
          <span>付款成功</span>
        </h2>
        <p class="my-6 text-center text-colorBlack">
          感謝您的訂購，我們已收到您的付款，訂單正在處理中，請您稍候。
        </p>
      </template>
      <template v-if="order.status === 0">
        <h2 class="flex items-center justify-center gap-2 font-bold text-colorBlack">
          <UIcon name="heroicons:x-circle-16-solid" class="text-red-500" />
          <span>付款失敗</span>
        </h2>
        <p class="my-6 text-center text-colorBlack">
          您的訂單已經成功建立，但付款尚未完成，請您確認付款狀態或聯繫客服。
        </p>
      </template>
      <div class="w-full rounded-lg border border-colorGray bg-colorGrayLight p-4">
        <h4 class="-mx-4 border-b border-colorGray px-4 pb-2 font-semibold text-colorBlack">
          訂單資訊
        </h4>

        <div class="flex items-center justify-between p-4">
          <p class="text-sm text-colorBlack md:text-base">訂單編號</p>
          <p class="font-mono text-sm text-colorBlack md:text-base">{{ order.trade_no }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">訂單狀態</p>
          <p class="text-sm font-semibold text-colorBlack md:text-base">
            {{ order.status === 1 ? '已付款' : '付款失敗' }}
          </p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">訂單金額</p>
          <p class="text-sm text-colorBlack md:text-base">NT$ {{ order.amount }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">成立時間</p>
          <p class="text-sm text-colorBlack md:text-base">{{ formattedDate }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">收件人姓名</p>
          <p class="text-sm capitalize text-colorBlack md:text-base">{{ order.name }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">收件地址</p>
          <p class="text-sm text-colorBlack md:text-base">{{ order.address }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">聯絡電話</p>
          <p class="text-sm text-colorBlack md:text-base">{{ order.phone }}</p>
        </div>
        <div class="flex items-center justify-between border-t border-colorGray p-4">
          <p class="text-sm text-colorBlack md:text-base">電子郵件</p>
          <p class="text-sm text-colorBlack md:text-base">{{ order.email }}</p>
        </div>
      </div>

      <div class="mt-10 flex justify-center">
        <NuxtLink :to="`/user/${user?.id}/orders`">
          <UiBaseButton text="前往會員中心查看訂單" />
        </NuxtLink>
      </div>
    </main>
    <UiPageSpinner v-if="pending" />
  </section>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { Order } from '@/types'
import { useUserStore } from '@/store/user'

const route = useRoute()
const tradeNo = route.query.no as string

const supabase = useSupabaseClient()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { data: order, pending } = await useAsyncData<Order | null>(
  'order',
  async () => {
    const userId = user.value?.id

    if (!tradeNo || !userId) return null

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('trade_no', tradeNo)
      .maybeSingle()

    if (error || !data) return null

    return data
  },
  {
    server: false
  }
)

const formattedDate = computed(() => {
  const time = order.value?.created_at

  if (!time) return null
  return format(time, 'yyyy 月 MM 月 dd 日')
})
</script>
