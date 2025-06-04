<template>
  <div class="group flex w-full gap-6 rounded-lg bg-white p-[30px] hover:bg-colorPrimary">
    <component
      :is="currentIcon"
      class="h-[40px] w-[40px] flex-shrink-0 text-colorPrimary group-hover:text-white md:h-[64px] md:w-[64px]"
    />
    <div>
      <h4 class="mb-1 text-colorPrimaryDark group-hover:text-white">{{ props.title }}</h4>
      <p class="text-sm text-colorBlack group-hover:text-white/80">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgAboutBoxDog from '@/components/svg/AboutBoxDog.vue'
import SvgAboutBoxHealth from '@/components/svg/AboutBoxHealth.vue'
import SvgAboutBoxBath from '@/components/svg/AboutBoxBath.vue'
import SvgAboutBoxMedal from '@/components/svg/AboutBoxMedal.vue'

const props = withDefaults(
  defineProps<{
    svgIcon: string
    title: string
    description: string
  }>(),
  {
    svgIcon: '',
    title: '',
    description: ''
  }
)

const iconMap: Record<string, Component> = {
  SvgAboutBoxDog,
  SvgAboutBoxHealth,
  SvgAboutBoxBath,
  SvgAboutBoxMedal
}

const currentIcon = computed(() => iconMap[props.svgIcon] || null)
</script>
