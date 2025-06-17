<template>
  <section class="bg-colorBlack text-white">
    <div class="container flex flex-wrap justify-between space-y-12 py-12">
      <div class="flex w-full justify-center md:w-3/12">
        <div>
          <NuxtLink to="/" title="logo" class="flex items-center gap-3 text-white">
            <SvgMainLogo class="h-10 w-auto" />
            <span class="text-[26px] font-bold">Peto Shop</span>
          </NuxtLink>
          <p class="mb-3 text-2xl font-semibold">為毛孩選對每一天</p>
          <div class="flex items-center space-x-2">
            <UIcon name="fa6-solid:location-dot" class="h-3 w-3" />
            <p class="text-sm">台北市信義區毛孩街 88 號</p>
          </div>
          <a href="callto:1234567890123" class="my-2 flex items-center space-x-2">
            <UIcon name="i-heroicons:phone" class="h-3 w-3" />
            <p class="text-sm">02-1234-5678</p>
          </a>
          <a href="mailto:petto@gmail.com" class="flex items-center space-x-2">
            <UIcon name="i-fa6-solid:envelope" class="h-3 w-3" />
            <p class="text-sm">petto@gmail.com</p>
          </a>
        </div>
      </div>
      <div class="hidden flex-col space-y-4 text-center md:flex md:w-2/12">
        <h4 class="underline underline-offset-8">探索我們</h4>
        <NuxtLink to="/" class="hover:text-colorSecondary">最新消息</NuxtLink>
        <NuxtLink to="/" class="hover:text-colorSecondary">關於我們</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-colorSecondary">聯絡我們</NuxtLink>
        <NuxtLink to="/" class="hover:text-colorSecondary">銷售據點</NuxtLink>
      </div>
      <div class="hidden flex-col space-y-4 text-center md:flex md:w-2/12">
        <h4 class="underline underline-offset-8">服務項目</h4>
        <NuxtLink to="/" class="hover:text-colorSecondary">會員權益</NuxtLink>
        <NuxtLink to="/" class="hover:text-colorSecondary">購物須知</NuxtLink>
        <NuxtLink to="/" class="hover:text-colorSecondary">配送問題</NuxtLink>
        <NuxtLink to="/" class="hover:text-colorSecondary">常見問題</NuxtLink>
      </div>
      <div class="hidden flex-col space-y-4 md:flex md:w-4/12 lg:w-3/12">
        <h4 class="underline underline-offset-8">訂閱我們</h4>
        <UForm class="relative" :state="state" :schema="schema" @submit="submit">
          <UFormGroup name="email">
            <UInput
              v-model="state.email"
              variant="none"
              placeholder="請輸入電子信箱"
              class="rounded-md bg-white text-colorBlack"
              size="lg"
            />

            <UButton
              type="submit"
              color="black"
              variant="solid"
              class="absolute right-0 top-0 rounded-none rounded-r-md bg-colorPrimary px-5 py-[10px] hover:bg-colorPrimaryDark"
            >
              送出</UButton
            >
          </UFormGroup>
        </UForm>
        <h4 class="underline underline-offset-8">追蹤我們</h4>
        <div class="flex space-x-3">
          <NuxtLink
            to="/"
            class="flex items-center justify-center rounded-full bg-colorPrimary p-2 hover:bg-colorPrimaryDark"
          >
            <UIcon name="i-simple-icons-facebook" class="h-5 w-5 hover:text-white" />
          </NuxtLink>
          <NuxtLink
            to="/"
            class="flex items-center justify-center rounded-full bg-colorPrimary p-2 hover:bg-colorPrimaryDark"
          >
            <UIcon name="i-simple-icons-instagram" class="h-5 w-5 hover:text-white" />
          </NuxtLink>
          <NuxtLink
            to="/"
            class="flex items-center justify-center rounded-full bg-colorPrimary p-2 hover:bg-colorPrimaryDark"
          >
            <UIcon name="i-simple-icons-twitter" class="h-5 w-5 hover:text-white" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="border-t border-colorGrayDark p-2 text-center text-xs">
      © 2025 All Rights Reserved.
    </div>
  </section>
</template>
<script setup lang="ts">
import { z } from 'zod'

const state = ref({
  email: ''
})

const schema = z.object({
  email: z.string().email('請輸入有效的電子信箱')
})

const submit = async () => {}
</script>
