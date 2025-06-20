<template>
  <UTable
    row-key="id"
    :columns="columns"
    :rows="orderData"
    :empty-state="{
      icon: 'i-heroicons-shopping-cart-solid',
      label: '您目前沒有任何訂單。'
    }"
    :ui="{
      th: { color: 'text-colorBlack', base: 'border-b border-colorGray' },
      td: { color: 'text-colorBlack', base: 'border-b border-colorGray' }
    }"
  >
    <template #status-data="{ row }">
      <p>{{ row.status }}</p>
      <time>{{ row.finish_time }}</time>
    </template>

    <template #action-data="{ row }">
      <UButton
        :to="`/user/order/${row.id}`"
        variant="ghost"
        size="sm"
        class="font-mediun bg-colorSecondary text-white hover:bg-colorSecondaryDark"
        >查看訂單</UButton
      >
    </template>
  </UTable>
</template>
<script setup lang="ts">
const columns = [
  { key: 'order_id', label: '訂單號碼' },
  { key: 'created_at', label: '訂單日期' },
  { key: 'total', label: '合計' },
  { key: 'status', label: '訂單狀態' },
  { key: 'action', label: '' }
]

const orderData = ref([
  {
    id: 1,
    order_id: '20250609140201413',
    created_at: '2025-06-09',
    total: 1500,
    status: '已完成',
    finish_time: '2025-06-09'
  },
  {
    id: 2,
    order_id: '20250609140201414',
    created_at: '2025-06-10',
    total: 2000,
    status: '待付款',
    finish_time: ''
  },
  {
    id: 3,
    order_id: '20250609140201415',
    created_at: '2025-06-11',
    total: 3000,
    status: '已取消',
    finish_time: ''
  }
])
</script>
