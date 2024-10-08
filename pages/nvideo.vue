<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';
    import { PenLine } from 'lucide-vue-next';

    const { toast } = useToast();
    let videoUploaded = ref(false);
    let loadingUpload = ref(false);
    let videoCut = ref(false);
    let videoMusic = ref(false);
    let videoSent = ref(false);
    let videoEmoji = ref(false);
    let submitLoading = ref(false);
    let videoValid = ref(true);
    let Success = ref(false);
    let durationInSeconds = ref(0);
    let length = ref(33);
    let position = ref('center');
    const videoName = ref('');
    let generatedName = '';
    let presignedUrl = '';
    let canMusic = true;
    let canEmoji = true;
    let videoLength = ref(0);
    let videosBalance = ref(0);
    let s3_server_name = 'main';

    async function getPresignedUrl() {
        const response = await $fetch('/api/s3/upload', {
            method: 'POST',
        });
        const { url, objectName, capacity, s3Name } = response;
        presignedUrl = url;
        generatedName = objectName;
        console.log(capacity);
        canMusic = capacity.can_music;
        canEmoji = capacity.can_emojis;
        videoLength.value = capacity.current_duration;
        videosBalance.value = capacity.videos_remaining;
        s3_server_name = s3Name;
    }

    async function uploadFile(presignedUrl: string, file: File) {
        try {
            const response = await fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (response.ok) {
                toast({
                    title: 'File upload succeeded 🎯',
                    description: 'Your video has been uploaded successfully.',
                });
            } else {
                console.error('File upload failed', response);
                toast({
                    title: 'File upload failed 💢',
                    description:
                        'An error occurred while uploading your video. If it fails again, please contact us.',
                    variant: 'destructive',
                });
            }
            loadingUpload.value = false;
            videoUploaded.value = true;
        } catch (error) {
            console.error('Error uploading file:', error);
            loadingUpload.value = false;
            videoUploaded.value = false;
            throw error;
        }
    }

    async function launchAmpq() {
        if (videoName.value == '') {
            toast({
                title: 'Error ⚠️',
                description: 'Please name your video before processing it.',
                variant: 'destructive',
            });
            return;
        }
        submitLoading.value = true;
        const body = {
            name: videoName.value,
            aligned: true,
            emojis: videoEmoji.value,
            music: videoMusic.value,
            silent: videoCut.value,
            length: videoLength.value,
            name_s3: generatedName,
            s3name: s3_server_name,
            position: position.value,
        };
        await $fetch('/api/dashboard/postvideo', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        length.value = 100;
        Success.value = true;
        videoSent.value = true;
        submitLoading.value = false;
    }

    async function handleFileChange(event: { target: any }) {
        const fileInput = event.target;
        const videoFile = fileInput.files[0];

        if (videoFile) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(videoFile);
            video.onloadedmetadata = async function () {
                durationInSeconds.value = video.duration;
                durationInSeconds.value = Math.round(durationInSeconds.value);
                if (durationInSeconds.value > videoLength.value) {
                    videoValid.value = false;
                    loadingUpload.value = false;
                    toast({
                        title: 'File upload failed',
                        description:
                            'Your video length is above the one included in your current plan.',
                        variant: 'destructive',
                    });
                    return;
                } else if (videosBalance.value < 1) {
                    videoValid.value = false;
                    loadingUpload.value = false;
                    toast({
                        title: 'File upload failed',
                        description: 'You have no more videos left in your current balance.',
                        variant: 'destructive',
                    });
                    return;
                }
                console.log(videosBalance.value);
                const format = videoFile.name.split('.').pop();
                if (format !== 'mp4') {
                    videoValid.value = false;
                    loadingUpload.value = false;
                    toast({
                        title: 'File upload failed',
                        description: 'Your video format is not supported (mp4 is required).',
                        variant: 'destructive',
                    });
                    return;
                } else {
                    videoValid.value = true;
                    loadingUpload.value = true;
                    await uploadFile(presignedUrl, videoFile);
                    length.value = 66;
                    loadingUpload.value = false;
                    videoUploaded.value = true;
                }
            };
        } else {
            videoUploaded.value = false;
        }
    }

    async function rmUploadedVideo() {
        await $fetch('/api/s3/delete', {
            method: 'POST',
            body: JSON.stringify({
                file: 'test.mp4',
            }),
        });
    }

    onMounted(() => {
        getPresignedUrl();
        /*
    window.onbeforeunload = async function (event) {
        event.preventDefault();
        if (!Success.value) {
            await rmUploadedVideo();
        }
        return 'text not printed.';
    };
    */
    });
</script>

<template>
    <DashboardSubtitle
        title="Upload a video"
        subtitle="From here, you can upload a video to subtitle it ! 🚀"
    />

    <div class="rounded-lg border border-dashed shadow-sm">
        <div
            class="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-8"
        >
            <div class="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
                <div>
                    <p
                        class="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-primary-foreground"
                    >
                        Subtitle a video
                    </p>
                </div>
                <h2
                    class="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
                >
                    <span class="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            class="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                        >
                            <defs>
                                <pattern
                                    id="b902cd03-49cc-4166-a0ae-4ca1c31cedba"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7"></circle>
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)"
                                width="52"
                                height="24"
                            ></rect>
                        </svg>
                        <span class="relative text-primary">Let</span>
                    </span>
                    us guide you
                </h2>
                <p class="text-base text-gray-700 md:text-lg">
                    Nothing is simplier than uploading a video and getting it subtitled !
                </p>
            </div>
        </div>

        <Progress v-model="length" class="mx-auto mb-[50px] w-4/5 self-center rounded-md" />

        <div class="flex flex-row items-center justify-center">
            <div class="flex h-[30vh] w-1/3 flex-row items-center justify-center" v-if="!Success">
                <div
                    v-if="videoUploaded"
                    class="mt-2 flex flex-row items-center justify-center font-bold text-green-400"
                >
                    <Badge class="bg-green-500 px-4 py-2 text-primary-foreground">Uploaded !</Badge>
                </div>
                <div class="flex flex-col" v-else>
                    <p class="text-gray-600">Upload your video here</p>
                    <div class="mb-3 mt-4 grid items-center gap-1.5">
                        <Input
                            id="picture"
                            accept="video/*"
                            @change="handleFileChange"
                            :disabled="loadingUpload"
                            type="file"
                            class="bg-primary"
                        />
                    </div>
                    <div
                        v-if="loadingUpload"
                        class="mt-2 flex flex-row items-center justify-center"
                    >
                        <Badge>
                            <div>Uploading</div>
                            <div class="ml-1">
                                <svg
                                    class="m-1 h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                            </div>
                        </Badge>
                    </div>
                </div>
            </div>

            <Separator
                orientation="vertical"
                class="h-[20vh]"
                v-if="(length == 66 || length == 33) && (loadingUpload || videoUploaded)"
            />

            <div v-if="length == 100 && Success" class="flex h-[30vh] w-1/2 flex-col pl-10">
                <div class="mb-6 flex items-center justify-between">
                    <p class="text-2xl font-bold text-green-500">Success</p>
                    <svg class="w-8 text-green-500" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline
                            fill="none"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            points="6,12 10,16 18,8"
                        ></polyline>
                    </svg>
                </div>
                <p class="text-gray-600">
                    Thanks, you video is now being processed. You can check
                    <NuxtLink to="pvideos" class="text-primary">here</NuxtLink>
                    to check and you will receive an email when it's done !
                </p>
            </div>
            <div
                class="flex h-[30vh] w-1/2 flex-col pl-10"
                v-if="(length == 66 || length == 33) && (loadingUpload || videoUploaded)"
            >
                <div class="flex flex-col">
                    <div class="items-top mt-2 flex gap-x-2">
                        <div class="grid gap-1.5 leading-none">
                            <label
                                for="silence"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Do you want us to cut silent parts of the video ?
                            </label>
                        </div>
                        <Checkbox class="flex" v-model:checked="videoCut" id="silence" />
                    </div>

                    <!--
                    <div class="items-top flex gap-x-2 mt-4" :class="`${canMusic ? 'opacity-1' : 'opacity-50'}`">
                        <div class="grid gap-1.5 leading-none">
                            <label for="music"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Do you want us to add a dynamic music to the video ?
                            </label>
                        <Checkbox class="flex" v-model:checked="videoMusic" id="music" :disabled="!canMusic" />
                        </div>
                    </div>
                    -->

                    <div
                        class="items-top mt-4 flex gap-x-2"
                        :class="`${canEmoji ? 'opacity-1' : 'opacity-50'}`"
                    >
                        <div class="grid gap-1.5 leading-none">
                            <label
                                for="emoji"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Do you want us to add emojis to the video ?
                            </label>
                        </div>
                        <Checkbox
                            class="flex"
                            v-model:checked="videoEmoji"
                            id="emoji"
                            :disabled="!canEmoji"
                        />
                    </div>

                    <div class="items-top mt-4 flex gap-x-2">
                        <div class="grid justify-center gap-1.5 align-middle leading-none">
                            <label
                                for="position"
                                class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Subtitles position :
                            </label>
                        </div>
                        <Select v-model="position" id="position">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Position</SelectLabel>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="bottomcenter">Bottom Center</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="pt-6">
                    <div class="relative w-full max-w-sm items-center">
                        <Input
                            id="search"
                            type="text"
                            placeholder="Name your video"
                            v-model="videoName"
                            class="pl-10"
                        />
                        <span
                            class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
                        >
                            <PenLine class="size-6 text-muted-foreground" />
                        </span>
                    </div>

                    <div class="ml-28 mt-4">
                        <Button
                            class="flex flex-row"
                            :class="[videoUploaded ? 'opacity-1' : 'opacity-20']"
                            :disabled="!videoUploaded"
                            @click="launchAmpq"
                        >
                            <span class="flex text-sm font-medium">
                                <div v-if="submitLoading">
                                    <div class="ml-1 flex">
                                        <svg
                                            class="m-1 h-4 w-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                class="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            ></circle>
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div v-else class="flex flex-row space-x-4">
                                    Process it

                                    <svg
                                        class="h-5 w-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
