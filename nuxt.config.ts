export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  supabase: {
    redirect : false,
  },
  ssr: false,
})
