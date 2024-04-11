export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  supabase: {
    redirect : false,
  },
  ssr: false,
  runtimeConfig: {
    AUTH_HEADER: process.env.LEMON_SQUEEZY,
    LS_SHOP: process.env.LS_SHOP,
  },
})
