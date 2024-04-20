<script setup lang="ts">
import sendAMQP from "../functions/s3/ampq";
import { PenLine, AlertCircle } from "lucide-vue-next";

let videoUploaded = ref(false);
let loadingUpload = ref(false);
let videoCut = ref(false);
let videoMusic = ref(false);
let videoSent = ref(false);
let videoEmoji = ref(false);
let videoValid = ref(true);
let Success = ref(false);
let durationInSeconds = ref(0);
let length = ref(33);

let datas = ref({
    url: 'https://yogocap.s3.eu-west-3.amazonaws.com/test.mp4',
    videoLength: 2000,
    canMusic: true,
    canEmoji: true,
});

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
            console.log('File uploaded successfully');
        } else {
            console.error('File upload failed:', response.statusText);
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
    await launchVideoProcessing();
    videoSent.value = true;
}

async function launchVideoProcessing() {
    const task: Record<string, any> = {
        file_bucket_name: 'videos',
        file_name: 'test.mp4',
        emoji: true,
        silence: true,
    };
    //await sendAMQP(task);
    length.value = 100;
    Success.value = true;
}

async function handleFileChange(event: { target: any; }) {
    loadingUpload.value = true;

    const fileInput = event.target;
    const videoFile = fileInput.files[0];

    if (videoFile) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.onloadedmetadata = function () {
            durationInSeconds.value = video.duration;
            durationInSeconds.value = Math.round(durationInSeconds.value);
            if (durationInSeconds.value > datas.value.videoLength) {
                videoValid.value = false;
                loadingUpload.value = false;
            } else {
                videoValid.value = true;
                loadingUpload.value = true;
                // await uploadFile(datas.value.url, videoFile);
                //length.value = 66;
                setTimeout(() => {
                    length.value = 66;
                    loadingUpload.value = false;
                    videoUploaded.value = true;
                }, 2000);
            }
        };
    } else {
        videoUploaded.value = false;
    }
}

async function rmUploadedVideo() {
    await $fetch("/api/s3/delete", {
        method: "POST",
        body: JSON.stringify({
            file: "test.mp4"
        }),
    });
}

onMounted(() => {
    /*
    window.onbeforeunload = async function (e) {
        if (!Success.value) {
            await rmUploadedVideo();
        }
        return 'text not printed.';
    };
    */
});

</script>

<template>

    <DashboardSubtitle title="Upload a video" subtitle="From here, you can upload a video to subtitle it ! 🚀" />

    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
                <p
                    class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary-foreground uppercase rounded-full bg-teal-accent-400">
                    Subtitle a video
                </p>
            </div>
            <h2
                class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span class="relative inline-block">
                    <svg viewBox="0 0 52 24" fill="currentColor"
                        class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                        <defs>
                            <pattern id="b902cd03-49cc-4166-a0ae-4ca1c31cedba" x="0" y="0" width=".135" height=".30">
                                <circle cx="1" cy="1" r=".7"></circle>
                            </pattern>
                        </defs>
                        <rect fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)" width="52" height="24"></rect>
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

    <Progress v-model="length" class="mb-[50px] w-4/5 mx-auto rounded-md self-center" />

    <div class="flex flex-row items-center justify-center">
        <div class="flex w-1/3 h-1/2 flex-row items-center justify-center" v-if="!Success">
            <div v-if="videoUploaded" class="flex flex-row items-center justify-center mt-2 text-green-400 font-bold">
                <Badge class="bg-green-500 px-4 py-2 text-primary-foreground">Uploaded !</Badge>
            </div>
            <div class="flex flex-col" v-else>
                <p class="text-gray-600">
                    Upload your video here
                </p>
                <div class="mb-3 mt-4 grid items-center gap-1.5">
                    <Input id="picture" accept="video/*" @change="handleFileChange" :disabled="loadingUpload"
                        type="file" />
                </div>
                <div v-if="loadingUpload" class="flex flex-row items-center justify-center mt-2">
                    <Badge>
                        <div>Uploading</div>
                        <div class="ml-1">
                            <svg class="animate-spin h-4 w-4 m-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        </div>
                    </Badge>
                </div>
                <Alert class="my-2" variant="destructive" v-if="!videoValid">
                    <AlertCircle class="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your video length is above the one included in your current plan.
                    </AlertDescription>
                </Alert>
            </div>
        </div>

        <Separator class="mx-4 bg-black text-black" orientation="vertical" />

        <div v-if="length == 100 && Success" class="flex flex-col w-1/2 h-1/2 pl-10">
                <div class="flex items-center justify-between mb-6">
                    <p class="text-2xl font-bold text-green-500">Success</p>
                    <svg class="w-8 text-green-500" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" points="6,12 10,16 18,8"></polyline>
                    </svg>
                </div>
                <p class="text-gray-600">
                    Thanks, you video is now being processed, you will receive an email when it's done !
                </p>
            </div>
        <div class="flex flex-col w-1/2 h-1/2 pl-10" v-if="((length == 66)||(length==33))&&(loadingUpload||videoUploaded)">
            <div class="flex flex-col"x>
                More precisions :
                <div class="items-top flex gap-x-2 mt-1">
                    <Checkbox class="flex mt-2" v-model="videoCut" id="silence" />
                    <div class="grid gap-1.5 leading-none">
                        <label for="silence"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Do you want us to cut silent parts of the video ?
                        </label>
                    </div>
                </div>

                <div class="items-top flex gap-x-2">
                    <Checkbox class="flex mt-2" v-model="videoMusic" id="music" v-if="datas.canMusic" />
                    <Checkbox class="flex mt-2" v-model="videoMusic" id="music" v-else disabled />
                    <div class="grid gap-1.5 leading-none">
                        <label for="music"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Do you want us to add a dynamic music to the video ?
                        </label>
                    </div>
                </div>

                <div class="items-top flex gap-x-2">
                    <Checkbox class="flex mt-2" v-model="videoEmoji" id="emoji" v-if="datas.canEmoji" />
                    <Checkbox class="flex mt-2" v-model="videoEmoji" id="emoji" v-else disabled />
                    <div class="grid gap-1.5 leading-none">
                        <label for="emoji"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Do you want us to add emojis to the video ?
                        </label>
                    </div>
                </div>
            </div>


            <div class="pt-6">
                <div class="relative w-full max-w-sm items-center">
                    <Input id="search" type="text" placeholder="Name your video" class="pl-10" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <PenLine class="size-6 text-muted-foreground" />
                    </span>
                </div>

                <div class="mt-4 ml-28">
                    <Button :class="[videoUploaded ? 'opacity-1' : 'opacity-20']" :disabled="!videoUploaded"
                        @click="launchAmpq">
                        <span class="text-sm font-medium"> Process it </span>

                        <svg class="h-5 w-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    </div>

</template>