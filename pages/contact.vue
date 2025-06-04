<template>
  <div>
    <LayoutBannerBreadcrumb title="聯絡我們" :links="[{ label: '聯絡我們' }]" />
    <section class="container py-[40px]">
      <div class="w-full rounded-lg bg-colorGray p-4">
        <!-- <UForm class="p-4">
          <UiFormGroupInput
            :model-value="state.subject"
            name="subject"
            label="主旨"
            placeholder="請輸入主旨"
            required
          />
          <UiFormGroupInput
            :model-value="state.name"
            name="name"
            label="姓名"
            placeholder="請輸入姓名"
            required
          />
          <UiFormGroupInput
            :model-value="state.email"
            name="email"
            label="電子信箱"
            placeholder="請輸入電子郵件"
            required
          />
        </UForm> -->
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
usePageSeo({
  title: '聯絡我們'
})

// const state = ref({
//   subject: '',
//   name: '',
//   email: ''
// })
</script>
