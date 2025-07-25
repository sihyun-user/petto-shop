import { defineNuxtPlugin } from '#app'
import VueDompurifyHTML from 'vue-dompurify-html'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDompurifyHTML)
})
