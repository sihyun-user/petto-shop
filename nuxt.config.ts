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
    server: {
      allowedHosts: ['0caf8f5cb60e.ngrok-free.app']
    },
    optimizeDeps: {
      exclude: ['estree-walker']
    },
    ssr: {
      noExternal: ['vue3-zoomer']
    }
  },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // 只給 server 用
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '', // 前端用的匿名 key
      ngrokUrl: process.env.NGROK_URL || '',
      baseUrl: process.env.NUXT_PUBLIC_URL || ''
    }
  }
})
