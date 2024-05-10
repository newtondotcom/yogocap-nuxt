<script setup lang="ts">
import { Terminal } from 'lucide-vue-next';
import type { Video } from '~/types/types';


const previousVideosCount = useCookie('previousVideosCount')

let currentpage = ref(1);
let length = 8;
let localvideos = ref<Video[]>([]);
let videos = ref<Video[]>([]);
const dataFetched = ref(false);

onMounted(async () => {
  const { data } = await useFetch('/api/dashboard/pvideos')
  videos.value = data.value?.pvideos;
  videos.value.forEach((video) => {
    if (video.done) {
      video.type = 'success';
    } else {
      video.type = 'pending';
    }
    video.submitted = new Date(video.submitted).toLocaleDateString();
  });
  localvideos.value = videos.value.slice(0, length);
  dataFetched.value = true;
  previousVideosCount.value = videos.value.length.toString();
});

watch(currentpage, (value) => {
  const start = (value - 1) * length;
  const end = start + length;
  localvideos.value = videos.value.slice(start, end);
});

async function deleteVideo(video_id: string) {
  const data = await $fetch("/api/s3/remove", {
    method: "POST",
    body: JSON.stringify({ video_id }),
  });
  videos.value = videos.value.map((video) => {
    if (video.id === video_id) {
      video.deleted = true;
    }
    return video;
  });
}

async function downloadVideo(video_id: string) {
  const data = await $fetch("/api/s3/download", {
    method: "POST",
    body: JSON.stringify({ video_id }),
  });
  window.open(data, "_blank");
}

</script>

<template>

  <DashboardSubtitle title="Your last video" subtitle="From here, you can find you latest video ! 🚀" />

  <div class="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <SkeletonsPvideosVideos v-if="!dataFetched" />
    <div v-for="video in localvideos" class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <img v-if="video.thumbnail" :alt="video.name" :src="video.thumbnail" class="h-24 w-full object-cover" />
      <div v-else class="h-20 w-full bg-gray-200 justify-center align-middle text-center self-center pt-8">Processing
        ...</div>

      <div class="bg-white p-2">
        <time class="block text-xs text-gray-500">
          {{ video.submitted }}
        </time>

        <button class="flex flex-row align-middle justify-center">
          <h3 class="ml-3 mt-0.5 text-lg text-gray-900">
            {{ video.name }}
          </h3>
        </button>

        <div class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          <div class="flex flex-row align-middle justify-center">
            <DashboardChip :type="video.type" />
            <DashboardDuration :duration="video.length" />
          </div>
        </div>

        <div class="flex flex-row justify-center gap-1">

          <AlertDialog>
            <AlertDialogTrigger>
              <Button :disabled="video.deleted || !video.done" variant="destructive">
                <div class="mr-1">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M3 6.98996C8.81444 4.87965 15.1856 4.87965 21 6.98996" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path
                        d="M8.00977 5.71997C8.00977 4.6591 8.43119 3.64175 9.18134 2.8916C9.93148 2.14146 10.9489 1.71997 12.0098 1.71997C13.0706 1.71997 14.0881 2.14146 14.8382 2.8916C15.5883 3.64175 16.0098 4.6591 16.0098 5.71997"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 13V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                      <path
                        d="M19 9.98999L18.33 17.99C18.2225 19.071 17.7225 20.0751 16.9246 20.8123C16.1266 21.5494 15.0861 21.9684 14 21.99H10C8.91389 21.9684 7.87336 21.5494 7.07541 20.8123C6.27745 20.0751 5.77745 19.071 5.67001 17.99L5 9.98999"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </svg>
                </div>
                <div>Delete</div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Do you really want to delete this video?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the video named {{ video.name }}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="deleteVideo(video.id)">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button @click="downloadVideo(video.id)" :disabled="video.deleted || !video.done">
            <div class="mr-1">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"></path>
                  <path
                    d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
              </svg>
            </div>
            <div>Download</div>
          </Button>
        </div>
      </div>
    </div>
    <div v-if="dataFetched && localvideos.length == 0">
      <Alert>
        <Terminal class="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You haven't asked us to subtitle any video yet.
        </AlertDescription>
      </Alert>
    </div>
  </div>
  <div v-if="dataFetched && localvideos.length !== 0" class="flex flex-row justify-center mt-4">
    <div class="flex flex-row gap-2">
      <Button :disabled="currentpage == 1" @click="currentpage--">
        <div class="mr-1">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </g>
          </svg>
        </div>
      </Button>
      <Button class="cursor-default">{{ currentpage }} / {{ Math.ceil(videos.length / length) }}</Button>
      <Button :disabled="currentpage * length >= videos.length" @click="currentpage++">
        <div class="ml-1">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </g>
          </svg>
        </div>
      </Button>
    </div>
  </div>
</template>