<template>
  <header class="fixed top-0 z-50 w-full border-b bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.png" alt="Logo Image" sizes="120px lg:180px" />
        </NuxtLink>

        <!-- 漢堡按鈕 -->
        <UButton color="white" variant="ghost" class="md:hidden">
          <UIcon
            class="hover:text-colorParimaryDark h-7 w-7 text-colorPrimary"
            :name="isMobileMenuOpen ? 'i-heroicons:x-mark' : 'i-heroicons:bars-3'"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </UButton>

        <!-- 導覽列 -->
        <nav class="hidden h-full items-center gap-6 md:flex">
          <template v-for="(link, index) in navLinks" :key="index">
            <div v-if="link.children" class="group relative h-full items-center">
              <button
                :class="
                  clsx(
                    'relative flex h-full items-center gap-1 font-medium text-textPrimary hover:text-colorPrimary',
                    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                    'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out group-hover:after:opacity-100'
                  )
                "
                type="button"
              >
                {{ link.label }}
                <UIcon name="i-heroicons:chevron-down" class="h-4 w-4 text-textPrimary" />
              </button>

              <div
                class="pointer-events-none absolute left-0 top-full z-20 translate-y-3 transform rounded bg-white opacity-0 shadow transition duration-300 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
              >
                <ul class="min-w-[180px] space-y-1 p-2">
                  <li v-for="child in link.children" :key="child.to">
                    <NuxtLink
                      :to="child.to"
                      class="block rounded px-4 py-2 text-sm text-textPrimary hover:bg-colorSecondary hover:text-white"
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
                  'relative flex h-full items-center font-medium text-textPrimary hover:text-colorPrimary',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                  'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out hover:after:opacity-100'
                )
              "
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>

        <!-- 功能 -->
        <div class="hidden items-center gap-2 md:flex">
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            class="text-colorGary hover:bg-transparent hover:text-colorPrimaryDark"
          />
          <UButton
            icon="i-heroicons:shopping-cart-solid"
            variant="ghost"
            class="text-colorGary relative hover:bg-transparent hover:text-colorPrimaryDark"
          >
            <span
              class="absolute -right-1 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-colorPrimary text-xs text-white shadow"
            >
              5
            </span>
          </UButton>
          <NuxtLink to="/">
            <UButton
              icon="i-heroicons:user-20-solid"
              variant="ghost"
              class="text-colorGary hover:bg-transparent hover:text-colorPrimaryDark"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 漢堡選單 -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute left-0 top-[64px] z-40 w-full border-t bg-white shadow-md md:hidden"
      >
        <nav class="space-y-2 p-4">
          <template v-for="(link, index) in navLinks" :key="index">
            <div v-if="link.children">
              <div class="font-medium text-textPrimary">{{ link.label }}</div>
              <ul class="ml-3 mt-1 space-y-0.5">
                <li v-for="child in link.children" :key="'child-' + child.to">
                  <NuxtLink
                    :to="child.to"
                    class="block rounded px-2 py-1 text-sm text-gray-600 hover:bg-colorSecondary hover:text-white"
                    @click="isMobileMenuOpen = false"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <NuxtLink
              v-else
              :to="link.to"
              class="block font-medium text-textPrimary hover:text-colorPrimary"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </template>

          <!-- 功能 -->
          <div class="flex gap-2 pt-4">
            <UButton
              icon="i-heroicons-magnifying-glass"
              variant="ghost"
              class="text-colorGary hover:bg-transparent hover:text-colorPrimaryDark"
            />
            <UButton
              icon="i-heroicons:shopping-cart-solid"
              variant="ghost"
              class="text-colorGary relative hover:bg-transparent hover:text-colorPrimaryDark"
            >
              <span
                class="absolute -right-1 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-colorPrimaryDark text-xs text-white shadow"
              >
                5
              </span>
            </UButton>
            <NuxtLink to="/">
              <UButton
                icon="i-heroicons:user-20-solid"
                variant="ghost"
                class="text-colorGary hover:bg-transparent hover:text-colorPrimaryDark"
              />
            </NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import clsx from 'clsx'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: '首頁', to: '/' },
  {
    label: '所有商品',
    children: [
      { label: '主食', to: '/' },
      { label: '零食', to: '/' },
      { label: '毛孩用品', to: '/' },
      { label: '玩具', to: '/' }
    ]
  },
  { label: '寵物專欄', to: '/' },
  { label: '關於我們', to: '/' },
  { label: '聯絡我們', to: '/' }
]
</script>
