<template>
  <UTable
    row-key="id"
    :columns="columns"
    :rows="orderData"
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

    <template #empty-state>
      <div class="flex w-full flex-col items-center justify-center py-10 text-colorGrayDark">
        <UIcon name="i-heroicons:clipboard-document-list-20-solid" class="mb-2 h-10 w-10" />
        <p class="text-sm">您目前沒有任何訂單。</p>
      </div>
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

const orderData = ref([])
</script>
