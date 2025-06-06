<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.png" alt="Logo Image" sizes="120px lg:180px" />
        </NuxtLink>

        <nav class="hidden h-full items-center gap-6 md:flex">
          <template v-for="(link, index) in navLinks" :key="index">
            <div v-if="link.children" class="group relative h-full items-center">
              <NuxtLink
                :to="link.to"
                :class="[
                  'relative flex h-full items-center gap-1 font-medium text-colorGrayDark hover:text-colorPrimary',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                  'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out group-hover:after:opacity-100'
                ]"
              >
                {{ link.label }}
                <UIcon name="i-heroicons:chevron-down" class="h-4 w-4 text-colorBlack" />
              </NuxtLink>

              <div
                :class="[
                  'pointer-events-none absolute left-0 top-full z-20 translate-y-3 transform rounded bg-white opacity-0 shadow',
                  'group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100'
                ]"
              >
                <ul class="min-w-[180px] space-y-1 p-2">
                  <li v-for="child in link.children" :key="child.to">
                    <NuxtLink
                      :to="child.to"
                      :class="[
                        'block rounded px-4 py-2 text-sm font-medium text-colorGrayDark hover:bg-colorGrayLight hover:text-colorPrimary',
                        route.path === child.to ? 'bg-colorGrayLight text-colorPrimary' : ''
                      ]"
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
              :class="[
                'relative flex h-full items-center font-medium text-colorGrayDark hover:text-colorPrimary',
                'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary',
                'after:opacity-0 after:transition-all after:duration-500 after:ease-in-out hover:after:opacity-100',
                route.path === link.to ? 'text-colorPrimary after:opacity-100' : ''
              ]"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>

        <div class="hidden items-center gap-2 md:flex">
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            class="text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
          />
          <UButton
            icon="i-heroicons:shopping-cart-solid"
            variant="ghost"
            class="relative text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
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
              class="text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
            />
          </NuxtLink>
        </div>

        <LayoutHamburgerButton />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navLinks = useNavLinks()

const route = useRoute()
console.log('Current route:', route.path)
</script>
