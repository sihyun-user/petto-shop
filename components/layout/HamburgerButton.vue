<template>
  <div>
    <UButton color="white" variant="ghost" class="md:hidden">
      <UIcon
        class="hover:text-colorParimaryDark h-7 w-7 text-colorPrimary"
        :name="isMobileMenuOpen ? 'i-heroicons:x-mark' : 'i-heroicons:bars-3'"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      />
    </UButton>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-y-0 right-0 z-50 flex w-[300px] max-w-sm flex-col items-center justify-center overflow-auto bg-white p-6 shadow-lg md:hidden"
      >
        <nav class="w-full space-y-4 text-center">
          <NuxtLink
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.to"
            class="block text-lg font-medium text-colorBlack hover:text-colorPrimary"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="mt-6 flex space-x-4">
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            class="text-colorBlack hover:text-colorPrimaryDark"
          />
          <UButton
            icon="i-heroicons:shopping-cart-solid"
            variant="ghost"
            class="relative text-colorBlack hover:text-colorPrimaryDark"
          >
            <span
              class="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-colorPrimaryDark text-xs text-white shadow"
            >
              5
            </span>
          </UButton>
          <NuxtLink to="/profile">
            <UButton
              icon="i-heroicons:user-20-solid"
              variant="ghost"
              class="text-colorBlack hover:text-colorPrimaryDark"
            />
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="isMobileMenuOpen = false"
    ></div>
  </div>
</template>
<script setup lang="ts">
const navLinks = useNavLinks()

const isMobileMenuOpen = ref(false)
</script>
