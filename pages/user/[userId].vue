<template>
  <section class="container min-h-screen py-[40px]">
    <main class="mx-auto max-w-3xl">
      <h3 class="mb-4 text-colorBlack">我的帳戶</h3>
      <UTabs
        :items="items"
        :ui="{
          list: {
            base: 'border border-colorGray mb-4',
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
          <div v-if="item.key === 'profile'" class="space-y-3">
            <UserEditProfile />
          </div>
          <div v-else-if="item.key === 'orders'" class="space-y-3">
            <UserOrderList />
          </div>
        </template>
      </UTabs>
    </main>
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
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
</script>
