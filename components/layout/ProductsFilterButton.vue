<template>
  <div>
    <div class="mb-5 flex justify-center md:hidden">
      <div
        class="flex cursor-pointer items-center space-x-1 leading-none text-colorGrayDark hover:text-colorPrimaryDark"
        @click="isOpen = !isOpen"
      >
        <UIcon name="heroicons:list-bullet-16-solid" size="20" />
        <span>篩選</span>
      </div>
    </div>

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
          <UIcon class="h-8 w-8 text-colorPrimary" name="i-heroicons:x-mark" />
        </UButton>
      </div>
      <div class="flex h-full flex-col justify-between overflow-y-auto bg-white px-6 pb-8">
        <UiAsideMenu />
      </div>
    </USlideover>

    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="isOpen = false"
    ></div>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)
</script>
