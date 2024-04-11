<script setup lang="ts">
    import { videos } from "../components/dashboard/videos";

    let currentpage = ref(1);
    let length = 8;
    let localvideos = ref([]);
    localvideos.value = videos.slice(0, length);

    watch(currentpage, (value) => {
        localvideos.value = videos.slice((value-1) * 8, (value) * 8);
    });


</script>

<template>

<DashboardSubtitle title="Your last video" subtitle="From here, you can find you latest video ! 🚀" />

<div class="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-100">
  <div v-for="video in localvideos" class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <img
        :alt="video.name"
        :src="video.minia"
        class="h-20 w-full object-cover"
      />
    
      <div class="bg-white p-4 sm:p-6">
        <time datetime="2022-10-10" class="block text-xs text-gray-500">
          {{video.date}}
        </time>
    
        <button class="flex flex-row align-middle justify-center">
          <h3 class="ml-3 mt-0.5 text-lg text-gray-900">
            {{video.name}}
            {{video.duration}}
          </h3>
        </button>
    
        <div class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          <div class="flex flex-row align-middle justify-center">
            <DashboardChip :type="video.type" />
            <DashboardDuration :duration="video.duration" />
          </div>
        </div>
        
      <div class="flex flex-row justify-center">
          <button
          class="mr-2 w-50 flex flex-row shrink-0 rounded-md border border-red-600 bg-red-600 mt-4 px-2 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
          >
            <div class="mr-2">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6.98996C8.81444 4.87965 15.1856 4.87965 21 6.98996" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.00977 5.71997C8.00977 4.6591 8.43119 3.64175 9.18134 2.8916C9.93148 2.14146 10.9489 1.71997 12.0098 1.71997C13.0706 1.71997 14.0881 2.14146 14.8382 2.8916C15.5883 3.64175 16.0098 4.6591 16.0098 5.71997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 9.98999L18.33 17.99C18.2225 19.071 17.7225 20.0751 16.9246 20.8123C16.1266 21.5494 15.0861 21.9684 14 21.99H10C8.91389 21.9684 7.87336 21.5494 7.07541 20.8123C6.27745 20.0751 5.77745 19.071 5.67001 17.99L5 9.98999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <div>Delete</div>
          </button>

          <button
          class="ml-2 w-50 flex flex-row shrink-0 rounded-md border border-blue-600 bg-blue-600 mt-4 px-2 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            <div class="mr-2">
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <div>Download</div>
          </button>
      </div>

      </div>
    </div>
</div>
<div class="flex flex-row justify-center mt-4">
<UPagination v-model="currentpage" :page-count="length" :total="videos.length" />
</div>
</template>