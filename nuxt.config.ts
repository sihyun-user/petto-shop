// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css', '@/assets/css/styles.css', '@/assets/css/vue3-zoomer.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  supabase: {
    redirect: false
  },
  vite: {
    optimizeDeps: {
      exclude: ['estree-walker']
    },
    ssr: {
      noExternal: ['vue3-zoomer']
    }
  }
})
