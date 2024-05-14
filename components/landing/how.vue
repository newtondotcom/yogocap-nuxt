<template>
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div>
        <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary uppercase rounded-full bg-teal-accent-400">
          Brand new
        </p>
      </div>
      <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
        <span class="relative inline-block">
          <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <defs>
              <pattern id="d0d83814-78b6-480f-9a5f-7f637616b267" x="0" y="0" width=".135" height=".30">
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)" width="52" height="24"></rect>
          </svg>
          <span class="relative">Easily</span>
        </span>
        create a video in less than a minute
      </h2>
      <p class="text-base text-gray-700 md:text-lg">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.
      </p>
    </div>
    <div class="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
      <div class="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
        <div class="w-px h-full bg-gray-300 lg:w-full lg:h-px"></div>
      </div>
      <div class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Upload</p>
          <p class="flex items-center justify-center w-6 h-6 font-bold rounded text-primary-foreground bg-primary">
            1
          </p>
        </div>
        <p class="text-sm text-gray-900">
          Upload your video to Yogocap in your dashboard. 
        </p>
      </div>
      <div class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Tune it</p>
          <p class="flex items-center justify-center w-6 h-6 font-bold rounded text-primary-foreground bg-primary">
            2
          </p>
        </div>
        <p class="text-sm text-gray-900">
          Choose your preferred settings to create amazing subtitles.
        </p>
      </div>
      <div class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Confirm</p>
          <p class="flex items-center justify-center w-6 h-6 font-bold rounded text-primary-foreground bg-primary">
            3
          </p>
        </div>
        <p class="text-sm text-gray-900">
          Once you are ready, just let us know and we will take care of the rest.
        </p>
      </div>
      <div class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Wait a bit</p>
          <p class="flex items-center justify-center w-6 h-6 font-bold rounded text-primary-foreground bg-primary">
            4
          </p>
        </div>
        <p class="text-sm text-gray-900">
          As soon as the video is ready, we will advise you by email, so you can download it.
        </p>
      </div>
    </div>
    <div class="text-center">
      <Button 
      @click="process"
        class="h-12 px-6 transition duration-200"
      >
        Get Started
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import processSignIn from '@/lib/signin'

async function process(){
    await processSignIn()
}
</script>