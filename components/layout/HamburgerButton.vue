<template>
  <div>
    <UButton color="white" variant="ghost" class="md:hidden">
      <UIcon
        class="hover:text-colorParimaryDark h-7 w-7 text-colorPrimary"
        :name="isOpen ? 'i-heroicons:x-mark' : 'i-heroicons:bars-3'"
        @click="isOpen = !isOpen"
      />
    </UButton>

    <USlideover v-model="isOpen">
      <div class="flex justify-end p-4">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          class="bg-transparent text-colorPrimary hover:bg-transparent"
          square
          padded
          @click="isOpen = false"
        >
          <UIcon class="h-8 w-8 text-colorPrimary" name="i-heroicons:x-mark" />
        </UButton>
      </div>
      <div class="flex h-full flex-col justify-between overflow-y-auto bg-white px-6 pb-8">
        <nav class="space-y-4 pt-2">
          <template v-for="link in navLinks" :key="link.label">
            <div v-if="link.children">
              <div class="mb-1 text-base font-semibold text-colorBlack">{{ link.label }}</div>
              <ul class="ml-3 space-y-1">
                <li v-for="child in link.children" :key="child.to">
                  <NuxtLink
                    :to="child.to"
                    class="block rounded px-2 py-1 text-sm text-gray-600 hover:bg-colorSecondary hover:text-white"
                    @click="isOpen = false"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div v-else>
              <NuxtLink
                :to="link.to"
                class="block text-base font-semibold text-colorBlack hover:text-colorPrimary"
                @click="isOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </template>
        </nav>

        <div class="flex items-center justify-center space-x-4">
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
    </USlideover>
  </div>
</template>
<script setup lang="ts">
const navLinks = useNavLinks()

const isOpen = ref(false)
</script>
