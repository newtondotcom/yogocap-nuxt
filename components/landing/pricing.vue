<script lang="ts" setup>
defineProps({
  action: {
    type: Function,
    required: true,
  },
  text : {
    type: String,
    required: true
  }
});
</script>

<template>
  <section id="pricing" class="flex flex-col justify-center max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8"
      >
        <div
          class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
        >
          <div class="p-6 sm:px-8">
            <h2 class="text-lg font-medium text-gray-900">
              Starter
              <span class="sr-only">Plan</span>
            </h2>
    
            <p class="mt-2 text-gray-700">
              A plan to begin with <span class="text-primary">Yogocap 🚀</span> which includes basic features
            </p>
    
            <p class="mt-2 sm:mt-4">
              <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                5€
              </strong>
    
              <span class="text-sm font-medium text-gray-700">one time</span>
            </p>
    
            <Button @click="action('starter')" class="mt-4">
              {{text}}
          </Button>
          </div>
    
          <div class="p-6 sm:px-8">
            <p class="text-lg font-medium text-gray-900 sm:text-xl">
              What's included:
            </p>
    
            <ul class="mt-2 space-y-2 sm:mt-4">
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 60 videos</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 3 min maximum per video </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Free copyright song</span>
              </li>
  
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Auto cut silent video parts</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-red-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
    
                <span class="text-gray-700"> Dynamic emojis </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-red-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
    
                <span class="text-gray-700"> 3x faster video rendering (with GPU) </span>
              </li>
            </ul>
          </div>
        </div>
    
        <div
          class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
        >
          <div class="p-6 sm:px-8">
            <h2 class="text-lg font-medium text-gray-900">
              Premium
              <span class="sr-only">Plan</span>
            </h2>
    
            <p class="mt-2 text-gray-700">
              A plan to for intermediate <span class="text-primary">Yogocap</span> users to get more features and longer video processing 🌶️
            </p>
    
            <p class="mt-2 sm:mt-4">
              <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                15€
              </strong>
    
              <span class="text-sm font-medium text-gray-700">one time</span>
            </p>
    
            <Button @click="action('premium')" class="mt-4">
              {{text}}
          </Button>
          </div>
    
          <div class="p-6 sm:px-8">
            <p class="text-lg font-medium text-gray-900 sm:text-xl">
              What's included:
            </p>
    
            <ul class="mt-2 space-y-2 sm:mt-4">
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 120 videos</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 15 min maximum per video </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Free copyright song</span>
              </li>
  
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Auto cut silent video parts</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Dynamic emojis </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-red-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
    
                <span class="text-gray-700"> 3x faster video rendering (with GPU) </span>
              </li>
            </ul>
          </div>
        </div>
    
        <div
          class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
        >
          <div class="p-6 sm:px-8">
            <h2 class="text-lg font-medium text-gray-900">
              Business
              <span class="sr-only">Plan</span>
            </h2>
    
            <p class="mt-2 text-gray-700">
              Full access to <span class="text-primary">Yogocap</span> features for profesionnal users, including everything maxed 🔥 and faster video rendering 🏎️ 
            </p>
    
            <p class="mt-2 sm:mt-4">
              <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                30€
              </strong>
    
              <span class="text-sm font-medium text-gray-700">one time</span>
            </p>
    
          <Button @click="action('business')" class="mt-4">
              {{text}}
          </Button>
          </div>
    
          <div class="p-6 sm:px-8">
            <p class="text-lg font-medium text-gray-900 sm:text-xl">
              What's included:
            </p>
    
            <ul class="mt-2 space-y-2 sm:mt-4">
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 300 videos</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 60 min maximum per video </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Free copyright song</span>
              </li>
  
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Auto cut silent video parts</span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> Dynamic emojis </span>
              </li>
    
              <li class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
    
                <span class="text-gray-700"> 3x faster video rendering (with GPU) </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </template>