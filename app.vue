<script setup lang="ts">
useSeoMeta({
    title: 'Yogocap',
    ogTitle: 'Yogocap App',
    description: 'Discover Yogocap, the most cost-effective AI-powered solution for subtitling your social media videos. Ensure your message reaches everyone with our unbeatable prices and high-quality subtitles.',
    ogDescription: 'Discover Yogocap, the most cost-effective AI-powered solution for subtitling your social media videos. Ensure your message reaches everyone with our unbeatable prices and high-quality subtitles.',
    ogImage: 'https://app.yogocap.com/og-image.png',
    twitterCard: 'summary_large_image',
})
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>


<template>
  <Toaster />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
