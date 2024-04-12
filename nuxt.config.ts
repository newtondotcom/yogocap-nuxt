export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss','@nuxtjs/supabase', 'shadcn-nuxt'],
  supabase: {
    redirect : false,
  },
  ssr: false,
  runtimeConfig: {
    AUTH_HEADER: process.env.LEMON_SQUEEZY,
    LS_SHOP: process.env.LS_SHOP,
    LS_SECRET: process.env.LS_SECRET,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
