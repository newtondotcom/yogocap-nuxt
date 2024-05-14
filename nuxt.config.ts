export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'shadcn-nuxt',
    "@nuxtjs/plausible"
  ],
  supabase: {
    redirect : false,
  },
  ssr: false,
  runtimeConfig: {
    AUTH_HEADER: process.env.LEMON_SQUEEZY,
    LS_SHOP: process.env.LS_SHOP,
    LS_SECRET: process.env.LS_SECRET,
    LEMON_SQUEEZY : process.env.LEMON_SQUEEZY,
    MINIO_ENDPOINT : process.env.MINIO_ENDPOINT,
    MINIO_PORT : process.env.MINIO_PORT,
    MINIO_ACCESS : process.env.MINIO_ACCESS,
    MINIO_USESSL : process.env.MINIO_USESSL,
    MINIO_ACCESSKEY : process.env.MINIO_ACCESSKEY,
    MINIO_SECRETKEY : process.env.MINIO_SECRETKEY,
    RABBIT_HOST: process.env.RABBIT_HOST,
    RABBIT_PORT : process.env.RABBIT_PORT,
    DISCORD_WEBHOOK : process.env.DISCORD_WEBHOOK,
    MAIL_HOST : process.env.MAIL_HOST,
    MAIL_PORT : process.env.MAIL_PORT,
    MAIL_SSL : process.env.MAIL_SSL,
    MAIL_USER : process.env.MAIL_USER,
    MAIL_PWD : process.env.MAIL_PWD,
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
  },
  plausible: {
    ignoredHostnames: ['localhost'],
    apiHost : 'https://plaunwt.duckdns.org'
  }
})