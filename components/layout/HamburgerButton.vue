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
                class="relative cursor-pointer border-b border-b-colorGray px-[50px] py-4 text-base font-medium text-colorGrayDark hover:bg-colorGrayLight"
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
          <NuxtLink to="/cart" class="relative flex">
            <UIcon
              name="i-heroicons:shopping-cart-solid"
              class="h-6 w-6 flex-shrink-0 text-colorBlack hover:text-colorPrimaryDark"
            />
            <span
              class="absolute -right-2.5 -top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-colorPrimary text-xs text-white shadow"
            >
              {{ cartAmount }}
            </span>
          </NuxtLink>
          <div class="flex">
            <NuxtLink v-if="isLogin" :to="`user/${user.id}`" class="flex">
              <UIcon
                name="i-heroicons:user-20-solid"
                class="h-6 w-6 flex-shrink-0 text-colorBlack hover:text-colorPrimaryDark"
              />
            </NuxtLink>
            <NuxtLink v-else to="/my-account" class="flex">
              <UIcon
                name="i-heroicons:user-20-solid"
                class="h-6 w-6 flex-shrink-0 text-colorBlack hover:text-colorPrimaryDark"
              />
            </NuxtLink>
          </div>
          <UIcon
            v-if="isLogin"
            name="i-heroicons:arrow-left-on-rectangle-20-solid"
            class="h-6 w-6 flex-shrink-0 cursor-pointer text-colorBlack hover:text-colorPrimaryDark"
            @click="userStore.logout()"
          />
        </div>
      </div>
    </USlideover>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'

const route = useRoute()
const navLinks = useNavLinks()
const cartStore = useCartStore()
const userStore = useUserStore()
const { cartAmount } = storeToRefs(cartStore)
const { user, isLogin } = storeToRefs(userStore)

const isOpen = ref(false)
const isSubMenuOpen = ref(false)

watch(route, () => {
  isOpen.value = false
  isSubMenuOpen.value = false
})
</script>
