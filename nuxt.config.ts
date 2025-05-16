// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxt/image', 'nuxt-swiper'],
  supabase: {
    redirect: false
  }
})
