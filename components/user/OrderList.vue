<template>
  <UTable
    row-key="id"
    :columns="columns"
    :rows="orderData || []"
    :empty-state="{
      icon: 'i-heroicons:clipboard-document-list-20-solid',
      label: '您目前沒有任何訂單。'
    }"
    :ui="{
      th: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
      td: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
      emptyState: {
        icon: 'w-10 h-10 text-colorGrayDark'
      }
    }"
  >
    <template #status-data="{ row }">
      <p>{{ row.status === 'paid' ? '已付款' : '付款失敗' }}</p>
      <time>{{ row.finish_time }}</time>
    </template>

    <template #created_at-data="{ row }">
      <time>{{ format(row.created_at, 'yyyy/MM/dd HH:mm:ss') }}</time>
    </template>

    <template #action-data="{ row }">
      <NuxtLink
        :to="`/checkout/order-result?no=${row.trade_no}`"
        class="flex items-center justify-center"
      >
        <UButton
          variant="ghost"
          size="sm"
          class="bg-colorSecondary font-medium text-white hover:bg-colorSecondaryDark"
          >查看訂單</UButton
        >
      </NuxtLink>
    </template>

    <template #empty-state>
      <div class="flex w-full flex-col items-center justify-center py-10 text-colorGrayDark">
        <UIcon name="i-heroicons:clipboard-document-list-20-solid" class="mb-2 h-10 w-10" />
        <p class="text-sm">您目前沒有任何訂單。</p>
      </div>
    </template>
  </UTable>
</template>
<script setup lang="ts">
import { format } from 'date-fns'
import type { Order } from '@/types'
import { useUserStore } from '@/store/user'

const columns = [
  { key: 'trade_no', label: '訂單號碼' },
  { key: 'created_at', label: '訂單日期' },
  { key: 'amount', label: '合計' },
  { key: 'status', label: '付款狀態' },
  { key: 'action', label: '' }
]

const supabase = useSupabaseClient()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { data: orderData } = await useAsyncData<Order[]>('orders', async () => {
  if (!user.value) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })

  return error || !data ? [] : data
})
</script>
