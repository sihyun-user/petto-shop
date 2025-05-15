<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg src="" alt="" sizes="120px lg:180px" />
        </NuxtLink>

        <!-- 導覽列 -->
        <nav class="hidden h-full items-center gap-6 md:flex">
          <template v-for="(link, index) in navLinks" :key="index">
            <div v-if="link.children" class="group relative h-full items-center">
              <button
                :class="
                  clsx(
                    'relative flex h-full items-center gap-1 font-medium text-colorGray hover:text-colorPrimary',
                    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                    'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out group-hover:after:opacity-100'
                  )
                "
                type="button"
              >
                {{ link.label }}
                <UIcon name="i-heroicons:chevron-down" class="h-4 w-4 text-colorGray" />
              </button>

              <div
                class="pointer-events-none absolute left-0 top-full z-20 translate-y-3 transform rounded bg-white opacity-0 shadow transition duration-300 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
              >
                <ul class="min-w-[180px] space-y-1 p-2">
                  <li v-for="child in link.children" :key="child.to">
                    <NuxtLink
                      :to="child.to"
                      class="block rounded px-4 py-2 text-sm text-colorGray hover:bg-colorGrayLight"
                    >
                      {{ child.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="link.to"
              :class="
                clsx(
                  'relative flex h-full items-center font-medium text-colorGray hover:text-colorPrimary',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                  'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out hover:after:opacity-100'
                )
              "
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>

        <!-- 右側功能 -->
        <div class="flex items-center gap-2">
          <!-- 搜尋 -->
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            class="text-colorGary hover:bg-transparent hover:text-colorSecondary"
          />

          <!-- 購物車 -->
          <UButton
            icon="i-heroicons:shopping-cart-solid"
            variant="ghost"
            class="text-colorGary relative hover:bg-transparent hover:text-colorSecondary"
          >
            <span
              class="absolute -right-1 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-colorSecondary text-xs text-white shadow"
            >
              5
            </span>
          </UButton>

          <!-- 使用者 -->
          <NuxtLink to="/dashboard">
            <UButton
              icon="i-heroicons:user-20-solid"
              variant="ghost"
              class="text-colorGary hover:bg-transparent hover:text-colorSecondary"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import clsx from 'clsx'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/' },
  { label: 'Menu', to: '/' },
  { label: 'Chefs', to: '/' },
  {
    label: 'Pages',
    children: [
      { label: 'Menu Details', to: '/' },
      { label: 'Blog Details', to: '/' },
      { label: 'Cart View', to: '/' },
      { label: 'Checkout', to: '/' },
      { label: 'Payment', to: '/' },
      { label: 'Testimonial', to: '/' },
      { label: 'Search Result', to: '/' },
      { label: '404', to: '/' },
      { label: 'FAQs', to: '/' },
      { label: 'Sign In', to: '/' },
      { label: 'Sign Up', to: '/' }
    ]
  },
  { label: 'Blog', to: '/' },
  { label: 'Contact', to: '/' }
]
</script>
