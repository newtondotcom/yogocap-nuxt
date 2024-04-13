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
    prefix: '',
    componentDir: './components/ui'
  },
  css : ['~/assets/css/tailwind.css'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    viewer: false,
  }
})
