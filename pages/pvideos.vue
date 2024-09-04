<script setup lang="ts">
    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } from '@/components/ui/tooltip';
    import constants from '~/lib/constants';
    import { formatDistanceToNow } from 'date-fns';
    import { enUS } from 'date-fns/locale';
    import { ChevronLeft, ChevronRight, Download, Terminal, Trash } from 'lucide-vue-next';
    import type { Video } from '~/types/types';

    const previousVideosCount = useCookie('previousVideosCount');
    const days_before_delete = constants.NB_DAYS_DELETE;

    let currentpage = ref(1);
    let length = 8;
    let localvideos = ref<Video[]>([]);
    let videos = ref<Video[]>([]);
    const dataFetched = ref(false);

    onMounted(async () => {
        const data = await $fetch('/api/dashboard/pvideos');
        videos.value = data.pvideos;
        if (videos.value == null) {
            dataFetched.value = true;
        } else {
            videos.value.forEach((video) => {
                if (video.done) {
                    video.type = 'success';
                } else {
                    video.type = 'pending';
                }
                video.submitted = new Date(video.submitted).toLocaleDateString();
                const today = new Date();
                const diff = today.getTime() - new Date(video.submitted).getTime();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                if (days > days_before_delete) {
                    video.perimee = true;
                } else {
                    video.perimee = false;
                }
            });
            localvideos.value = videos.value.slice(0, length);
            previousVideosCount.value = videos.value.length.toString();
        }
        dataFetched.value = true;
    });

    watch(currentpage, (value) => {
        const start = (value - 1) * length;
        const end = start + length;
        localvideos.value = videos.value.slice(start, end);
    });

    async function deleteVideo(video_id: string) {
        const data = await $fetch('/api/s3/remove', {
            method: 'POST',
            body: JSON.stringify({ video_id }),
        });
        videos.value = videos.value.map((video) => {
            if (video.id === video_id) {
                video.deleted = true;
            }
            return video;
        });
        videos.value = videos.value.map((video) => {
            if (video.deleted) {
                video.deleted = true;
            }
            return video;
        });
        localvideos.value = videos.value.slice(0, length);
    }

    async function downloadVideo(video_id: string) {
        const data = await $fetch('/api/s3/download', {
            method: 'POST',
            body: JSON.stringify({ video_id }),
        });
        window.open(data, '_blank');
    }
</script>

<template>
    <DashboardSubtitle
        title="Your lastest videos"
        subtitle="From here, you can find you latest videos ! 🚀"
    />

    <div class="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <SkeletonsPvideosVideos v-if="!dataFetched" />
        <div
            v-for="video in localvideos"
            class="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
            <img
                v-if="video.thumbnail"
                :alt="video.name"
                :src="video.thumbnail"
                class="h-24 w-full object-cover"
            />
            <div
                v-else
                class="h-20 w-full bg-gray-200 justify-center align-middle text-center self-center pt-8"
            >
                Processing ...
            </div>

            <div class="bg-white p-2">
                <time class="block text-xs text-gray-500">
                    {{ video.submitted }} -
                    {{
                        formatDistanceToNow(new Date(video.submitted), {
                            locale: enUS,
                        })
                    }}
                    ago
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

                <div class="flex flex-row justify-center space-x-1">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button :disabled="video.deleted || !video.done" variant="destructive">
                                <Trash class="w-4 h-4 mr-1" />
                                <div>Delete</div>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Do you really want to delete this video?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    video named {{ video.name }}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="deleteVideo(video.id)">
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <TooltipProvider v-if="video.perimee">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button disabled>Auto deleted</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This video was older than 2 days</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Button
                        v-else
                        @click="downloadVideo(video.id)"
                        :disabled="video.deleted || !video.done"
                    >
                        <Download class="w-4 h-4 mr-1" />
                        <div>Download</div>
                    </Button>
                </div>
            </div>
        </div>
        <div v-if="dataFetched && localvideos.length == 0" class="p-4">
            <Alert class="w-full">
                <Terminal class="h-4 w-4" />
                <AlertTitle>Hey, its looks like ...</AlertTitle>
                <AlertDescription>you haven't asked us to subtitle any video yet.</AlertDescription>
            </Alert>
        </div>
    </div>
    <div v-if="dataFetched && localvideos.length !== 0" class="flex flex-row justify-center mt-4">
        <div class="flex flex-row gap-2">
            <Button :disabled="currentpage == 1" @click="currentpage--">
                <ChevronLeft class="w-4 h-4 ml-1" />
            </Button>
            <Button class="cursor-default">
                {{ currentpage }} / {{ Math.ceil(videos.length / length) }}
            </Button>
            <Button :disabled="currentpage * length >= videos.length" @click="currentpage++">
                <ChevronRight class="w-4 h-4 ml-1" />
            </Button>
        </div>
    </div>
</template>
