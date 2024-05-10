<script setup lang="ts">
useSeoMeta({
  title: 'Yogocap',
  ogTitle: 'Yogocap',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1712534400&semt=sph',
  twitterCard: 'summary_large_image',
})
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>


<template>
  <Toaster />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
