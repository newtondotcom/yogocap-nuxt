<script setup lang="ts">
function goToNvideo() {
  navigateTo("/nvideo");
}

const user = await useSupabaseUser();
if (user.value) {
  console.log("User logged in");
  const state = await $fetch("/api/dashboard/newuser");
  if (state == "deleted") {
    alert("Your account has been deleted");
  }
} else {
  console.log("User logged out");
}
</script>

<template>
  <div class="mt-8 ml-10">
    <h1 class="text-2xl font-bold text-gray-900 sm:text-4xl ml-6 mt-24">
      Welcome to <span class="">Yogocap</span>
    </h1>


    <p class="mt-1.5 text-l text-gray-600">
      Discover the power of video captioning powered by AI to capture your audience attention. 🚀
    </p>

    <Button @click="goToNvideo" class="absolute top-2/3 left-3/4">Try with a video</Button>
  </div>
</template>