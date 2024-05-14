<template>
<section id="about" class="w-full h-full">
    <div
      class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
    >
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div
          class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
        >
          <video
            alt="Party"
            src="/video.mp4"
            autoplay
            loop
            muted
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>
  
        <div class="lg:py-24">
          <h1 class="text-3xl font-bold text-primary sm:text-4xl">Yogocap : High-Quality AI Subtitles at Unbeatable Prices 🌟</h1>
  
          <p class="mt-4 text-gray-600">
            Discover Yogocap, the most cost-effective AI-powered solution for subtitling your social media videos.
             In a digital world where clear communication is vital, Yogocap offers an affordable way to ensure your message reaches everyone.
          </p>
          <Button @click="process" class="mt-8 px-12 py-3">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import processSignIn from '@/lib/signin'

async function process(){
    await processSignIn()
}
</script>