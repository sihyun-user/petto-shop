<template>
  <div>
    <UButton color="white" variant="ghost" class="md:hidden">
      <UIcon
        class="hover:text-colorParimaryDark h-7 w-7 text-colorPrimary"
        :name="isOpen ? 'heroicons:x-mark-16-solid' : 'i-heroicons:bars-3'"
        @click="isOpen = !isOpen"
      />
    </UButton>

    <USlideover
      v-model="isOpen"
      :ui="{
        width: 'max-w-[300px] w-full'
      }"
    >
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
          <UIcon class="h-8 w-8 text-colorPrimary" name="heroicons:x-mark-16-solid" />
        </UButton>
      </div>
      <div class="flex h-full flex-col justify-center overflow-y-auto bg-white">
        <nav>
          <template v-for="link in navLinks" :key="link.label">
            <div v-if="link.children">
              <div
                class="cursor-pointer border-b border-b-colorGray px-[50px] py-4 text-base font-medium text-colorGrayDark hover:bg-colorGrayLight"
                @click="isSubMenuOpen = !isSubMenuOpen"
              >
                {{ link.label }}
                <UIcon
                  class="absolute right-4 h-5 w-5 text-colorGrayDark"
                  :name="isSubMenuOpen ? 'i-heroicons:chevron-up' : 'i-heroicons:chevron-down'"
                />
              </div>
              <Transition
                name="submenu"
                enter-active-class="transition-all duration-300 ease-in-out"
                leave-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[250px] opacity-100"
                leave-from-class="max-h-[250px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-show="isSubMenuOpen" class="overflow-hidden">
                  <ul>
                    <li v-for="child in link.children" :key="child.to">
                      <NuxtLink
                        :to="child.to"
                        class="relative block rounded border-b border-b-colorGray px-[70px] py-4 font-medium text-colorGrayDark hover:bg-colorGrayLight hover:text-colorPrimary"
                        @click="isOpen = false"
                      >
                        <div
                          class="absolute left-[50px] top-1/2 block h-[1px] w-[7px] -translate-y-1/2 bg-black"
                        ></div>
                        {{ child.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
            <div v-else>
              <NuxtLink
                :to="link.to"
                class="block border-b border-b-colorGray px-[50px] py-4 text-base font-medium text-colorGrayDark hover:bg-colorGrayLight hover:text-colorPrimary"
                @click="isOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </template>
        </nav>

        <div class="mt-6 flex items-center justify-end space-x-4 px-4">
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            class="text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
          />
          <NuxtLink to="/cart">
            <UButton
              icon="i-heroicons:shopping-cart-solid"
              variant="ghost"
              class="relative text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
            >
              <span
                class="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-colorPrimaryDark text-xs text-white shadow"
              >
                5
              </span>
            </UButton>
          </NuxtLink>
          <NuxtLink to="/profile">
            <UButton
              icon="i-heroicons:user-20-solid"
              variant="ghost"
              class="text-colorBlack hover:bg-transparent hover:text-colorPrimaryDark"
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
const isSubMenuOpen = ref(false)
</script>
